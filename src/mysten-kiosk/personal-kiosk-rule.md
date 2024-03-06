# Personal Kiosk Rule

The Personal Kiosk Rule is a rule that guarantees that the buyer's Kiosk is a [Personal Kiosk](personal-kiosk.md). The rule is essential to enforce the rules set in the [Transfer Policy](transfer-policy.md), such as royalties or floor price.

> This rule allows automatic completion via Kiosk SDK, see [Rules Interface](../guides/rules-interface.md).

## Configuration

- none

## Example

```ts
txb.moveCall({
    target: `${kiosk}::personal_kiosk_rule::add`,
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
    target: `${kiosk}::personal_kiosk_rule::prove`,
    arguments: [
        request,
        txb.object(destinationKiosk)
    ],
    typeArguments: [ policyType ]
});
```
