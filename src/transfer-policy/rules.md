# Rules

The `TransferPolicy` does not require any action from the user by default; it confirms `TransferRequest`s and therefore unblocks a transaction. However, if we were to implement the `VAT` example further and allow the `VAT` to collect fees for every "merchant transaction" we need to introduce "Rules".

## "Receipts" in TransferRequest

TransferRequest features the `receipts` field which is a VecSet of `TypeName`. When the request is "confirmed" via the `confirm_request` call, the receipts are compared against the `TransferPolicy.rules`, and if "receipts" don't match the "rules", the request can not be confirmed, and the transaction aborts.

In the default scenario, the rules are empty and receipts are too, so the matching is trivial and the request is confirmed.

```Move
module sui::transfer_policy {
    // ... skipped ...

    struct TransferRequest<phantom T> {
        // ... other fields omitted ...

        /// Collected Receipts. Used to verify that all of the rules
        /// were followed and `TransferRequest` can be confirmed.
        receipts: VecSet<TypeName>
    }

    // ... skipped ...

    struct TransferPolicy<phantom T> has key, store {
        // ... other fields omitted ...

        /// Set of types of attached rules - used to verify `receipts` when
        /// a `TransferRequest` is received in `confirm_request` function.
        ///
        /// Additionally provides a way to look up currently attached Rules.
        rules: VecSet<TypeName>
    }

    // ...
}
```

## Rules and Receipts

A Rule is a way to request an additional action from the user before the request can be confirmed. For example, if we want to implement a "VAT" module that would collect fees for every "merchant transaction", we need to introduce a Rule that would allow the VAT to collect fees. The way for us to know that the VAT is paid is to add a "receipt" to the TransferRequest.

> A Rule added to the TransferPolicy requires a matching Receipt in the TransferRequest. The match is performed based on the Rule type.


## Rule Implementation

A rule is a module that implements the "Rule" functionality in the `transfer_policy` module - it needs to provide 3 main components:

1. A `Rule` Witness type which uniquely identifies the Rule
2. A `Config` type which is stored in the `TransferPolicy` and is used to
   configure the Rule (eg a fee amount)
3. An `add` function which adds the Rule to the `TransferPolicy` - must be
   performed by the `TransferPolicyCap` holder
4. An actionable function which adds the receipt into the `TransferRequest` and
   potentially adds to the `TransferPolicy` balance if the functionality
   involves some monetary transaction.



<!-- transfer_policy::add_rule(W, TransferPolicy, TransferPolicyCap, Config) /// adds a rule to the policy; rule is protected by the rule module’s witness; config must have drop
• transfer_policy::add_to_balance(W, TransferPolicy, Coin) /// add some SUI to the balance of the TransferPolicy (eg on royalty payment)
• transfer_policy::add_receipt(W, TransferRequest) /// adds a receipt that the rule requirements are fulfilled; all of the receipts must be collected before confirmation
• transfer_policy::remove_rule<W>(TransferPolicy, TransferPolicyCap); /// remove the rule from the policy - applied instantly -->
