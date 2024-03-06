# Lock Rule

The Lock Rule is an important rule that checks if the purchased item is locked in the buyer's Kiosk. If the rule is not set, the item can be taken from the Kiosk, regardless of the Policy.

> This rule allows automatic completion via Kiosk SDK, see [Rules Interface](../guides/rules-interface.md).

## Configuration

- none

## Install

```ts
// Lock the item in the buyer's Kiosk
txb.moveCall({
    target: `${kiosk}::kiosk_lock_rule::add`,
    arguments: [
        txb.object(policy),
        txb.object(policyCap)
    ],
    typeArguments: [ policyType ]
});
```

## Prove Completion

- `TransferRequest` - the request itself
- `Kiosk` - destination Kiosk

```ts
txb.moveCall({
    target: `${kiosk}::kiosk_lock_rule::prove`,
    arguments: [
        request,
        txb.object(destinationKiosk)
    ],
    typeArguments: [ policyType ]
});
```
