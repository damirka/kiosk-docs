# Purchase

A [listed](./list-and-delist.md) item can be purchased by anyone on the network. The buyer should call the `kiosk::purchase` function, specify the item they're willing to purchase and pay the price set by the [Kiosk Owner](./../roles/kiosk-owner.md).

> Currently listed items can be discovered via the `kiosk::ItemListed` event.

The purchase function returns the purchased Asset and the TransferRequest for this its type which needs to be resolved in a matching TransferPolicy. See the [TransferPolicy section](../transfer-policy) for more details.

## Kiosk SDK



```TS
