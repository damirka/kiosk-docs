// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module examples::letter {
    use sui::tx_context::{sender, TxContext};
    use sui::object::{Self, UID};
    use sui::transfer_policy;
    use sui::package;

    /// The OTW of the module.
    struct LETTER has drop {}

    /// A single `Letter` object.
    struct Letter has key {
        id: UID,
        content: String
    }

    /// Create and claim the `Publisher` in the initializer.
    fun init(otw: LETTER, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);
        let (policy, policy_cap) = transfer_policy::new<Letter>(ctx);

        transfer::public_share_object(policy);
        transfer::public_transfer(policy_cap, sender(ctx));
        transfer::public_transfer(publisher, sender(ctx));
    }

    /// Create a new `Letter` object.
    public fun write(content: String, ctx: &mut TxContext): Letter {
        Letter { id: object::new(ctx), content }
    }
}

/// A simple extension for the Kiosk which allows delivering "Letters" to the
/// Kiosk. This is used in the Extensions API section of the book.
module examples::letterbox_ext {
    use sui::kiosk_extension as ext;
    use sui::tx_context::TxContext;
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};

    use examples::letter;

    /// Extension not installed.
    const ENotInstalled: u64 = 0;

    /// The expected set of permissions for extension. It requires `place`.
    const PERMISSIONS: u128 = 1;

    /// The Witness struct used to identify and authorize the extension.
    struct Extension has drop {}

    /// Install the Mallbox extension into the Kiosk.
    entry fun add(kiosk: &mut Kiosk, cap: &KioskOwnerCap, ctx: &mut TxContext) {
        ext::add(Extension {}, kiosk, cap, PERMISSIONS, ctx)
    }

    /// Deliver a "Letter" to the Kiosk. The `TransferPolicy<Letter>` is required
    /// by the extensions API to ensure that extensions only place tradable objects.
    public fun deliver(kiosk: &mut Kiosk, letter: Letter, policy: &TransferPolicy<Letter>) {
        assert!(ext::is_installed<Extension>(kiosk), ENotInstalled);
        ext::place(Extension {}, kiosk, letter, policy)
    }
}
