// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// A simple rule for testing custom generic rules detection.
module test::clock_rule {
    use sui::transfer_policy::{Self, TransferPolicy, TransferPolicyCap, TransferRequest};
    use sui::tx_context::TxContext;
    use sui::clock::Clock;

    struct Rule has drop {}
    struct Config has store, drop {}

    public fun prove<T>(
        req: &mut TransferRequest<T>,
        _clock: &Clock,
        _ctx: &mut TxContext
    ) {
        transfer_policy::add_receipt(Rule {}, req)
    }

    /// Creator: Adds a `kiosk_lock_rule` Rule to the `TransferPolicy` forcing
    /// buyers to lock the item in a Kiosk on purchase.
    public fun add<T>(policy: &mut TransferPolicy<T>, cap: &TransferPolicyCap<T>) {
        transfer_policy::add_rule(Rule {}, policy, cap, Config {})
    }
}
