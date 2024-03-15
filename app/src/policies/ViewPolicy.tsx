// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useSuiClientQuery } from "@mysten/dapp-kit";
import {
  SuiObjectData,
  SuiObjectRef,
  SuiTransactionBlockResponse,
} from "@mysten/sui.js/client";
import { Text, Flex, Link } from "@radix-ui/themes";
import { RuleSet } from "./RuleSet";
import { useState } from "react";

type ViewPolicyProps = {
  id: string;
  marketType: string;
  capRef: SuiObjectRef;
  onDelete?: (tx: SuiTransactionBlockResponse) => void;
};

/**
 * Display a policy, allow viewing and editing.
 */
export function ViewPolicy({
  id,
  capRef,
  marketType,
  onDelete,
}: ViewPolicyProps) {
  const [lastTx, setLastTx] = useState<SuiTransactionBlockResponse | null>(null);
  const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  if (isPending) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data.data) return <Text>Not found</Text>;

  const details = policyDetails(data.data);

  return (
    <>
      <p>Policy Overview</p>
      <Flex gap="4">
        <ul>
          <li>
            <Text size="3">
              ID:{" "}
              <Link
                href={`https://suiexplorer.com/object/${id}?network=devnet`}
              >
                {id}
              </Link>
            </Text>
          </li>
          <li>
            <Text size="3">Rules: {details?.rules.length}</Text>
          </li>
          <li>
            <Text size="3">Balance: {details?.balance} SUI</Text>
          </li>
          <li>
            <Text size="3">Owner: {details?.owner}</Text>
          </li>
        </ul>
      </Flex>
      <RuleSet
        rules={details?.rules!}
        policyId={id}
        capRef={capRef}
        marketType={marketType}
        onRulesChange={(tx) => {
          refetch();
          setLastTx(tx);
        }}
        onPolicyDelete={(tx) => {
          onDelete && onDelete(tx);
          setLastTx(tx);
        }}
        onTestRun={(tx) => {
          setLastTx(tx);
        }}
      />
      <Text size="3" hidden={!lastTx}>
        <Link href={`https://suiexplorer.com/txblock/${lastTx?.digest}?network=devnet`}>Last Transaction in Sui Explorer</Link>
      </Text>
    </>
  );
}

/**
 * Read the policy details from the object data.
 * Most important part is the Rules: they can be edited and they are what
 * the policy is all about.
 *
 * @param policy
 */
function policyDetails(policy: SuiObjectData) {
  if (policy.content?.dataType == "package") {
    return null;
  }

  const data = policy.content!.fields as { [key: string]: any };
  const rules = data.rules.fields.contents.map(
    (e: any) => e.fields.name,
  ) as string[];

  return {
    owner: "Shared", // TODO: proper toString for the owner
    rules,
    balance: data.balance,
  };
}
