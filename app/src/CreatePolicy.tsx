// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Container } from "@radix-ui/themes";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";
// import { useNetworkVariable } from "./networkConfig";
import { fromHEX, normalizeSuiAddress } from "@mysten/sui.js/utils";

export function CreatePolicy({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const client = useSuiClient();
  // const counterPackageId = useNetworkVariable("counterPackageId");
  const account = useCurrentAccount();

  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  return (
    <Container>
      {/* <TextFieldInput size="3" placeholder="MY_MARKETPLACE" /> */}
      <Button
        size="3"
        onClick={() => {
          publish();
        }}
      >
        Publish a new Policy
      </Button>
    </Container>
  );

  async function publish() {
    const txb = new TransactionBlock();
    const bytecode = [
      ...fromHEX(
        "a11ceb0b060000000901000a020a1803222204440a054e4c079a01b90108d302400a9303050c980330000d0109010e010f01100001020001000c0003020c01000103030c010001040402000007000100010506070102020a0d01010c020b0b01010c030808090100040c03040001050405030a0307020c02080007080400040b020108000b0301080008010501060804010501080002090007080401080102060801070804020b020109000b03010900010b0301080002090005010b02010800010900095075626c69736865720854454d504c4154450e5472616e73666572506f6c696379115472616e73666572506f6c696379436170095478436f6e7465787405636c61696d0b64756d6d795f6669656c6404696e6974036e6577077061636b616765137075626c69635f73686172655f6f626a6563740f7075626c69635f7472616e736665720673656e6465720874656d706c617465087472616e736665720f7472616e736665725f706f6c6963790a74785f636f6e746578740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200020106010000000002160a012e11050c050b000a0138000c040e040b0138010c030c020b030a0538020b040b0538030b0238040200",
      ),
    ];
    const upgradeCap = txb.publish({
      modules: [bytecode],
      dependencies: [normalizeSuiAddress("0x1"), normalizeSuiAddress("0x2")],
    });

    txb.transferObjects([upgradeCap], txb.pure(account?.address));

    signAndExecute(
      {
        transactionBlock: txb,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      },
      {
        onSuccess: (tx) => {
          client
            .waitForTransactionBlock({
              digest: tx.digest,
            })
            .then(() => {
              const objectId = tx.effects?.created?.[0]?.reference?.objectId;

              if (objectId) {
                onCreated(objectId);
              }
            });
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  }
}
