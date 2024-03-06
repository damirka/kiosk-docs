# Personal Kiosk

Because of the [ownership model](./kiosk-owner.md), Kiosk does not have a concept of an owner account by default. However, to address the need for personal (or - soulbound) Kiosks, we introduce the concept of personal (soulbound) and non-personal (default) Kiosks.

## Personal Kiosk

Personal Kiosk is a simple extension included in the Mysten Kiosk package which makes the Kiosk souldbound to the account that created it. Once Kiosk has been converted to Personal, there's no way to change it back to non-personal.

## Enforcing Personal Kiosk

Creators may choose to enforce PersonalKiosk rule in the TransferPolicy to ensure that the buyer's Kiosk is a Personal Kiosk. This rule is essential for strong royalty enforcement.
