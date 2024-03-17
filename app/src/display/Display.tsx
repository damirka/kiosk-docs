// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Heading, Link, Strong, Text } from "@radix-ui/themes";
import { CreateDisplay } from "./CreateDisplay";
import * as bcs from "@mysten/bcs";
import { SuiObjectRef } from "@mysten/sui.js/client";
import { DisplayEditor } from "./DisplayEditor";

export type Display = SuiObjectRef & {
  bytes: Uint8Array;
  type: string;
};

/**
 * Implements the Display editor for types.
 * A simple text editing application with Display update functionality.
 */
export function Display() {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { data, isPending, error, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      options: {
        showType: true,
        showBcs: true,
      },
      owner: currentAccount!.address,
      filter: {
        StructType: "0x2::display::Display",
      },
    },
  );

  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data.data) return <Text>No data found</Text>;

  const processed = data.data.map<Display>((d) => {
    if (d.data!.bcs!.dataType == "package") {
      throw new Error("Package data type not supported");
    }

    return {
      objectId: d.data!.objectId,
      version: d.data!.version,
      digest: d.data!.digest,
      type: d.data!.type!,
      bytes: bcs.fromB64(d.data!.bcs!.bcsBytes),
    };
  });

  return (
    <>
      <Heading size="6" className="mt-4 pb-2">
        Display Editor
      </Heading>
      <Text as="p">
        <Link href="https://docs.sui.io/standards/display">
          Sui Object Display
        </Link>{" "}
        is a templating engine which allows customizing the external
        representation of an Object using string interpolation and simple
        expressions. It disconnects the struct definition in Move and its
        "metadata", and allows for a more flexible and user-friendly
        representation of the data.
      </Text>
      <br />
      <Text as="p">
        Display syntax has one main feature - the ability to insert field values
        into the display string. For example, if a "Capy" object has a field of
        kind: "name: String", then the display string can include the name of
        the Capy object by using the syntax:
      </Text>
      <pre>
        {"\n"}
        "name": "The name of the Capy is: {`{name}`}"{"\n"}
        "link": "https://example.capy.com/{`{id}`}"{"\n"}
        {"\n"}
      </pre>
      <Text as="p">
        ...and so on. Double quotes should not be included in the display. Every
        display property can use any number of fields from the object, and the
        fields can be used multiple times in the same template.
      </Text>
      <br />
      {!data.data || data.data.length === 0 ? (
        <Text as="p">
          No Display found.{" "}
          <CreateDisplay
            onCreated={() => {
              refetch();
            }}
            text="Create?"
          />{" "}
          The creation tool exists solely for demonstration purposes and{" "}
          <Strong>should never be used</Strong> in production.
        </Text>
      ) : (
        processed.map((d) => (
          <DisplayEditor
            key={d.objectId}
            display={d}
            onSuccess={() => {
              refetch();
            }}
            {...d}
          />
        ))
      )}
    </>
  );
}
