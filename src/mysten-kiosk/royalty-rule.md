# Royalty Rule

The Royalty Rule is a rule that enforces a fee to be paid to the creator of the item on each purchase. It supports a flexible configuration: the creator can set the percentage based fee and the fixed fee to be enforced on the item. Both configurations can be set at the same time, and the rule will require the buyer to pay the maximum of the two fees.

## Configuration

- `% in base points` - the percentage of the item's price that the creator will receive as a fee.
- `amount` - the fixed amount that the creator will receive as a fee.

## Example

```ts
txb.moveCall({
    target: `${kiosk}::kiosk_lock_rule::add`,
    arguments: [
        txb.object(policy),
        txb.object(policyCap),
        txb.pure.u16('50'), // amount base points
        txb.pure.u64('500000000') // min amount
    ],
    typeArguments: [ policyType ]
});
```

## Prove Completion

- `TransferPolicy` - the request policy
- `TransferRequest` - the request itself
- `Coin<SUI>` - the amount to be paid

```ts
txb.moveCall({
    target: `${kiosk}::kiosk_lock_rule::pay`,
    arguments: [
        request,
        txb.object(destinationKiosk),
        coin
    ],
    typeArguments: [ policyType ]
});
```
