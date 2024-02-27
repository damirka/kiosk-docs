# Kiosk Owner

As a generic primitive, Kiosk was designed to be used in various applications. As part of this design, Kiosk can be owned by different entities, such as a single account, a custom contract, or a DAO. Hence, it does not offer the concept of an owner account by default.

> The `owner` field of Kiosk is not a reliable source of truth for the owner of the Kiosk. It can be changed by the owner at any time, and it is not used in the Kiosk logic.

For guaranteed ownership detection, a [Personal Kiosk](./personal-non-personal-kiosk.md) should be used.
