# Royalty Rule

The Royalty Rule is a rule that enforces a fee to be paid to the creator of the item on each purchase. It supports a flexible configuration: the creator can set the percentage based fee and the fixed fee to be enforced on the item. Both configurations can be set at the same time, and the rule will require the buyer to pay the maximum of the two fees.

## Configuration

- `percentage` - the percentage of the item's price that the creator will receive as a fee.
- `amount` - the fixed amount that the creator will receive as a fee.

## Example

```ts
// 10% of the item's price or 0.5 SUI as a fixed fee
policy.addRule(new RoyaltyRule({ percentage: 10, amount: '500000000' }));
```
