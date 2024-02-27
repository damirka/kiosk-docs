# Fixed Price Trading

The Fixed Price Trading module can be used for simple listings with a fixed price. The only difference from the default Kiosk `list` function is that the buyer specifies the `Market` type during listing.

## Prerequisites

- User needs to install the [marketplace extension](./marketplace-adapter.md).

## Usage

The Fixed Price Trading module provides the following functions:

- `list` - list an item for sale.
- `delist` - remove an active listing.
- `purchase` - purchase an item.

All of the functions are almost identical to the default Kiosk functions, with only additional `Market` type parameter. 

## Events

ItemListed - when an item is listed for sale. The sender in this event is the seller.

```move
struct ItemListed<phantom T, phantom Market> has copy, drop {
    kiosk_id: ID,
    item_id: ID,
    price: u64,
    is_personal: bool,
}
```

ItemDelisted - when an active listing is removed. The sender in this event is the seller.

```move
struct ItemDelisted<phantom T, phantom Market> has copy, drop {
    kiosk_id: ID,
    item_id: ID,
    is_personal: bool,
}
```

ItemPurchased - when an item is purchased. The sender in this event is the buyer.

```move
struct ItemPurchased<phantom T, phantom Market> has copy, drop {
    kiosk_id: ID,
    item_id: ID,
    /// The seller address if the Kiosk is personal.
    seller: Option<address>,
}
```
