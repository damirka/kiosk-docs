# Building with Kiosk
Kiosk comes with a simple trading functionality which consists of two functions: `list` (and a matching `delist`) and `purchase`. It emits events when an action happens which enables off-chain discovery of Kiosk activity. 

An application utilizing Kiosk‘s default functions needs to be able to interact with Kiosks, listen to Kiosk events and update the interfaces accordingly and resolve [TransferRequests](../transfer-policy) on purchase. While an application creating custom logic for Kiosks needs to also build interaction logic based on PurchaseCap’s and emit events to track its activity off-chain.

In this section we go through main areas which need to be covered for both default and custom flows and look into what’s necessary to build an application with Kiosk.
