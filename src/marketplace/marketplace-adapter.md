# Marketplace Adapter

Marketplace Adapter is a thin wrapper for the standard `PurchaseCap` functionality defined in the Kiosk. Unlike the `PurchaseCap` which enforces a single policy by creating a TransferRequest when used, the `MarketplaceAdapter` allows for two policies to be enforced: one for the creator and one for the marketplace.

When a buyer purchases an item using one of the trading modules, the `MarketplaceAdapter` creates two TransferRequests: one for the creator and one for the marketplace. This allows the marketplace to enforce its own policies, such as a fee for each trade, while reusing the existing rules originally intended for creators.

## Features

- Marketplace can act as a policy-owner and enforce its own rules.
- Existing ruleset can be reused for the marketplace policies.
- The use of two TransferRequests allows for "marketplace-locking" mechanics, giving creators an option to allow trading only on a specified marketplace.

## Quick Start

To start using the `MarketplaceAdapter`, a developer needs to create a new TransferPolicy using a standard template (see [Marketplace Guide](./../guides/marketplace.md)). The rest of the features can be implemented in off-chain, using the rest of the Kiosk Marketplace package.
