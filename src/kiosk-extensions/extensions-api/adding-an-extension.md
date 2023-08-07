# Adding an Extension

For the extension to function, it first needs to be installed by the Kiosk owner. To achieve that, an extension needs to implement the `add` function which will be called by the Kiosk owner and will request [all necessary permissions](./extension-permissions.md).

## Implementing `add` function

The signature of the `kiosk_extension::add` function requires the extension witness making it impossible to install an extension without an explicit implementation provided by the extension. The following example shows how to implement the `add` function for an extension that requires the `place` permission:

```Move
module examples::letterbox_ext {
    // ... dependencies

    /// The expected set of permissions for extension. It requires `place`.
    const PERMISSIONS: u128 = 1;

    /// The Witness struct used to identify and authorize the extension.
    struct Extension has drop {}

    /// Install the Mallbox extension into the Kiosk.
    public fun add(kiosk: &mut Kiosk, cap: &KioskOwnerCap, ctx: &mut TxContext) {
        kiosk_extension::add(Extension {}, kiosk, cap, PERMISSIONS, ctx)
    }
}
```
