# Floor Price Rule

The Floor Price Rule is a simple rule that checks that the price of the item is not lower than the floor price set in the Policy. The floor price is a minimum price that the item can be sold for. The rule can be used in some cases to prevent the item from being sold for a price lower than the creator's expectations.

## Configuration

- `amount` - the minimum price that the item can be sold for.

## Example

```ts
// 10 SUI is the minimum price for the item
policy.addRule(new FloorPriceRule({ amount: '10000000000' }));
```
