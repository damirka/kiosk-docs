# Custom Events in Extensions
While the default Kiosk implementation for list-purchase flow always emits events, custom features covered in the [purchase-cap](../kiosk/purchase-cap.md) section do not. And this is intentional - to keep the space available for custom events integration.

If we were to map default functionality of the Kiosk to analogous “custom” features, the map would look like:

| Default Feature | Default Event | Custom Feature | Custom Event
|--------|---------|--------|--------|
| `list` | `ItemListed<T>`  | `list_with_purchase_cap` | None
| `delist` |  `ItemDelisted<T>`  | `return_purchase_cap` | None
| `purchase` | `ItemPurchased<T>`  | `purchase_with_cap` | None

> When building custom events, it is important to keep in mind, that `sender` and `timestamp` are default meta-properties of all emitted events. So adding a `sender` field in an event is not necessary and even more - it increases the event emission price (which is typically paid by user).

Each of the PurchaseCap-enabled actions follows the general principle of the list-purchase flow, however there are no events emitted. An extension utilizing these functions should create and emit custom events. 

> The example below uses [Extensions API](../kiosk-extensions/extensions-api/), make sure to look through this section beforehand.

```Move
/// This module follows the default Kiosk functionality without anything added.
/// Practically the example does not have any value and serves the illustration 
/// purpose as well as a potential base for custom extensions
module examples::marketplace_ext {
	use sui::kiosk::{Self, Kiosk, KioskOwnerCap, PurchaseCap};
	use sui::tx_context::TxContext;
	use sui::object::{Self, ID};
	use sui::kiosk_extension;
	use sui::event;

	/// Trying to delist an item in someone else’s Kiosk
	const ENotOwner: u64 = 0;

	/// A custom extension flag
	struct Extension has drop {}

	// === Events ===

	/// A custom event for a new listing. We only emit Kiosk ID and the price,
	/// because other fields such as “sender” are already a part of the event.
	/// And the type `T` here allows filtering events by type.
	struct MarketItemListed<phantom T> has copy, drop {
		kiosk: ID,
		item_id: ID,
		price: u64
	}

	/// A custom event for delisting. We only emit Kiosk ID and Item ID, 
	/// because the rest can be identified on the indexing side 
	struct MarketItemDelisted<phantom T> has copy, drop {
		kiosk: ID,
		item_id: ID
	}

    // Similarly, a purchase event can be implemented
    // struct MarketItemPurchased<phantom T> has copy, drop { ... }

	/// Installs the extension into user’s Kiosk.
	public fun add(
		self: &mut Kiosk, cap: &KioskOwnerCap, ctx: &mut TxContext
	) {
		kiosk_extension::add(Extension {}, self, cap, 0, ctx)
	}

	/// Custom list function which emits an event specific to the Extension
	public fun list<T: key + store>(
		self: &mut Kiosk, 
		cap: &KioskOwnerCap, 
		item_id: ID, 
		price: u64, 
		ctx: &mut TxContext
	) {
		// omitting the purchase cap and storage parts
		// see Extensions API for details

		event::emit(MarketItemListed<T> {
			kiosk: object::id(&self),
			item_id,
			price,
		})
	}
	
	/// Custom delist function which emits 
	public fun delist<T: key + store>(
		self: &mut Kiosk, cap: &KioskOwnerCap, item_id: ID,
	) {
		assert!(kiosk::has_access(self, cap), ENotOwner);

		event::emit(MarketItemDelisted<T> {
			kiosk: object::id(&self),
			item_id
		})
	}

	// 
}
```