# Creator

Creator is a party that creates and controls the [TransferPolicy](./../transfer-policy/README.md) for a single type. For example, the authors of SuiFrens are the Creators of the `SuiFren<Capy>` type and act as creators in the Kiosk ecosystem. Creators set the policy, but they may also be the first sellers of their assets through a Kiosk.

Creator can:

- [Set any rules for trades](./../transfer-policy/rules.md)
- [Set multiple ways ("tracks") of rules](./../transfer-policy/multiple-transfer-policies.md)
- Enable or disable trades at any moment with a policy
- Enforce policies (eg royalties) on all trades
- Perform a primary sale of their assets through a Kiosk

> All of the above is effective immediately and globally.

Creator can not:

- Take or modify items stored in someone else's Kiosk
- Restrict [taking](./../kiosk/place-and-take.md) items from Kiosks if the "locking" rule was not set in the policy
