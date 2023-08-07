# Disabling and Removing

Any extension can be disabled by the Kiosk Owner at any time. This will revoke all permissions of the extension and prevent it from performing any actions in the Kiosk. The extension can be re-enabled at any time by the Kiosk Owner.

> Disabling an extension does not remove it from the Kiosk. An installed Extension has access to its storage until completely removed from the Kiosk.

## Disabling an extension

The `disable<Ext>(kiosk: &mut Kiosk, cap: &KioskOwnerCap)` function can be used to disable an extension. It will revoke all permissions of the extension and prevent it from performing any protected actions in the Kiosk.

**Example PTB**

```js
let txb = new TransactionBuilder();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');

txb.moveCall({
    target: '0x2::kiosk_extension::disable',
    arguments: [ kioskArg, capArg ],
    typeArguments: '<letter_box_package>::letterbox_ext::Extension'
});
```

## Removing an extension

An extension can be removed only **if the storage is empty**. The `remove<Ext>(kiosk: &mut Kiosk, cap: &KioskOwnerCap)` function can be used to remove an extension. It will remove the extension, unpack the extension storage and configuration and rebate the storage cost to the Kiosk Owner. Can only be performed by the Kiosk Owner.

The call will fail if the storage is not empty.

**Example PTB**

```js
let txb = new TransactionBuilder();
let kioskArg = tx.object('<ID>');
let capArg = tx.object('<ID>');

txb.moveCall({
    target: '0x2::kiosk_extension::remove',
    arguments: [ kioskArg, capArg ],
    typeArguments: '<letter_box_package>::letterbox_ext::Extension'
});
```
