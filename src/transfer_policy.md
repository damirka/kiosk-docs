# Transfer Policy

To understand the Kiosk we first need to go through the Transfer Policy.
`transfer_policy` is a library located in the Sui Framework; it allows creating
a non-discardable message - called `TransferRequest` - and the destination for
this message - `TransferPolicy`.

---

Imagine a tax system implementation: multiple merchants process payments and
buyers need to pay "VAT". The tax is calculated based on the price of the
purchased item, and different categories of items have different tax rates.

To create a system like this without extra overhead on the merchants' side (the
buyer pays the tax directly) we could issue a "receipt" for each purchase which
would contain the information about the item type and the price paid. The buyer
would then need to pay the tax based on the receipt.

Move language has a primitive which allows to create a non-discardable message
called "Hot Potato". Once created, the Hot Potato can only be consumed by a
specific module (or object), and if it is not consumed, the transaction will
fail.

---

The `TransferRequest` struct and the matching `TransferPolicy` object address
this problem. If a merchant creates a `TransferRequest` upon each purchase, and
the `TransferPolicy` is configured to enforce the tax policy, the buyer will not
be able to finalize the purchase the item until the tax is paid.

This is a strong guarantee, because the `TransferRequest` is a non-discardable
struct - "Hot Potato" - and unless it finds "its home", the transaction won't
succeed. The `TransferPolicy` is the "home" for the `TransferRequest` and it
can be configured by the authority to require certain conditions to be met for
the `TransferRequest` to be accepted.

---

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

```Move
/// An example of a module on Sui which sells "Phones".
module commerce::merchant {
    use sui::transfer_policy::{Self, TransferRequest};

    /// A single "Phone" - a Sui Object.
    struct Phone has key, store { /* ... */ }

    /// A price of a single "Phone".
    const PHONE_PRICE: u64 = 10_000_000_000;

    /// Some merchant ID (usually represented by a Sui Object)
    const MERCHANT_ID: address = 0xBEEF;

    /// The merchant is selling phones, the buyer only pays to the merchant the
    /// price of the phone, and the tax is paid separately and directly to the
    /// tax authority.
    public fun buy_phone(/* pass a coin */): (Phone, TransferRequest<Phone>) {

        let phone = Phone { /* ... */ };

        // Generate new `TransferRequest` for the `Phone` object, specify the
        // ID of the `Phone` object, the price of the `Phone` and the ID of the
        // merchant.
        let request = transfer_policy::new_request<Phone>(
            object::id(&phone),
            PHONE_PRICE,
            object::id_from_address(MERCHANT_ID),
        );

        (phone, request)
    }
}
```

---
