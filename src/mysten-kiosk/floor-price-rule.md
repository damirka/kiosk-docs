# Floor Price Rule

The Floor Price Rule is a simple rule that checks that the price of the item is not lower than the floor price set in the Policy. The floor price is a minimum price that the item can be sold for. The rule can be used in some cases to prevent the item from being sold for a price lower than the creator's expectations.

> This rule allows automatic completion via Kiosk SDK, see [Rules Interface](../guides/rules-interface.md).

## Configuration

- `amount` - the minimum price that the item can be sold for.

## Install

- `TransferPolicy` - the request policy
- `TransferPolicyCap` - the request policy cap
- `u64` - the floor price

```ts
// Lock the item in the buyer's Kiosk
txb.moveCall({
    target: `${kiosk}::floor_price_rule::add`,
    arguments: [
        txb.object(policy),
        txb.object(policyCap),
        txb.pure.u64('500000000') // floor price
    ],
    typeArguments: [ policyType ]
});
```

## Prove Completion

- `TransferRequest` - the request itself
- `Kiosk` - destination Kiosk

```ts
txb.moveCall({
    target: `${kiosk}::floor_price_rule::prove`,
    arguments: [
        request,
        txb.object(destinationKiosk)
    ],
    typeArguments: [ policyType ]
});
```
