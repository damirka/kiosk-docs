# List and Delist

Kiosk comes with a basic trading functionality. The Kiosk Owner can list assets for sale and buyers can discover and purchase them. Listing functionality is available in Kiosk by default, and features 3 main functions:

- `kiosk::list` - list an asset for sale for a fixed price
- `kiosk::delist` - remove an existing listing
- `kiosk::purchase` - purchase an asset that is listed for sale

## Listing an asset

Kiosk Owner can list any asset asset that is stored in their Kiosk. To do so they need to call the `kiosk::list` function, specify the asset they're willing to put on sale, and the price they're willing to sell it for.

> All listings are in SUI at the moment.

When an item is listed, a `kiosk::ItemListed` event is emitted. The event contains the Kiosk ID, Item ID, type of the Item and the price it was listed for.

### Example Kiosk SDK

```TS
import { list } from '@mysten/kiosk';

let tx = new TransactionBlock();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');
let itemId = tx.pure('<ID>', 'address');
let itemType = 'ITEM_TYPE';
let price = '<price>'; // in MIST (1 SUI = 10^9 MIST)

list(tx, itemType, kioskArg, capArg, itemId, price);
```

### Example PTB

```TS
let tx = new TransactionBlock();

let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');
let itemId = tx.pure('<ID>', 'address');
let itemType = 'ITEM_TYPE';
let priceArg = tx.pure('<price>', 'u64'); // in MIST (1 SUI = 10^9 MIST)

tx.moveCall({
    target: '0x2::kiosk::list',
    arguments: [ kioskArg, capArg, itemId, priceArg ],
    typeArguments: [ itemType ]
});
```

### Example CLI

```bash
sui client call \
    --package 0x2 \
    --module kiosk \
    --function list \
    --args "<KIOSK_ID>" "<CAP_ID>" "<ITEM_ID>" "<PRICE>" \
    --type-args "ITEM_TYPE" \
    --gas-budget 1000000000
```

## Delisting an asset

Kiosk Owner can delist any currently listed asset. To delist an asset they need to call the `kiosk::delist` function, and specify the item they're willing to delist.

> Delisting is a *"negative-gas"* operation, meaning that the Kiosk Owner will be refunded for the gas they spent on listing the item.

When an item is delisted, a `kiosk::ItemDelisted` event is emitted. The event contains the Kiosk ID, Item ID and the type of the Item.


### Example Kiosk SDK

```TS
import { delist } from '@mysten/kiosk';

let tx = new TransactionBlock();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');
let itemId = tx.pure('<ID>', 'address');
let itemType = 'ITEM_TYPE';

delist(tx, itemType, kioskArg, capArg, itemId);
```

### Example PTB

```TS
let tx = new TransactionBlock();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');
let itemId = tx.pure('<ID>', 'address');
let itemType = 'ITEM_TYPE';

tx.moveCall({
    target: '0x2::kiosk::delist',
    arguments: [ kioskArg, capArg, itemId ],
    typeArguments: [ itemType ]
});
```

### Example CLI

```bash
sui client call \
    --package 0x2 \
    --module kiosk \
    --function delist \
    --args "<KIOSK_ID>" "<CAP_ID>" "<ITEM_ID>" \
    --type-args "ITEM_TYPE" \
    --gas-budget 1000000000
```

## More on the topic

A listed item can be purchased by anyone on the network, to see the purchase flow, check out the [Purchase](./purchase.md) section. To learn more about asset states and what can be done with a listed item, see the [Asset States](./../appendix/asset-states-in-kiosk.md) section.
