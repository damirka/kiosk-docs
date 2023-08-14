# Appendix B: Asset States in Kiosk

An asset in Kiosk can be in one of the following states:
- Placed
- Locked (special case of Placed)
- Listed
- Listed Exclusively

## Placed
Asset is put into the Kiosk by the [Kiosk Owner]() using the [`kiosk::place`](../kiosk/place-and-take) function. An owner can perform any available action on an item in this state.

### Available actions
- [take](../kiosk/place-and-take)
- [list](../kiosk/list-and-purchase) - change state to Listed
- [list with PurchaseCap](../kiosk/purchase-cap) - change state to Listed Exclusively
- [borrow](../kiosk/borrowing)
- [borrow_mut](../kiosk/borrowing)
- [borrow_val](../kiosk/borrowing)

### Check state
To check that asset is in the right state, the caller can use `is_placed` function, however, to make sure that the asset is not *locked*, we need to check `!is_locked`.

```Move
let is_placed = kiosk::is_placed<T>(&Kiosk, ItemID) && !kiosk::is_locked<T>(&Kiosk, ItemID);
```

## Locked
Asset can also be placed and *locked* in a Kiosk using the [`kiosk::lock`](../kiosk/locking) function. Unlike *place*, locking mechanic disables taking.

### Available actions
- [list](../kiosk/list-and-purchase) - change state to Listed
- [list with PurchaseCap](../kiosk/purchase-cap) - change state to Listed Exclusively
- [borrow](../kiosk/borrowing)
- [borrow_mut](../kiosk/borrowing)
- [borrow_val](../kiosk/borrowing)

### Check state
Kiosk has a built in `is_locked` function to check if the item is locked.
```Move
let is_locked = kiosk::is_locked<T>(&Kiosk, ItemID);
```

## Listed
A placed or a locked item can be listed using the [`list`](../kiosk/list-and-purchase) function. The asset then becomes publicly available for purchase.

> While listed, an asset can not be modified.

### Available actions
- [purchase](../kiosk/list-and-purchase) - move the asset out of the Kiosk
- [delist](../kiosk/list-and-purchase) - return to the previous state: Placed or Locked
- [borrow](../kiosk/borrowing)

### Check state
To check if the item is listed, use `is_listed` function.
```Move
let is_listed = kiosk::is_listed<T>(&Kiosk, ItemID)
```

## Listed Exclusively
When an asset is listed using the [`list_with_purchase_cap`](../kiosk/purchase-cap), it gets “listed exclusively” state. While in this state, an asset is available for purchase to the owner of the `PurchaseCap`, and cannot be delisted unless the `PurchaseCap` is returned.

> While listed exclusively, an asset can not be modified.

### Available actions
- [purchase with PurchaseCap](../kiosk/purchase-cap.md) - move the asset out of the Kiosk
- [return PurchaseCap](../kiosk/purchase-cap.md) - return to the previous state: Placed or Locked
- [borrow](../kiosk/borrowing.md)

### Check state
To check if an asset is listed exclusively, use `is_listed_exclusively` function.
```Move
let is_listed_exclusively = kiosk::is_listed_exclusively<T>(&Kiosk, ItemID);
```
