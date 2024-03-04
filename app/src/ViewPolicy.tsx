// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiObjectData, SuiObjectRef } from "@mysten/sui.js/client";
import { Text, Flex, Heading } from "@radix-ui/themes";
import { RuleSet } from "./RuleSet";

type ViewPolicyProps = {
  id: string;
  marketType: string;
  capRef: SuiObjectRef;
};

/**
 * Display a policy, allow viewing and editing.
 */
export function ViewPolicy({ id, capRef, marketType }: ViewPolicyProps) {
  const { data, isPending, error } = useSuiClientQuery("getObject", {
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
      <Heading size="3">Policy {id}</Heading>
      <Flex gap="4">
        <Text>Owner: {details?.owner}</Text>
        <Text>Balance: {details?.balance}</Text>
        <Text>Rules:</Text>
        <ul>
          {details?.rules.map((rule, index) => (
            <li key={`${rule}-${index}`}>{JSON.stringify(rule)}</li>
          ))}
        </ul>
      </Flex>
      <RuleSet
        rules={details?.rules!}
        policyId={id}
        capRef={capRef}
        marketType={marketType}
      />
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
