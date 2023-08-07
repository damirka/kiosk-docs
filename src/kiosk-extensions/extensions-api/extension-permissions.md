# Extension Permissions

Extensions can request permissions from the Kiosk Owner on installation. Permissions follow the all or nothing principle. If the Kiosk Owner adds an extension it gets all of the requested permissions; if the Kiosk Owner then *disables* an extension, all of its permissions are revoked.

## Structure

Permissions are represented as a `u128` integer storing a [bitmap](https://en.wikipedia.org/wiki/Bit_array). Each of the bits corresponds to a permission, the first bit is the least significant bit. The following table lists all permissions and their corresponding bit:

| Bit    | Decimal | Permission
|--------|---------|--------
| `0000` | `0`     | No permissions
| `0001` | `1`     | Extension can place
| `0010` | `2`     | Extension can place and lock
| `0011` | `3`     | Extension can place and lock

Currently, Kiosk has only 2 permissions: `place` (1st bit) and `lock` and `place` (2nd bit). The rest of the bits are reserved for future use.

## Using permissions in the `add` function

It's a good practice to define a constant containing permissions of the extension:

```Move
module examples::letterbox_ext {
    // ... dependencies

    /// The expected set of permissions for extension. It requires `place`.
    const PERMISSIONS: u128 = 1;

    /// The Witness struct used to identify and authorize the extension.
    struct Extension has drop {}

    /// Install the Mallbox extension into the Kiosk and request `place` permission.
    public fun add(kiosk: &mut Kiosk, cap: &KioskOwnerCap, ctx: &mut TxContext) {
        kiosk_extension::add(Extension {}, kiosk, cap, PERMISSIONS, ctx)
    }
}
```
