# Withdrawing Profits

Whevener an item is [purchased](./purchase.md), profits from the sale are stored in the Kiosk. The Kiosk Owner can withdraw these profits at any time by calling the `kiosk::withdraw` function.

## Examples

The function is simple, however, due to it being PTB friendly, it is not currently supported in the CLI environment.

### Example Kiosk SDK

```TS
import { withdrawFromKiosk } from '@mysten/kiosk';

let tx = new TransactionBlock();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');

// The amount can be `null` to withdraw everything or a specific amount
let amount = '<amount>';
let withdrawAll = null;

let coin = withdrawFromKiosk(tx, kioskArg, capArg, amount);
```

### Example PTB

```TS
let tx = new TransactionBlock();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');

// because the function uses an Option<u64> argument,
// constructing is a bit more complex
let amountArg = tx.moveCall({
    target: '0x1::option::some',
    arguments: [ tx.pure('<amount>', 'u64') ],
    typeArguments: [ 'u64' ],
});

// alternatively
let withdrawAllArg = tx.moveCall({
    target: '0x1::option::none',
    typeArguments: [ 'u64' ],
});

let coin = tx.moveCall({
    target: '0x2::kiosk::withdraw',
    arguments: [ kioskArg, capArg, amountArg ],
    typeArguments: [ 'u64' ],
});
```

### Example CLI

Due to the function being PTB friendly, it is not currently supported in the CLI environment.
