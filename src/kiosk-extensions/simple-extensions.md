# Simple Extensions

Some extensions may be implemented without the "more advanced" Kiosk Extensions API. To understand
the approaches to building extensions of this kind, let's look at the tools that are available to
the extension developer.

## UID access via the `uid_mut`

Kiosk, like any object on Sui, has an `id: UID` field, which allows this object to not just be
uniquely identified but also carry custom dynamic fields and dynamic object fields. The Kiosk itself
is built around dynamic fields and features like [place](../kiosk/take-and-place.md) and
[list](../kiosk/list-and-purchase.md) are built around dynamic object fields.

### The `uid_mut_as_owner` function

Kiosk can carry additional dynamic fields and dynamic object fields. The `uid_mut_as_owner` function
allows the Kiosk Owner to mutably access the `UID` of the `Kiosk` object and use it to add or remove
custom fields.

> Function signature:
>```Move
>kiosk::uid_mut_as_owner(self: &mut Kiosk, cap: &KioskOwnerCap): &mut UID
>```

### The public `uid` getter

Anyone can read the `uid` of the Kiosk. This allows third party modules read the fields of the Kiosk
if they're allowed to do so (TODO: Custom Dynamic Field Keys). Therefore enabling the "Object
Capability" and other patterns.

<!-- ## Wrapping the KioskOwnerCap

KioskOwnerCap is a capability that makes the bearer the owner of the Kiosk. It allows the owner to -->
