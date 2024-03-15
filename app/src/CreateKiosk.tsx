// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { DEVNET_KIOSK_PACKAGE_ID } from "./constants";
import { SuiObjectChange } from "@mysten/sui.js/client";

export function CreateKiosk({
  text,
  onCreated,
}: {
  text: string;
  onCreated: (objects: SuiObjectChange[]) => void;
}) {
  const client = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Link>{text}</Link>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createKiosk();
          }}
        >
          <Dialog.Title>Create a New Kiosk</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            By clicking create, you will send a transaction that creates a Kiosk
            (1) and converts it into a personal Kiosk (2) for your account. The
            Kiosk will be available in the Kiosk Manager app. Ideally, there
            should be only one Kiosk per account.
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

  async function createKiosk() {
    const txb = new TransactionBlock();
    const [kiosk, cap] = txb.moveCall({ target: `0x2::kiosk::new` });
    const personal_cap = txb.moveCall({
      target: `${DEVNET_KIOSK_PACKAGE_ID}::personal_kiosk::new`,
      arguments: [kiosk, cap],
    });

    txb.moveCall({
      target: `${DEVNET_KIOSK_PACKAGE_ID}::personal_kiosk::transfer_to_sender`,
      arguments: [personal_cap],
    });

    txb.moveCall({
      target: `0x2::transfer::public_share_object`,
      arguments: [kiosk],
      typeArguments: [`0x2::kiosk::Kiosk`],
    });

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
