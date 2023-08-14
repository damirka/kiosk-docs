# Place and Take

Kiosk owner can *place* any items into their Kiosk, *placed* items can be *taken* by the owner if they're not [*listed*](./list-and-delist.md).

There's no limitations to which items can be placed into the Kiosk, however, it does not guarantee that they will be *tradable* - that depends on whether there's a [TransferPolicy](../transfer-policy/README.md) for the type.

## Calling `kiosk::place`

To place an item to the Kiosk, the owner needs to call the `sui::kiosk::place` function on the Kiosk object and pass the KioskOwnerCap and the Item as arguments.

> `ITEM_TYPE` in the examples below is the full type of the item.

### Example Kiosk SDK

```ts
import { place } from '@mysten/kiosk';

let tx = new TransactionBuilder();

let itemArg = tx.object('<ID>');
let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');

place(tx, '<ITEM_TYPE>', kioskArg, kioskOwnerCapArg, item);
```

### Example PTB

```ts
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

### Example CLI

```bash
sui client call \
    --package 0x2 \
    --module kiosk \
    --function place \
    --args "<KIOSK_ID>" "<CAP_ID>" "<ITEM_ID>" \
    --type-args "<ITEM_TYPE>" \
    --gas-budget 1000000000
```

## Calling `kiosk::take`

To take an item from the Kiosk, the owner needs to call the `sui::kiosk::take` function on the Kiosk object and pass the KioskOwnerCap and ID of the item as arguments.

> `ITEM_TYPE` in the examples below is the full type of the item.

### Example Kiosk SDK

```ts
import { take } from '@mysten/kiosk';

let tx = new TransactionBuilder();

let itemId = tx.pure('<ITEM_ID>', 'address');
let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');

let item = take('<ITEM_TYPE>', kioskArg, kioskOwnerCapArg, itemId);

tx.transferObjects([ item ], tx.pure(sender, 'address'));
```

### Example PTB

```ts
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

### Example CLI

The `kiosk::take` function is built to be PTB friendly and returns the asset, and CLI does not support transaction chaining yet.
