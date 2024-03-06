// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Button, Checkbox, Flex, Link, Section, Text } from "@radix-ui/themes";
import { kioskClient } from "./kioskClient";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { SuiObjectRef, SuiTransactionBlockResponse } from "@mysten/sui.js/client";
import { TransferPolicyTransaction } from "@mysten/kiosk";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { DEVNET_KIOSK_PACKAGE_ID as KIOSK_PKG } from "./constants";
import { normalizeSuiAddress, parseStructTag } from "@mysten/sui.js/utils";
import { useEffect, useState } from "react";
import { AutoResolverParams, detectSignature } from "./utilities/detector";
import { DeletePolicy } from "./DeletePolicy";

/**
 * RuleSet component displays all avalable rules and allows to add them to the
 * policy object. The rows are pre-filled with available rules.
 *
 * @returns
 */
export function RuleSet({
  rules,
  policyId,
  capRef,
  marketType,
  onTestRun,
  onRulesChange,
  onPolicyDelete,
}: {
  rules: string[];
  policyId: string;
  capRef: SuiObjectRef;
  marketType: string;
  onTestRun?: (tx: SuiTransactionBlockResponse) => void;
  onPolicyDelete?: (tx: SuiTransactionBlockResponse) => void;
  onRulesChange?: (tx: SuiTransactionBlockResponse) => void;
}) {
  const client = useSuiClient();
  const kiosk = kioskClient(client);
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const currState = {
    lock: rules.includes(`${KIOSK_PKG}::kiosk_lock_rule::Rule`),
    personal: rules.includes(`${KIOSK_PKG}::personal_kiosk_rule::Rule`),
    floor: rules.includes(`${KIOSK_PKG}::floor_price_rule::Rule`),

    // TODO: remove
    test: rules.includes(
      `842cde0136b4536f3e89c3a552dced7b74196a5d68a0c112dfdfd62fb0e09d91::custom_generic_rule::Rule`,
    ),
    clock: rules.includes(
      `842cde0136b4536f3e89c3a552dced7b74196a5d68a0c112dfdfd62fb0e09d91::clock_rule::Rule`,
    ),
  };

  const [lock, setLock] = useState(currState.lock);
  const [personal, setPersonal] = useState(currState.personal);
  const [floor, setFloor] = useState(currState.floor);
  const [test, setTest] = useState(currState.test);
  const [clock, setClock] = useState(currState.clock);

  const [ruleResolvers, setRuleResolvers] = useState<
    ((arg: AutoResolverParams) => void)[] | null
  >(null);

  // Fetch the rule resolvers
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching rules", rules);
        const resolvers = await Promise.all(
          rules.map(async (rule) => {
            const ruleType = parseStructTag(rule);
            const resolver = await client.getNormalizedMoveFunction({
              package: ruleType.address,
              module: ruleType.module,
              function: "prove",
            });

            return detectSignature(
              resolver,
              `${ruleType.address}::${ruleType.module}::prove`,
            );
          }),
        );
        setRuleResolvers(resolvers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [marketType]);

  return (
    <Section size="1">
      <Section size="1">
        <p>Available rules:</p>
        <ul>
          <li>
            <Text as="label" size="3">
              <Flex gap="2">
                <Checkbox
                  defaultChecked={lock}
                  onCheckedChange={() => setLock(!lock)}
                />{" "}
                Lock Rule - forces the item to be locked in the destination
                Kiosk on purchase. See{" "}
                <Link href="https://kiosk.page/mysten/concepts/locking.html">
                  Locking
                </Link>
              </Flex>
            </Text>
          </li>
          <li>
            <Text as="label" size="3">
              <Flex gap="2">
                <Checkbox
                  defaultChecked={personal}
                  onCheckedChange={() => setPersonal(!personal)}
                />{" "}
                Personal Kiosk Rule - requires the destination Kiosk to be
                Personal. See
                <Link href="https://kiosk.page/mysten/concepts/personal-non-personal-kiosk.html">
                  Personal Kiosk
                </Link>
              </Flex>
            </Text>
          </li>
          <li>
            <Text as="label" size="3">
              <Flex gap="2">
                <Checkbox
                  defaultChecked={floor}
                  onCheckedChange={() => setFloor(!floor)}
                />{" "}
                Floor Price Rule - sets a minimum price for a trade. See{" "}
                <Link href="https://kiosk.page/mysten/mysten-kiosk/floor-price-rule.html">
                  Floor Price Rule
                </Link>
              </Flex>
            </Text>
          </li>
          <li>
            <Text as="label" size="3">
              <Flex gap="2">
                <Checkbox
                  size="2"
                  defaultChecked={test}
                  onCheckedChange={() => setTest(!test)}
                />{" "}
                [Test] Generic Rule - just a rule that can be auto-detected in a test
                scenario
              </Flex>
            </Text>
          </li>
          <li>
            <Text as="label" size="3">
              <Flex gap="2">
                <Checkbox
                  defaultChecked={clock}
                  onCheckedChange={() => setClock(!clock)}
                />{" "}
                [Test] Clock Rule - uses the Clock object in an auto-detection
                scenario
              </Flex>
            </Text>
          </li>
        </ul>
      </Section>
      <Section size="1">
        <Flex gap="2">
          <Button onClick={updateRules}>Update Rules</Button>
          <Button disabled={ruleResolvers === null} onClick={testRules}>
            Test Rules
          </Button>
          <DeletePolicy
            text="Delete Policy"
            policyId={policyId}
            capRef={capRef}
            onDelete={(tx) => { onPolicyDelete && onPolicyDelete(tx); }}
          />
        </Flex>
      </Section>
    </Section>
  );

  function testRules() {
    if (!ruleResolvers) {
      console.error("No rule resolvers found");
      return;
    }

    const txb = new TransactionBlock();
    const policy = txb.object(policyId);
    const itemType = marketType;
    const [kiosk, kiosk_cap] = txb.moveCall({ target: "0x2::kiosk::new" });
    const request = txb.moveCall({
      target: "0x2::transfer_policy::new_request",
      typeArguments: [itemType],
      arguments: [
        txb.pure(normalizeSuiAddress("0x0")),
        txb.pure.u64("10000"),
        txb.pure(normalizeSuiAddress("0x0")),
      ],
    });

    ruleResolvers.forEach((resolve) =>
      resolve({
        txb,
        kiosk,
        policy,
        request,
        itemType,
        item: policy, // todo
      }),
    );

    txb.moveCall({
      target: "0x2::transfer_policy::confirm_request",
      arguments: [policy, request],
      typeArguments: [itemType],
    });

    let coin = txb.moveCall({
      target: "0x2::kiosk::close_and_withdraw",
      arguments: [kiosk, kiosk_cap],
    });

    txb.moveCall({
      target: "0x2::coin::destroy_zero",
      arguments: [coin],
      typeArguments: ["0x2::sui::SUI"],
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
          onTestRun && onTestRun(tx);
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  }

  function updateRules() {
    const txb = new TransactionBlock();
    const tpx = new TransferPolicyTransaction({
      kioskClient: kiosk,
      transactionBlock: txb,
      cap: {
        policyCapId: capRef.objectId,
        policyId: policyId,
        type: marketType,
      },
    });

    if (currState.lock !== lock) {
      if (lock) tpx.addLockRule();
      else tpx.removeLockRule();
    }

    if (currState.personal !== personal) {
      if (personal) tpx.addPersonalKioskRule();
      else tpx.removePersonalKioskRule();
    }

    if (currState.floor !== floor) {
      if (floor)
        tpx.addFloorPriceRule("0"); // 1 SUI
      else tpx.removeFloorPriceRule();
    }

    if (currState.test !== test) {
      if (test) {
        txb.moveCall({
          target:
            "0x842cde0136b4536f3e89c3a552dced7b74196a5d68a0c112dfdfd62fb0e09d91::custom_generic_rule::add",
          arguments: [txb.object(policyId), txb.objectRef(capRef)],
          typeArguments: [marketType],
        });
      }
    }

    if (currState.test !== clock) {
      if (test) {
        txb.moveCall({
          target:
            "0x842cde0136b4536f3e89c3a552dced7b74196a5d68a0c112dfdfd62fb0e09d91::clock_rule::add",
          arguments: [txb.object(policyId), txb.objectRef(capRef)],
          typeArguments: [marketType],
        });
      }
    }

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
          onRulesChange && onRulesChange(tx);
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  }
}
