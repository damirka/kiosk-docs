import { SuiClient } from "@mysten/sui.js/client";
import { KioskClient, Network } from "@mysten/kiosk";
import { DEVNET_KIOSK_PACKAGE_ID as KIOSK_PKG } from "./constants";

// Now we can use it to create a kiosk Client.
export function kioskClient(client: SuiClient) {
  return new KioskClient({
    client,
    network: Network.CUSTOM,
    packageIds: {
      royaltyRulePackageId: KIOSK_PKG,
      kioskLockRulePackageId: KIOSK_PKG,
      personalKioskRulePackageId: KIOSK_PKG,
      floorPriceRulePackageId: KIOSK_PKG,
    },
  });
}
