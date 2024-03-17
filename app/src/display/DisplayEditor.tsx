// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from "@mysten/sui.js/bcs";
import { type Display } from "./Display";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { normalizeStructTag, parseStructTag } from "@mysten/sui.js/utils";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
    useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { MintDisplaySample } from "./MintDisplaySample";

type Update = {
  action: "add" | "edit" | "remove";
  key: string;
  value?: string;
};

type EditDisplayProps = {
  display: Display;
  onSuccess: (res: any) => void;
};

const standardProps = new Map([
  ["name", "Displayed name"],
  ["description", "Object description"],
  ["link", "Link to a website"],
  ["image_url", "URL to an image"],
  ["creator", "Creator of the Object / Collection"],
]);

const displayBcs = bcs.struct("Display", {
  id: bcs.Address,
  fields: bcs.vector(
    bcs.struct(
      "Entry",
      {
        key: bcs.string(),
        value: bcs.string(),
      },
      {},
    ),
  ),
  version: bcs.u16(),
});

export function DisplayEditor({ display, onSuccess }: EditDisplayProps) {
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const displayType = parseStructTag(display.type).typeParams[0];
  const client = useSuiClient();

  // make typescript happy
  if (typeof displayType === "string") {
    throw new Error("Invalid display type");
  }

  const rawData = displayBcs.parse(display.bytes).fields;
  const currProps = mergeProps(new Map(), rawData);
  const showProps = mergeProps(standardProps, rawData);
  const [props, setProps] = useState(currProps);



  return (
    <>
      <Flex gap="1">
        <Box className="w-20">Package:</Box>
        <Box>
          <Link href={`https://suiexplorer.com/object/${displayType.address}?network=devnet`}>{displayType.address}</Link>
          <br />
        </Box>
      </Flex>
      <Flex gap="1" className="pb-2">
        <Box className="w-20">Type:</Box>
        <Box>
          <Link href={`https://suiexplorer.com/object/${displayType.address}?network=devnet`}>
            {displayType.module}::{displayType.name}
          </Link>
        </Box>
      </Flex>
      {[...showProps.entries()].map(([key, value], i) => {
        return (
          <div key={key}>
            <TextField.Root size="3" className="mt-2">
              <TextField.Slot className="w-28">{key}</TextField.Slot>
              <TextField.Input
                onChange={(e) => {
                  props.set(key, e.target.value);
                  setProps(new Map(props));
                }}
                type="text"
                value={props.get(key) || ""}
                placeholder={standardProps.get(key) || "Text input.."}
              />
            </TextField.Root>
          </div>
        );
      })}
      {/* Placeholder for adding custom rules to display */}
      {/* <TextField.Root size="3" className="mt-2">
        <TextFieldInput
          value={newProperty.key}
          className="w-28"
          placeholder="Add"
          onChange={(e) => {
            setNewProperty({ ...newProperty, key: e.target.value });
          }}
        />
        <TextFieldInput
          value={newProperty.value}
          placeholder="New property value"
          onChange={(e) => {
            setNewProperty({ ...newProperty, value: e.target.value });
          }}
        />
        </TextField.Root> */}
      <Flex gap="1" className="mt-4 pb-4">
        <Button
          disabled={getUpdates().length === 0}
          onClick={() => {
            updateDisplay();
          }}
        >
          Update Display
        </Button>
        <MintDisplaySample
            text="Mint Sample NFT (preview)"
            onCreated={onSuccess}
            displayType={displayType}
            buttonProps={{color: "gray"}}
        />
      </Flex>
    </>
  );

  function getUpdates(): Update[] {
    const updates: Update[] = [];
    Array.from(props.entries()).forEach(([key, value]) => {
      if (currProps.has(key)) {
        if (currProps.get(key) !== value.trim()) {
          updates.push({ action: "edit", key, value });
        }
      } else {
        updates.push({ action: "add", key, value });
      }
    });

    Array.from(currProps.keys()).forEach((key) => {
      if (!props.has(key)) {
        updates.push({ action: "remove", key });
      }
    });
    return updates;
  }

  function updateDisplay() {
    const updates = getUpdates();
    const txb = new TransactionBlock();
    const displayArg = txb.objectRef(display);
    const typeArguments = [
      normalizeStructTag(parseStructTag(display.type).typeParams[0]!),
    ];

    if (updates.length === 0) {
      console.log("No changes to display");
      return;
    }

    for (let { action, key, value } of updates) {
      const args = [displayArg, txb.pure.string(key.trim())];
      switch (action) {
        case "add":
          txb.moveCall({
            target: "0x2::display::add",
            typeArguments,
            arguments: [...args, txb.pure.string(value!.trim())],
          });
          break;
        case "edit":
          txb.moveCall({
            target: "0x2::display::edit",
            typeArguments,
            arguments: [...args, txb.pure.string(value!.trim())],
          });
          break;
        case "remove":
          txb.moveCall({
            target: "0x2::display::remove",
            typeArguments,
            arguments: args,
          });
          break;
      }
    }

    txb.moveCall({
        target: "0x2::display::update_version",
        typeArguments,
        arguments: [displayArg],
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
            .then((t) => {
              onSuccess(t);
            });
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  }
}

function mergeProps<K, V>(
  standard: Map<K, V>,
  current: { key: K; value: V }[],
) {
  const merged = new Map(standard);
  for (let { key, value } of current) {
    merged.set(key, value);
  }
  return merged;
}
