// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import {
    useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { useState } from "react";
import { StructTag } from "@mysten/sui.js/bcs";
import { normalizeStructTag } from "@mysten/sui.js/utils";

export function MintDisplaySample({
  text,
  displayType,
  onCreated,
  buttonProps,
}: {
  text: string;
  displayType: StructTag;
  buttonProps: React.ComponentProps<typeof Button>;
  onCreated: (id: string) => void;
}) {
  const client = useSuiClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  const account = useCurrentAccount();
  const { data, isPending, error, refetch: refetchSample } = useSuiClientQuery(
    "getOwnedObjects",
    {
        options: {
            showDisplay: true,
            showType: true
        },
        owner: account!.address,
        filter: { StructType: `${displayType.address}::${displayType.module}::${displayType.name}` }
    }
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button disabled={isPending || !!data?.data[0] || !!error} {...buttonProps}>{text}</Button>
      </Dialog.Trigger>

      { console.log(data?.data[0]) || <></> }

      <Dialog.Content style={{ maxWidth: 450 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mintDisplaySample();
          }}
        >
          <Dialog.Title>Mint Display NFT</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Customize the minted NFT and insert properties if needed.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name of the Item
              </Text>
              <TextField.Input
                onChange={(e) => { setName(e.target.value); }}
                placeholder="Marketplace name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextField.Input
                onChange={(e) => { setDescription(e.target.value); }}
                placeholder="My wonderful Item"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Image URL
              </Text>
              <TextField.Input
                onChange={(e) => { setImageUrl(e.target.value); }}
                placeholder="https://example.com/image.png"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Link
              </Text>
              <TextField.Input
                onChange={(e) => { setLink(e.target.value); }}
                placeholder="https://example.com"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );

  function mintDisplaySample() {
    const txb = new TransactionBlock();

    txb.moveCall({
      target: `${displayType.address}::${displayType.module}::mint_to_sender`,
      arguments: [
        txb.pure.string(name.trim()),
        txb.pure.string(description.trim()),
        txb.pure.string(image_url.trim()),
        txb.pure.string(link.trim()),
      ],
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
              const objectId = tx.effects?.created?.[0]?.reference?.objectId;

              if (objectId) {
                refetchSample();
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
