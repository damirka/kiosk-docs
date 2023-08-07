# Extension Storage

Every extension gets its isolated storage which can be accessed only by the extension module (providing the Extension Witness). It's a [`Bag`](https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/bag.move). Once an extension is installed, it can use the storage to store its data. Ideally, the storage should be managed in a way that allows the extension to be removed from the Kiosk if there are no active trades or other activities happening at the moment.

> The storage is always available to the extension if it is installed. Kiosk Owner can't access the storage of the extension if the logic for it is not implemented.

## Accessing the storage

An installed extension can access the storage mutably or immutably using one of the following functions:

- `storage(_ext: Extension {}, kiosk: &Kiosk): Bag`: returns a reference to the storage of the extension. Can be used to read the storage.
- `storage_mut(_ext: Extension {}, kiosk: &mut Kiosk): &mut Bag`: returns a mutable reference to the storage of the extension. Can be used to read and write to the storage.
