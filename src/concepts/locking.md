# Locking

Kiosk has two ways of placing the item: the *place* and the *lock*. The former allows the item to be *taken* from the Kiosk, while the latter makes sure that the item stays in the Kiosk. The *lock* is essential to enforce the rules set in the [Transfer Policy](transfer-policy.md), such as royalties or floor price.

To ensure that the item is still locked on purchase, the creator has to set the [Lock Rule](../mysten-kiosk/lock-rule.md) in the Policy. The Lock Rule is a simple rule that checks if the purchased item is locked in the Kiosk. If the rule is not set, the item can be taken from the Kiosk and transferred to the buyer, regardless of the Policy.
