# What is Sui Kiosk

Kiosk is a decentralized system for commerce applications on Sui. It consists of “Kiosks” - shared objects owned by individual parties which store assets and allow listing them for sale as well as utilize custom trading functionality - for example, an Auction. While being highly decentralized, Kiosk provides a set of strong guarantees:

- Kiosk Owners retain ownership of their assets to the moment of purchase;
- Creators set custom “policies” - sets of rules applied to every trade (eg pay Royalty fee, do some arbitrary action X);
- Marketplaces can index events emitted by the Kiosk and subscribe to a single feed for on-chain asset trading;

Practically, Kiosk is a part of the [Sui Framework](https://github.com/MystenLabs/sui/tree/main/crates/sui-framework/packages/sui-framework), and it is native to the system and available to everyone “out of the box”.

<!-- 

Kiosk is type defined in the `kiosk` module in the  package.

Key points:

1. Kiosk is a decentralized solution
2. Gives access to global on-chain liquidity
3. Provides safety guarantees for Kiosk owners
4. Allows creators to control all trades and fees
5. Helps marketplaces index and monetize discovery of assets

-->