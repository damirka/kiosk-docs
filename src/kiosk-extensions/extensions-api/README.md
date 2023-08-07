# Extensions API

Just having access to the `uid` is often not enough to build an extension due to the security limitations. Only Kiosk Owner has full access to the `uid`, which means that an extension involving a third party would require the Kiosk Owner to be involved in every step of the process.

Not only the access to storage is limited and constrained but also the permissions of the extension. In the default setup, no party can `place` or `lock` items in a Kiosk without its Owner's consent. So some cases such as "collection bidding" (I offer X SUI for any item in this collection) will require the Kiosk Owner to approve the bid.

### `kiosk_extension` module

To address these concerns and provide more guarantees over the storage access, we created the `kiosk_extension` module. It provides a set of functions which enable the extension developer to perform certain actions in the Kiosk without the Kiosk Owner's involvement and have a guarantee that the storage of the extension is not tampered with.

```Move
module example::my_extension {
    use sui::kiosk_extension;

    // ...
}
```

### Extension Lifecycle

1. An extension can only be installed by an explicit call in the extension module.
2. Kiosk Owner can revoke permissions of an extension at any time by calling the `disable` function.
3. A disabled extension can be re-enabled at any time by the Kiosk Owner by calling the `enable` function.
4. Extension can be removed only in if the Extension Storage is empty, i.e. all items are removed.
