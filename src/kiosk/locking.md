# Locking

Some policies may require assets to never leave Kiosk (eg in a strong royalty enforcement scenario), and for that Kiosk has a locking mechanism.

> *Locking* is similar to [*placing*](./place-and-take.md#calling-kioskplace) with an exception, that a locked asset can not be [*taken*](./place-and-take.md#calling-kiosktake) out of the Kiosk.

An asset can be *locked* in a Kiosk by calling the `sui::kiosk::lock` function. To make sure that the asset can be eventually unlocked, the call requires a [TransferPolicy](../transfer-policy/README.md) to exist.


### Lock an asset in a Kiosk

Similar to [*place*](./place-and-take.md), *lock* call requires the KioskOwnerCap and the Item as arguments, but also requires the TransferPolicy to be shown.

> `<ITEM_TYPE>` in the examples below is the full type of the asset.

### Example Kiosk SDK

```ts
import { lock } from '@mysten/kiosk';

const tx = new TransactionBuilder();

let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');
let itemArg = tx.object('<ID>');
let transferPolicyArg = tx.object('<ID>');

lock(tx, '<ITEM_TYPE>', kioskArg, kioskOwnerCapArg, transferPolicyArg, itemArg);
```

### Example PTB

```ts
const tx = new TransactionBuilder();

let kioskArg = tx.object('<ID>');
let kioskOwnerCapArg = tx.object('<ID>');
let itemArg = tx.object('<ID>');
let transferPolicyArg = tx.object('<ID>');

tx.moveCall({
    target: '0x2::kiosk::lock',
    arguments: [ kioskArg, kioskOwnerCapArg, transferPolicyArg, itemArg ],
    typeArguments: [ '<ITEM_TYPE>' ]
});
```

### Example CLI

```bash
sui client call \
    --package 0x2 \
    --module kiosk \
    --function lock \
    --args "<KIOSK_ID>" "<CAP_ID>" "<TRANSFER_POLICY_ID>" "<ITEM_ID>" \
    --type-args "<ITEM_TYPE>" \
    --gas-budget 1000000000
```
