# Collection Bidding

Collection Bidding implements the ability to bid on a collection of items. The user can place multiple bids at once, and the seller can accept the bids in the submitted order. For example: "Alice bids 20 SUI and 10 SUI, Bob has to accept the 10 SUI bid before the 20 SUI bid." The seller resolves both transfer requests: for the Market and for the creator of the item.

## Prerequisites

- User needs to install the [marketplace extension](./marketplace-adapter.md).

## Usage

The Collection Bidding module provides the following functions:

- `place_bids` - place multiple bids on a collection of items. The bids are supplied in order, and the last bid comes first.
- `cancel_all` - cancel all bids on a collection of items (by the type `T`).
- `accept_market_bid` - accept a bid on a collection of items. The seller accepts a bid and exchanges an Item of the type T for the bid. The method provides concurrency protection for the seller.

## Events

NewBid - when a bid is placed. The sender in this event is the bidder.

```move
/// An event that is emitted when a new bid is placed.
struct NewBid<phantom Market, phantom T> has copy, drop {
    kiosk_id: ID,
    bids: vector<u64>,
    is_personal: bool,
}
```

BidAccepted - when a bid is accepted. The sender in this event is the seller.

```move
/// An event that is emitted when a bid is accepted.
struct BidAccepted<phantom Market, phantom T> has copy, drop {
    seller_kiosk_id: ID,
    buyer_kiosk_id: ID,
    item_id: ID,
    amount: u64,
    buyer_is_personal: bool,
    seller_is_personal: bool,
}
```

BidCancelled - when a bid is cancelled. The sender in this event is the bidder.

```move
/// An event that is emitted when a bid is canceled.
struct BidCanceled<phantom Market, phantom T> has copy, drop {
    kiosk_id: ID,
    kiosk_owner: Option<address>,
}
```
