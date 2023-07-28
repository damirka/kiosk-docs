# Transfer Policy

To understand the Kiosk we first need to go through the Transfer Policy.
`transfer_policy` is a library located in the Sui Framework; it allows creating
a non-discardable message - called `TransferRequest` - and the destination for
this message - `TransferPolicy`.

## Introduction

Imagine a tax system implementation: multiple merchants process payments and
buyers need to pay "[VAT](https://en.wikipedia.org/wiki/Value-added_tax)". The
tax is calculated based on the price of the purchased item, and different
categories of items have different tax rates.

> In most of the countries, the VAT is first collected by the merchant. The
> merchant must keep track of the tax paid for each item and pay the collected
> taxes to the tax authority in the end of the period.

To create a system like this without extra overhead on the merchants' side (the
buyer pays the tax directly) we could issue a "receipt" for each purchase which
would contain the information about the item type and the price paid. The buyer
would then need to pay the VAT directly to the tax authority based on the
receipt.

Move language has a primitive which allows creating a non-discardable message
called "[Hot Potato](https://examples.sui.io/patterns/hot-potato.html)". Once
created, the Hot Potato can only be consumed by a specific module (or object),
and if it is not consumed, the transaction will fail.

Applied to this scenario, the "receipt" would be a Hot Potato, forcing the buyer
to do something with it - pay the tax - before the transaction can be finalized.

## Transfer Request

The `TransferRequest` struct and the matching `TransferPolicy` object address
this problem. If a merchant creates a `TransferRequest` upon each purchase, and
the `TransferPolicy` is configured to enforce the tax policy, the buyer will not
be able to finalize the purchase the item until the tax is paid.

This is a strong guarantee, because the `TransferRequest` is a non-discardable
struct - "Hot Potato" - and unless it finds "its home", the transaction won't
succeed. The `TransferPolicy` is the "home" for the `TransferRequest` and it
can be configured by the authority to require certain conditions to be met for
the `TransferRequest` to be accepted.

Because the system is designed for commerce, the `TransferRequest` has the most
commonly used fields, all of which are set at creation and can't be changed,
such as:

- `paid` (the amount of SUI paid for the item)
- `item` (the ID of the item being transferred)
- `from` (the ID of the source the item is being sold from)

Additionally, thanks to the Move's type system, the `TransferRequest` is issued
per *type*. This means that the `TransferRequest` for a "Phone" is different
from the `TransferRequest` for a "Car". This allows to enforce different rules
for different types of items.

## Example: Merchant

A module implementing the merchant logic for the "Phone" type could look like
this:

```Move
/// An example of a module on Sui which sells "Phones".
module commerce::merchant {
    use sui::transfer_policy::{Self, TransferRequest};
    use tax::vat::VAT;

    /// A single "Phone" - a Sui Object.
    struct Phone has key, store { /* ... */ }

    /// A price of a single "Phone".
    const PHONE_PRICE: u64 = 10_000_000_000;

    /// Some merchant ID (usually represented by a Sui Object)
    const MERCHANT_ID: address = 0xBEEF;

    /// The merchant is selling phones, the buyer only pays to the merchant the
    /// price of the phone, and the tax is paid separately and directly to the
    /// tax authority. `VAT` type is imported and can only be resolved by the
    /// authority defining this type.
    public fun buy_phone(/* pass a coin */): (Phone, TransferRequest<VAT>) {

        let phone = Phone { /* ... */ };

        // Generate new `TransferRequest` for the `VAT` type, specify the ID
        // of the `Phone` object, the price of the `Phone` and the ID of the
        // merchant.
        let request = transfer_policy::new_request<VAT>(
            object::id(&phone),
            PHONE_PRICE,
            object::id_from_address(MERCHANT_ID),
        );

        (phone, request)
    }
}
```

## Transfer Policy

A `TransferRequest` can only be matched in a `TransferPolicy` object. The match
happens based on the type of the `TransferRequest` and the `TransferPolicy`. If
the `TransferRequest` is for the "Phone" type, it can only be matched by the
`TransferPolicy` for the "Phone" type.

> In the example above the `TransferRequest` is for the "VAT" type, so it can
> only be matched by the `TransferPolicy` for the "VAT" type.

`TransferPolicy<T>` is a Sui Object which can be created for any type by the
[Publisher](https://examples.sui.io/basics/publisher.html) of this type.

```Move
/// An example of a TransferPolicy setup. Better be done via PTBs and not as a
/// published module. The code below is for illustration purposes only.
module tax::vat {
    use sui::tx_context::{sender, TxContext};
    use sui::transfer_policy::{Self, TransferPolicy};

    /// The authority defines the `VAT` type. It is never initialized and only
    /// used to create and resolve `TransferRequest`s.
    struct VAT has drop {}

    /// The publisher creates and shares a `TransferPolicy` for the `VAT` type.
    public fun create_policy(pub: &Publisher, ctx: &mut TxContext) {
        let (policy, policy_cap) = transfer_policy::new_policy<VAT>(pub, ctx);

        sui::transfer::public_share_object(policy);
        sui::transfer::public_transfer(policy_cap, sender(ctx));
    }

    /// Can be called directly in the `TransferPolicy` module; does not need a
    /// custom implementation. This code is for illustration purposes only.
    public fun confirm_request(
        policy: &TransferPolicy<VAT>, request: TransferRequest<VAT>
    ) {
        transfer_policy::confirm_request<VAT>(policy, request);
    }
}

```
