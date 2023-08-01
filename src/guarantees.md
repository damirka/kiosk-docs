# Guarantees

The system comes with a set of guarantees that are enforced by the smart contracts. These guarantees
are:

1. Every trade operation in the [Kiosk](./kiosk/README.md) requires a
[TransferPolicy](./transfer-policy/README.md) resolution giving creators control over how their
assets are traded.

2. "True Ownership" - Kiosk Owner is the only party that can take, list, borrow and modify assets in
their Kiosk. No other party can do this. Similarly to how single owner objects work on Sui.

3. Strong Policy (eg Royalty) enforcement is an option for creators which can be enabled or disabled
at any time affecting all trades on the platform.

<!-- 4. Shared Liquidity - Kiosks  -->
