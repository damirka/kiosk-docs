// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { DEVNET_KIOSK_PACKAGE_ID } from "./constants";
import { Heading, Text } from "@radix-ui/themes";
import { normalizeSuiAddress } from "@mysten/sui.js/utils";
import { CreateKiosk } from "./CreateKiosk";
import { MintAndLock } from "./MintAndLock";

const PKG = normalizeSuiAddress(DEVNET_KIOSK_PACKAGE_ID);

export function Kiosk() {
  const currentAccount = useCurrentAccount();
  const { data, isPending, error, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      options: {
        showContent: true,
      },
      owner: currentAccount!.address,
      filter: {
        MatchAny: [
          { StructType: `${PKG}::personal_kiosk::PersonalKioskCap` },
          { StructType: `0x2::kiosk::KioskOwnerCap` },
        ],
      },
    },
  );

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
