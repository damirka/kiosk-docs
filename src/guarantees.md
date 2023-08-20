# Guarantees

The system comes with a set of guarantees that are enforced by the smart contracts. These guarantees
are:

1. Every trade operation in the [Kiosk](./kiosk/) requires a
[TransferPolicy](./transfer-policy/) resolution giving creators control over how their
assets are traded.

2. "True Ownership" - Kiosk Owner is the only party that can take, list, borrow and modify assets in their Kiosk. No other party can do this. Similarly to how single owner objects work on Sui.

3. Strong Policy (eg Royalty) enforcement is an option for creators which can be enabled or disabled at any time affecting all trades on the platform.

4. Changes to the TransferPolicy are instant and global.

<!-- 4. Shared Liquidity - Kiosks  -->

---

Practical set of guarantees:

1. While an item is traded, it can not be modified or taken.

2. While PurchaseCap exists, an item is locked and can not be taken or modified unless the PCap is returned or used to perform a trade.

3. Any Rule can be removed at any time.

4. Any extension can be disabled at any time.

5. Extension state is always accessible to the extension.
