# Single Item Bidding

User can bid on a single item with a specified ID. Any number of bids on different items can be placed, only one bid per item. The seller can accept the bid if they have the item. The seller resolves both transfer requests: for the Market and for the creator of the item.

## Prerequisites

- User needs to install the [marketplace extension](./marketplace-adapter.md).

## Usage

The Single Item Bidding module provides the following functions:

- `bid` - place a bid on a single item, the bid can be accepted by the Item owner (seller).
- `accept` - accept a bid on an item. The seller accepts a bid and exchanges an Item for the bid amount.

## Events

ItemBid - when a bid is placed on an item. The sender in this event is the bidder.

```move
/// Event emitted when a bid is placed.
struct NewBid<phantom Market, phantom T> has copy, drop {
    /// The destination Kiosk ID.
    kiosk_id: ID,
    /// The item ID.
    item_id: ID,
    /// The bid amount in SUI.
    bid: u64,
    /// Whether the bidder is a personal Kiosk.
    is_personal: bool,
}
```

BidAcccepted - when a bid is accepted. The sender in this event is the seller.

```move
/// Event emitted when a bid is accepted.
struct BidAccepted<phantom Market, phantom T> has copy, drop {
    /// The destination Kiosk ID.
    kiosk_id: ID,
    /// The item ID.
    item_id: ID,
    /// The bid amount in SUI.
    bid: u64,
    /// Whether the buyer is a personal Kiosk.
    buyer_is_personal: bool,
    /// Whether the seller is a personal Kiosk.
    seller_is_personal: bool,
}
```

BidCancelled - when a bid is cancelled. The sender in this event is the bidder.

```move
/// Event emitted when a bid is cancelled.
struct BidCancelled<phantom Market, phantom T> has copy, drop {
    /// The destination Kiosk ID.
    kiosk_id: ID,
    /// The item ID.
    item_id: ID,
    /// The bid amount in SUI.
    bid: u64,
    /// Whether the bidder is a personal Kiosk.
    is_personal: bool,
}
```
