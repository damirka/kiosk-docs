# Transfer Policy

Transfer Policy (or - Asset Policy) is an object which defines the rules for the asset transfer. The policy goal is to *confirm requests* - programmable obligations that must be met before the asset can be transferred. While this system can be integrated into any application, its main use case is to enforce the rules in the Kiosk.

When an Item is purchased in a Kiosk, the buyer gets the *Item* and the *TransferRequest* for this item - the latter must be confirmed in the matching Policy for the transaction to be completed. If the Policy is not satisfied, transaction aborts. The Policy can be set up to enforce various rules, such as royalties, or a floor price.

## Policy Structure

A single Transfer Policy is created for a single type, and it can contain almost unlimited number rules. For example, a Policy can require a percentage-based roaylty, an an obligation to lock the item in the buyer's Kiosk, so that the policy will be enforced when the item is sold again.

Here's an example of a Policy:
```
TransferPolicy<Capy>
  - lock_rule
  - personal_kiosk_rule
  - royalty_rule(1% or 0.05 SUI)
```

Policy can also collect any transaction fees to be paid to the Policy owner.
