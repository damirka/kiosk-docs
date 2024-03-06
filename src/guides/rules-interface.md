# Rules Interface

Kiosk SDK supports automatic detection and completion of rules. This means that the added custom rules can be resolved as long as they are implemented in compliance with the Kiosk SDK.

## Automatic Completion Requirements

Any automated system has to be limited to prevent assets loss and malicious behavior from the users. In this case, the party that can abuse this functionality is the creator / marketplace - the party that sets the rules in the policy.

To prevent malicious scenarios, the Kiosk SDK will complete the rules only if the following conditions are met:

- Rule module has a public, non-entry function `prove` which does not return any value, unless the returned value has `drop` and can be ignored
- The `prove` function must take the `&mut TransferRequest<T>` parameter, as this is the request that is expected to be confirmed
- The `prove` function can take any of the following arguments:
    - `&(mut) TransferPolicy<T>` - the policy containing configuration
    - `&Clock` - system Clock (0x6) object
    - `&Kiosk` - the destination Kiosk
    - `&T` - the purchased item (if applicable)
    - `&(mut) TxContext` - the transaction context

## Examples

```move
module pkg::my_rule {

    /// The Rule type.
    struct Rule has drop {}

    /// The `prove` function which is called to prove the completion/compliance
    /// with the rule.
    public fun prove<T>(
        request: &mut TransferRequest<T>,
        policy: &mut TransferPolicy<T>,
        clock: &Clock,
        kiosk: &Kiosk,
        item: &T,
        ctx: &mut TxContext
    ) {
        transfer_policy::add_receipt(Rule {}, request);
    }
}
```
