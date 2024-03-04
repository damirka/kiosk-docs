// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiObjectData } from "@mysten/sui.js/client";
import {
  normalizeStructTag,
  normalizeSuiAddress,
  parseStructTag,
} from "@mysten/sui.js/utils";
import { Button, Container, Heading, Text } from "@radix-ui/themes";
import { DeletePolicy } from "./DeletePolicy";
import { useState } from "react";
import { ViewPolicy } from "./ViewPolicy";
import { CreatePolicy } from "./CreatePolicy";

// Display policies that the account owns, allow viewing them + deleting.
export function Policies() {
  const currentAccount = useCurrentAccount();
  const [policyId, setPolicyId] = useState<string | null>(null);

  const { data, isPending, error, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount!.address,
      filter: {
        MoveModule: {
          package: normalizeSuiAddress("0x2"),
          module: "transfer_policy",
        },
      },
      options: {
        showContent: true,
        showOwner: true,
      },
    },
  );

  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data.data) return <Text>Not found</Text>;

  let markets = data.data
    .filter((e) => !!e.data)
    .map((e) => getMarket(e.data!))
    .filter((e) => !!e);

  return (
    <>
      <Heading size="5">My Transfer Policies</Heading>
      <CreatePolicy
        onCreated={(_id) => {
          refetch();
        }}
      />
      {markets.map(
        (m) =>
          m && (
            <div key={m.market}>
              <Heading size="4">Market: {m.market}</Heading>
              <Button
                onClick={() => {
                  setPolicyId(m.policyId);
                  // [
                  // m.policyId,
                  // m.marketType,
                  // m.objectRef
                  // ]
                }}
              >
                View
              </Button>
              <DeletePolicy
                policyId={m.policyId}
                capRef={m.objectRef}
                onDelete={() => refetch()}
              />
            </div>
          ),
      )}
      <Container>
        {policyId && (
          <ViewPolicy
            id={policyId}
            // marketType={marketType}
            // capRef={capRef}
          />
        )}
      </Container>
    </>
  );
}

/**
 * Read the TransferPolicyCap<T> details. Given that we fetched "owned" object,
 * the SuiObjectRef will always be correct (no need for shared object scenario).
 *
 * @param data
 * @returns
 */
function getMarket(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") {
    return null;
  }

  let fields = data.content.fields as { policy_id: string };
  let type = parseStructTag(data.content.type);

  // very silly check, TransferPolicy can't have a string TypeParam
  if (typeof type.typeParams[0] === "string") {
    return null;
  }

  return {
    market: type.typeParams[0].name,
    marketType: normalizeStructTag(type.typeParams[0]),
    policyId: fields.policy_id,
    objectRef: {
      objectId: data.objectId,
      version: data.version,
      digest: data.digest,
    },
  };
}
