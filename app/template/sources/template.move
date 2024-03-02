// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// This is a template for a Marketplace transfer policy. Unlike creator's policy,
/// it does not require an asset linked to it, and can be set independently.
module template::template {
    use sui::tx_context::{Self, TxContext};
    use sui::transfer_policy;
    use sui::transfer;
    use sui::package;

    /// The OTW type parameter for the policy.
    /// Should be changed to the name of the marketplace, eg "OPENSEA".
    struct TEMPLATE has drop {}

    #[allow(lint(share_owned))]
    /// 1. Creates the Publisher object, creates the `TransferPolicy<TEMPLATE>`.
    /// 2. Sends `Publisher` and `TransferPolicyCap` to sender.
    /// 3. Shares the `TransferPolicy<TEMPLATE>` object.
    fun init(otw: TEMPLATE, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        let publisher = package::claim(otw, ctx);
        let (policy, policy_cap) = transfer_policy::new<TEMPLATE>(&publisher, ctx);

        transfer::public_transfer(policy_cap, sender);
        transfer::public_transfer(publisher, sender);
        transfer::public_share_object(policy);
    }
}
