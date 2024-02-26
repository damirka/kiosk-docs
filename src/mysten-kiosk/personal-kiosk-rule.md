# Personal Kiosk Rule

The Personal Kiosk Rule is a rule that guarantees that the buyer's Kiosk is a [Personal Kiosk](personal-kiosk.md). The rule is essential to enforce the rules set in the [Transfer Policy](transfer-policy.md), such as royalties or floor price.

## Configuration

- none

## Example

```ts
// Ensure that the buyer's Kiosk is a Personal Kiosk
policy.addRule(new PersonalKioskRule());
```
