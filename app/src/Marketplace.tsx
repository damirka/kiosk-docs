// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { kioskClient } from "./kioskClient";
import { useEffect, useState } from "react";
import { KioskData, OwnedKiosks } from "@mysten/kiosk";
import {
  Card,
  Heading,
  Inset,
  Text,
  Strong,
  Button,
  Box,
} from "@radix-ui/themes";

export function Marketplace() {
  const client = kioskClient(useSuiClient());
  const currentAccount = useCurrentAccount();
  const [kiosks, setKiosks] = useState<OwnedKiosks | null>(null);
  const [kiosk, setKiosk] = useState<KioskData | null>(null);

  useEffect(() => {
    if (currentAccount) {
      client
        .getOwnedKiosks({ address: currentAccount!.address })
        .then(setKiosks);
    }
  }, [currentAccount]);

  useEffect(() => {
    if (kiosks?.kioskIds) {
      client
        .getKiosk({
          id: kiosks.kioskIds[0],
          options: {
            withObjects: true,
            objectOptions: { showDisplay: true },
          },
        })
        .then((kiosk) => {
          setKiosk(kiosk || null);
        });
    }
  }, [kiosks?.kioskIds]);

  if (kiosks === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <div>
      <Heading size="6" className="mt-4 pb-2">
        Marketplace UI
      </Heading>
      <div className="flex justify">
        {kiosk &&
          kiosk.items.map((item) => {
            let {
              name,
              description,
              image_url,
              link: _,
            } = item.data?.display?.data as {
              name: string;
              description: string;
              image_url: string;
              link: string;
            };

            return (
              <Box width="auto">
                <Card size="2" className="space-y-4 m-2">
                  <Inset clip="padding-box" side="top" pb="current">
                    <img
                      src={image_url}
                      alt="Bold typography"
                      style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 140,
                        backgroundColor: "var(--gray-5)",
                      }}
                    />
                  </Inset>
                  <Text as="p" size="3">
                    <Strong>{name.slice(0, 10)}...</Strong>
                  </Text>
                  <div className="flex">
                    <Button>List</Button>
                  </div>
                </Card>
              </Box>
            );
          })}
      </div>
    </div>
  );
}
