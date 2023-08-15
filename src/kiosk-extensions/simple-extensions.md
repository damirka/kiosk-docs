# Simple Extensions

Some extensions may be implemented without the "more advanced" Kiosk Extensions API. To understand the approaches to building extensions of this kind, let's look at the tools that are available to the extension developer.

## Available tools

### UID access via the `uid_mut`

Kiosk, like any object on Sui, has an `id: UID` field, which allows this object to not just be uniquely identified but also carry custom dynamic fields and dynamic object fields. The Kiosk itself is built around dynamic fields and features like [place](../kiosk/place-and-take.md) and [list](../kiosk/list-and-delist.md) are built around dynamic object fields.

### The `uid_mut_as_owner` function

Kiosk can carry additional dynamic fields and dynamic object fields. The `uid_mut_as_owner` function allows the Kiosk Owner to mutably access the `UID` of the `Kiosk` object and use it to add or remove custom fields.

> Function signature:
>```Move
>kiosk::uid_mut_as_owner(self: &mut Kiosk, cap: &KioskOwnerCap): &mut UID
>```

### The public `uid` getter

Anyone can read the `uid` of the Kiosk. This allows third party modules read the fields of the Kiosk if they're allowed to do so (TODO: Custom Dynamic Field Keys). Therefore enabling the "Object Capability" and other patterns.

<!-- ## Wrapping the KioskOwnerCap

KioskOwnerCap is a capability that makes the bearer the owner of the Kiosk. It allows the owner to -->

## Extension ideas

Given that the Kiosk Owner can attach custom dynamic fields to Kiosk, and anyone can then read them (but not modify), we can use this to implement simple extensions. For example, a "Kiosk Name" extension: the Kiosk Owner can set a name for the Kiosk, attach it as a dynamic field, and make it readable by anyone.

> We used a similar approach in the [Personal Kiosk Extension](./../mysten-kiosk/).

```Move
module examples::kiosk_name_ext {
    use std::string::String;
    use std::option::{Self, Option};
    use sui::dynamic_field as df;
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};

    /// The dynamic field key for the Kiosk Name Extension
    struct KioskName has store, drop {}

    /// Add a name to the Kiosk (in this implementation can be called only once)
    public fun add(self: &mut Kiosk, cap: &KioskOwnerCap, name: String) {
        let uid_mut = kiosk::uid_mut_as_owner(self, cap);
        df::add(uid_mut, KioskName {}, name)
    }

    /// Try read the name of the Kiosk - if set - return Some(String), if not - None
    public fun name(self: &Kiosk): Option<String> {
        if (df::exists_(kiosk::uid(self), KioskName {}) {
            option::some(*df::borrow(kiosk::uid(self), KioskName {}))
        } else {
            option::none()
        }
    }
}
```
