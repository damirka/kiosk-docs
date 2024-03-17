// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Dialog, Flex, Link } from "@radix-ui/themes";
import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { SuiObjectChange } from "@mysten/sui.js/client";
import { fromHEX, normalizeSuiAddress, parseStructTag } from "@mysten/sui.js/utils";

import url from "@mysten/move-bytecode-template/move_bytecode_template_bg.wasm?url";
import init, * as template from "@mysten/move-bytecode-template";
import { useEffect } from "react";

/// The display template for the Display object.
const DISPLAY_TEMPLATE = fromHEX(
  "a11ceb0b060000000901000e020e1e032c2c04580a05624e07b001d301088303600ae303170cfa0345000901160209021202130217021800000200000208000104070002010c0108010306040004030c0006050200000d000100000f02010002110809010803110e0f0004070506010205140c01010c05170c01010806150a0b00040402070506050d060702080007080600050802080208020802070806020b03010801080501080002090007080601080501080102060805070806010b0301090001060806010502090005010b030108010107080601080407444953504c415907446973706c61790d446973706c617953616d706c65095075626c697368657206537472696e67095478436f6e746578740355494405636c61696d0b6465736372697074696f6e07646973706c61790b64756d6d795f6669656c6402696409696d6167655f75726c04696e6974046c696e6b0e6d696e745f746f5f73656e646572046e616d65036e6577066f626a656374077061636b6167650f7075626c69635f7472616e736665720673656e64657206737472696e67087472616e736665720a74785f636f6e746578740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020002010a010102050b08041008020808020c08020e08020000000003130b000a0138000c030e030a0138010c020b030a012e110738020b020b012e110738030201010000010c0a0411030b000b010b020b0312010b042e110738040200",
);

export function CreateDisplay({
  text,
  onCreated,
}: {
  text: string;
  onCreated: (objects: SuiObjectChange[]) => void;
}) {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  useEffect(() => {
    init(url);
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Link>{text}</Link>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            publishTypeWithDisplay("Display");
          }}
        >
          <Dialog.Title>Publish a new Type and create Display</Dialog.Title>
          <Dialog.Description size="3" mb="4">
            By clicking create, you will send a transaction that publishes a new
            module with a type "DisplaySample". In the module initializer, it
            uses the One-Time-Witness to create the Publisher object, which then
            used to create the Display object.
            <br />
            <br />
            This tool should only be used for demonstration purposes on devnet
            or testnet.
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Create</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );

  async function publishTypeWithDisplay(type: string) {
    const typeName = type[0].toUpperCase() + type.slice(1) + "Sample";
    const bytecode = template.update_identifiers(DISPLAY_TEMPLATE, {
      DisplaySample: typeName,
    });

    const txb = new TransactionBlock();
    const moduleBytes = [...bytecode];
    const upgradeCap = txb.publish({
      modules: [moduleBytes],
      dependencies: [normalizeSuiAddress("0x1"), normalizeSuiAddress("0x2")],
    });

    txb.transferObjects([upgradeCap], txb.pure(account!.address));

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
              const objects = tx.objectChanges;

              if (objects) {
                onCreated(objects);
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
