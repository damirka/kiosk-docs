// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module kiosk::my_market {
    use sui::tx_context::{Self, TxContext};
    use sui::transfer_policy;
    use sui::transfer;
    use sui::package;

    /// The OTW and the type of the marketplace.
    struct MY_MARKET has drop {}

    #[allow(lint(share_owned))]
    /// In the module initializer:
    /// 1. Claim the Publisher object
    /// 2. Create and publish a TransferPolicy
    /// 3. Send Publisher and TransferPolicyCap to the sender
    fun init(otw: MY_MARKET, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);
        let (policy, policy_cap) = transfer_policy::new<MY_MARKET>(&publisher, ctx);

        transfer::public_transfer(policy_cap, tx_context::sender(ctx));
        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_share_object(policy);
    }
}
