# Mysten Kiosk

Kiosk is a flexible base for building commerce-related applications on top of it. And as such it's not providing any specifics in the implementation. However, we offer a set of extensions and rules which cover the most common use cases.

Mysten Kiosk package contains rules and extensions and aims to be a Swiss army knife for on-chain commerce. The package is being developed and upgraded regularly to make sure there's a solution for most of the common use cases.

## Repository and Code

Code is located in the [MystenLabs/apps](https://github.com/MystenLabs/apps) repository. It features the sources and instructions on how to add them to your project on both `mainnet` and `testnet` environments.

## Extensions

- [Personal Kiosk Extension](./extensions/personal-kiosk.md) makes the Kiosk non-transferrable and locks it to the owner. This allows creators to check whether their assets are traded in a user-owned Kiosk or whether it's a custom Kiosk-based solution (which may allow Kiosk trading - a way to escape policy enforcement).

## Rules

- [Royalty Rule](./rules/royalty-rule.md) allows creators to set a royalty fee for every trade of their assets. The fee is paid to the creator on every trade. Not only does it add a percentage-based fee to the trade, but it also allows setting a `min_price` - a minimum fee paid for the asset (for trades below a certain threshold).

- [Kiosk Lock Rule](./rules/kiosk_lock_rule.md) allows creators to [lock](../kiosk/locking.md) their assets in a Kiosk disabling the ["take" operation](../kiosk/place-and-take.md).

- [Personal Kiosk Rule](./rules/personal-kiosk.md) allows creators to enable trades only between personal Kiosks. Enforces the [Personal Kiosk Extension](./extensions/personal-kiosk.md) on the buyer's side.

- [Floor Price Rule](./rules/floor-price-rule.md) allows creators to set a minimum price for their assets in a Kiosk. The rule enforces the minimum price setting on the seller's side.

## SDK

Mysten Kiosk package is fully supported by the [Kiosk SDK @mysten/kiosk](https://www.npmjs.com/package/@mysten/kiosk), which provides handy functions to perform actions in a Kiosk and resolve `TransferRequest`s.
