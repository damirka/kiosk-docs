# Borrowing

An asset placed or locked in a Kiosk can be accessed by the Kiosk Owner without taking it from it. The Kiosk Owner can always borrow the asset immutably, however mutalbe borrow [depends on the asset state](../appendix/asset-states-in-kiosk.md) - a listed item can not be modified. The functions at the Kiosk Owner's disposal are:

- `kiosk::borrow` - returns an immutable reference to the asset
- `kiosk::borrow_mut` - returns a mutable reference to the asset
- `kiosk::borrow_val` - a PTB-friendly version of `borrow_mut` - allows to take an asset and return it in the same transaction

## Immutable borrow

An asset can always be immutably borrowed from a Kiosk. Borrowing is performed via the `kiosk::borrow` function, however, it is not possible to use references within a PTB, so to access the immutable borrow, a published module (function) is required.

### Example Move

```Move
module examples::immutable_borrow
    use sui::object::ID;
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};

    public fun immutable_borrow_example<T>(self: &Kiosk, cap: &KioskOwnerCap, item_id: ID): &T {
        kiosk::borrow(self, cap, item_id)
    }
}
```

## Mutable borrow with `borrow_mut`

An asset can be mutably borrowed from a Kiosk [if it is not listed](../appendix/asset-states-in-kiosk.md). Borrowing is performed via the `kiosk::borrow_mut` function, however, it is not possible to use references within a PTB, so to access the mutable borrow, a published module (function) is required.

### Example Move

```Move
module examples::mutable_borrow
    use sui::object::ID;
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};

    public fun mutable_borrow_example<T>(
        self: &mut Kiosk, cap: &KioskOwnerCap, item_id: ID
    ): &mut T {
        kiosk::borrow_mut(self, cap, item_id)
    }
}
```

## Mutable borrow with `borrow_val` (PTB)

A PTB-friendly borrowing is available with the `kiosk::borrow_val` function. It allows to take an asset and return it in the same transaction. To make sure an asset is returned, the function "obliges" the caller with a Hot Potato.

### Example Kiosk SDK

Kiosk SDK gives a handy function for the borrowing logic usable within a PTB: `borrowValue` (and `returnValue`).

```TS
import { borrowValue, returnValue } from '@sui/kiosk-sdk';

let tx = new TransactionBuilder();
let itemType = 'ITEM_TYPE';
let itemId = tx.pure('<ITEM_ID>', 'address');
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');

let [item, promise] = borrowValue(tx, itemType, kioskArg, capArg, itemId);

// freely mutate or reference the `item`
// any calls are available as long as they take a mutable reference
// `returnValue` must be explicitly called

returnValue(tx, itemType, kioskArg, item, promise);
```

### Example PTB

```TS
let tx = new TransactionBuilder();

let itemType = 'ITEM_TYPE';
let itemId = tx.pure('<ITEM_ID>', 'address');
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');

let [item, promise] = tx.moveCall({
    target: '0x2::kiosk::borrow_val',
    arguments: [ kioskArg, capArg, itemId ],
    typeArguments: [ itemType ],
});

// freely mutate or reference the `item`
// any calls are available as long as they take a mutable reference
// `returnValue` must be explicitly called

tx.moveCall({
    target: '0x2::kiosk::return_val',
    arguments: [ kioskArg, item, promise ],
    typeArguments: [ itemType ],
});
```
