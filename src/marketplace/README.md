# Kiosk for Marketplaces

This section describes how to utilize Kiosk for marketplaces. While being a decentralized system focused on fair policy enforcement, Kiosk can be used to create a marketplace with various trading mechanisms. This section covers the Mysten's [Kiosk Marketplace](https://github.com/MystenLabs/apps/tree/main/kiosk-marketplace) package, which provides a set of base modules to implement a marketplace with Kiosk.

## Quick Overview

The Kiosk Marketplace package builds upon the idea of policy enforcement. But unlike the default Kiosk functions, which focus on satisfying a single policy, the marketplace package creates two requests for each trade: one for the creator and one for the marketplace. This allows the marketplace to enforce its own policies, such as a fee for each trade, while reusing the exising rules originally intended for creators.

In the [Policy Setting](./policy-setting.md) section, we illustrate the process of setting a policy for a marketplace. In the following sections, we describe how to utilize the marketplace adapter and its trading mechanisms to implement marketplace functionality on top of Kiosk.

## Features

- [Fixed Price Trading](./fixed-price-trading.md) - a simple "list for 10 SUI" trading, where the buyer can purchase the item for a fixed price.
- [Collection Bidding](./collection-bidding.md) - a trading mechanism where the buyer can bid on a collection of items offering multiple Coins.
- [Single Item Bidding](./single-item-bidding.md) - a trading mechanism where the buyer can bid on a single item offering a Coin.

Moreover, we describe how to [Index Events](./indexing-events.md) to allow the marketplace to track the trades and provide a better user experience. Marketplace Adapter puts an emphasis on the developer tooling and provides richer set of events to be indexed.
