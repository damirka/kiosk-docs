# Mysten Kiosk Package

This section describes the Mysten's [Kiosk package](https://github.com/MystenLabs/apps/tree/main/kiosk), which provides a set of base rules and extensions aimed at setting up the common Kiosk policies. The package is designed to be used as a base for creating a [Policy](../concepts/transfer-policy.md) with a set of predefined rules, such as lock, royalty, and floor price rules.

## Quick Overview

The Kiosk package gives the basic ruleset for strong royalty enforcement: a combination of the [Lock Rule](lock-rule.md), [Royalty Rule](royalty-rule.md), and [Personal Kiosk Rule](personal-kiosk-rule.md) can be used to make sure that the item never leaves Kiosk, creator gets the royalties and the buyer is Kiosk is not a shared one and can't be transferred to another user.
