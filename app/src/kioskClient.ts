import { SuiClient } from "@mysten/sui.js/client";
import { KioskClient, Network } from "@mysten/kiosk";
import { DEVNET_KIOSK_PACKAGE_ID as KIOSK_PKG } from "./constants";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";

const PKG = normalizeSuiAddress(KIOSK_PKG);

// Now we can use it to create a kiosk Client.
export function kioskClient(client: SuiClient) {
  return new KioskClient({
    client,
    network: Network.CUSTOM,
    packageIds: {
      royaltyRulePackageId: PKG,
      kioskLockRulePackageId: PKG,
      personalKioskRulePackageId: PKG,
      floorPriceRulePackageId: PKG,
    },
  });
}
