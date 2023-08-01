# Kiosk Extensions

Extensions are a way to extend the functionality of Kiosk while keeping the core functionality
intact. They are a way to add new features to the Kiosk without having to modify the core code or
move the assets elsewhere.

## Types of Extensions

There are two types of extensions:

### Simple Extensions

Ones that do not require Extensions API to function. They usually serve the purpose of adding custom
metadata to the Kiosk or wrapping / working with exising objects such as `Kiosk` or `KioskOwnerCap`.
An example of an extension that does not require the API is the
[Personal Kiosk](../mysten_kiosk/extensions/personal_kiosk.md) extension.

### Permissioned Extensions

"Permissioned" extensions use the Extensions API to perform actions in the Kiosk. They usually imply
interaction with a third party and provide guarantees for the storage access (preventing the
malicious actions from the seller).
