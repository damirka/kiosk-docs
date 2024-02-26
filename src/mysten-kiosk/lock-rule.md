# Lock Rule

The Lock Rule is an important rule that checks if the purchased item is locked in the buyer's Kiosk. If the rule is not set, the item can be taken from the Kiosk, regardless of the Policy.

## Configuration

- none

## Example

```ts
// Lock the item in the buyer's Kiosk
policy.addRule(new LockRule());
```
