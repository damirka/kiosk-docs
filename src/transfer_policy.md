# Transfer Policy

To understand the Kiosk we first need to go through the Transfer Policy.
`transfer_policy` is a library located in the Sui Framework; it allows creating
a non-discardable message - called `TransferRequest` - and the destination for
this message - `TransferPolicy`.

Imagine a tax system implementation on Sui: multiple merchants process payments
and buyers need to pay "VAT".

<!-- In the blockchain environment it is extremely hard
to enforce such a policy and make it generic enough to be used by multiple apps. -->
<!-- because the buyer usually can just ignore it. Unless
the tools they use for trading enforce it at the moment of purchase (or lock the
purchased asset until the tax is paid).
 -->

The `TransferRequest` struct and the matching `TransferPolicy` object address
this problem. If a merchant creates a `TransferRequest` upon each purchase, and
the `TransferPolicy` is configured to enforce the tax policy, the buyer will not
be able to finalize the purchase the item until the tax is paid.

This is a strong guarantee, because the `TransferRequest` is a non-discardable
struct (so-called "Hot Potato") and unless it finds "its home", the transaction
will fail. The `TransferPolicy` is the "home" for the `TransferRequest` and it
can be configured to define the rules for the `TransferRequest` to be accepted.

Because the system is designed for commerce, the `TransferRequest` has the most
commonly used fields, such as:

- `paid` (the amount of SUI paid for the item)
- `item` (the ID of the item being transferred)
- `from` (the ID of the Kiosk / Source the item is being sold from)

Additionally, thanks to the Move's type system, the `TransferRequest` is issued
per *type*. This means that the `TransferRequest` for a "Phone" is different
from the `TransferRequest` for a "Car". This allows to enforce different rules
for different types of items.





<!-- - `receipts` (a list of receipts collected by the buyer, which can be
used to verify that all of the rules were followed). -->




<!--
It's a pair of a hot-potato and an object which can consume it.

```Move
module sui::transfer_policy {

    // ...

    /// A "Hot Potato" forcing the buyer to get a transfer permission
    /// from the item type (`T`) owner on purchase attempt.
    struct TransferRequest<phantom T> {
        /// The ID of the transferred item. Although the `T` has no
        /// constraints, the main use case for this module is to work
        /// with Objects.
        item: ID,
        /// Amount of SUI paid for the item. Can be used to
        /// calculate the fee / transfer policy enforcement.
        paid: u64,
        /// The ID of the Kiosk / Safe the object is being sold from.
        /// Can be used by the TransferPolicy implementors.
        from: ID,
        /// Collected Receipts. Used to verify that all of the rules
        /// were followed and `TransferRequest` can be confirmed.
        receipts: VecSet<TypeName>
    }
}
``` -->
