# Appendix A: Glossary

- **Kiosk** - a single Kiosk object that stores assets and their states, and profits from sales; protects the contents, the only party that can access and change the state is **Kiosk Owner**.

- **Kiosk Owner** - a party that owns the `KioskOwnerCap` - can be an application (represented as an object) or a single account

- **TransferPolicy** - an object that authorizes `TransferRequest`s, by default requires no actions but can be modified by adding Rules. TransferPolicy is controlled by the **Creator**, and can only receive payments and approve TransferRequests.

- **Transfer Request** - a temporary non-discardable struct (Hot Potato) created on every purchase operation in Kiosk. Must be resolved at a matching **TransferPolicy** for the transaction to succeed. If a policy has **Rules**, each of the rules must add a **Rule Receipt** to the TransferRequest before the confirmation.

- **Creator** - a party that owns the `TransferPolicyCap` - an object that grants full access to the TransferPolicy. Can be both an application (represented as an object) and a single account. 

- **Rule** - a single requirement in a **TransferPolicy** represented as a module with a unique witness type and a function to “satisfy the rule” and add a receipt in the TransferRequest.

- **Rule Receipt** - a “stamp” put into a **TransferRequest** by presenting a witness (instance of a droppable struct); receipts in the TransferRequest are compared against **Rules** added to the **TransferPolicy**, and if they match, a request can be confirmed.