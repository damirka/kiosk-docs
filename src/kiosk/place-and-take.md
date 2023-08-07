# Place and Take

Kiosk owner can *place* any items into their Kiosk, *placed* items can be *taken* by the owner if they're not [*listed*](./list-and-purchase.md).

There's no limitations to which items can be placed into the Kiosk, however, it does not guarantee that they will be *tradable* - that depends on whether there's a [TransferPolicy](../transfer-policy/README.md) for the type.

## Calling `kiosk::place`

To place an item to the Kiosk, the owner needs to call the `sui::kiosk::place` function on the Kiosk object and pass the KioskOwnerCap and the Item as arguments.

> `ITEM_TYPE` in the examples below is the full type of the item.

**Example Kiosk SDK**

```js
import { place } from '@mysten/kiosk';

let tx = new TransactionBuilder();

let itemArg = tx.object('<ID>');
let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');

place(tx, '<ITEM_TYPE>', kioskArg, kioskOwnerCapArg, item);
```

**Example PTB**

```js
let tx = new TransactionBuilder();

let itemArg = tx.object('<ID>');
let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');

tx.moveCall({
    target: '0x2::kiosk::place',
    arguments: [ kioskArg, kioskOwnerCapArg, itemArg ],
    typeArguments: [ '<ITEM_TYPE>' ]
})
```

## Calling `kiosk::take`

To take an item from the Kiosk, the owner needs to call the `sui::kiosk::take` function on the Kiosk object and pass the KioskOwnerCap and ID of the item as arguments.

> `ITEM_TYPE` in the examples below is the full type of the item.

**Example Kiosk SDK**

```js
import { take } from '@mysten/kiosk';

let tx = new TransactionBuilder();

let itemId = tx.pure('<ITEM_ID>', 'address');
let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');

let item = take('<ITEM_TYPE>', kioskArg, kioskOwnerCapArg, itemId);

tx.transferObjects([ item ], tx.pure(sender, 'address'));
```

**Example PTB**

```js
let tx = new TransactionBuilder();

let itemId = tx.pure('<ITEM_ID>', 'address');
let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');

let item = tx.moveCall({
    target: '0x2::kiosk::take',
    arguments: [ kioskArg, kioskOwnerCapArg, itemId ],
    typeArguments: [ '<ITEM_TYPE>' ]
});
```
