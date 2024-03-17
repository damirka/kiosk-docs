// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { DEVNET_KIOSK_PACKAGE_ID } from "../constants";
import { Heading, Text } from "@radix-ui/themes";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { CreateKiosk } from "./CreateKiosk";
import { MintAndLock } from "./MintAndLock";
import { kioskClient } from "../kioskClient";
import { useEffect, useState } from "react";
import { KioskData } from "@mysten/kiosk";

const PKG = normalizeSuiAddress(DEVNET_KIOSK_PACKAGE_ID);

export function Kiosk() {
  const currentAccount = useCurrentAccount();
  const client = kioskClient(useSuiClient());
  const [kiosks, setKiosks] = useState<KioskData[]>([]);

  useEffect(() => {
    client
      .getOwnedKiosks({ address: currentAccount!.address })
      .then((res) =>
        Promise.all(
          res.kioskIds.map<Promise<KioskData>>((id) =>
            client.getKiosk({ id, options: { withKioskFields: true } }),
          ),
        ),
      )
      .then((kiosks) => setKiosks(kiosks));
  });

  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data.data || data.data.length === 0)
    return (
      <Text>
        No Kiosks found.{" "}
        <CreateKiosk
          text="Create?"
          onCreated={(objects) => {
            console.log(objects);
            refetch();
          }}
        />
      </Text>
    );

  const kioskCap = data.data[0].data?.content?.fields!.id.id as string;
  const kioskId = data.data[0].data?.content?.fields!.cap?.fields
    ?.for as string;

  return (
    <>
      <Heading size="6" className="mt-4 pb-2">
        Marketplace UI
      </Heading>
      <MintAndLock
        text="Mint new Capy to Kiosk"
        kioskId={kioskId}
        capId={kioskCap}
      />
    </>
  );
}
