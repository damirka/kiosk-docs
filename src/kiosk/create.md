# Open a Kiosk

To use a Kiosk, the user needs to create it and have the `KioskOwnerCap` that matches the `Kiosk` object. Once created, all of the features of the Kiosk are available to the owner.

## Default setup

Anyone can create a new Kiosk in a single transaction by calling the `kiosk::default` function. It will create and share a Kiosk and transfer the `KioskOwnerCap` to the transaction sender.

### Example Kiosk SDK

```ts
import { createKioskAndShare } from '@mysten/kiosk';

let tx = new TransactionBuilder();
let kioskOwnerCap = createKioskAndShare(tx);

tx.transferObjects([ kioskOwnerCap ], tx.pure(sender, 'address'));
```

### Example PTB

```ts
let tx = new TransactionBuilder();
tx.moveCall({
    target: '0x2::kiosk::default'
});
```

### Example CLI

```bash
sui client call \
    --package 0x2 \
    --module kiosk \
    --function default \
    --gas-budget 1000000000
```

## Advanced usage

For more advanced use cases, when you want to choose the storage model or perform an action right away, you can use a PTB-friendly function `kiosk::new`.

> Kiosk is intended to be **shared** and choosing a different storage model (eg "owned") would lead to Kiosk not being fully functional and not available for other users. Make sure you know what you're doing.

### Example Kiosk SDK

```ts
import { createKiosk } from '@mysten/kiosk';

let tx = new TransactionBuilder();
let [kiosk, kioskOwnerCap] = createKiosk(tx);

tx.transferObjects([ kioskOwnerCap ], tx.pure(sender, 'address'));
tx.moveCall({
    target: '0x2::transfer::public_share_object',
    arguments: [ kiosk ],
    typeArguments: '0x2::kiosk::Kiosk'
})
```

### Example PTB

```ts
let tx = new TransactionBuilder();
let [kiosk, kioskOwnerCap] = tx.moveCall({
    target: '0x2::kiosk::new'
});

tx.transferObjects([ kioskOwnerCap ], tx.pure(sender, 'address'));
tx.moveCall({
    target: '0x2::transfer::public_share_object',
    arguments: [ kiosk ],
    typeArguments: '0x2::kiosk::Kiosk'
})
```

### Example CLI

Sui CLI does not support PTBs and transaction chaining yet. You can use the `kiosk::default` function instead.
