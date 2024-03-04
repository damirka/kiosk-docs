// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Button, Checkbox, Heading } from "@radix-ui/themes";
import { kioskClient } from "./kioskClient";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { SuiObjectRef } from "@mysten/sui.js/client";
import { TransferPolicyTransaction } from "@mysten/kiosk";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { DEVNET_KIOSK_PACKAGE_ID as KIOSK_PKG } from "./constants";

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
}: {
  rules: string[];
  policyId: string;
  capRef: SuiObjectRef;
  marketType: string;
}) {
  const client = useSuiClient();
  const kiosk = kioskClient(client);
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  return (
    <>
      <Heading size="3">Policy Rules</Heading>
      <p>Available rules:</p>
      <ul>
        <li>
          Royalty Rule
          <Checkbox
            checked={rules.includes(`${KIOSK_PKG}::royalty_rule::Rule`)}
            value={`${KIOSK_PKG}::royalty_rule::Rule`}
            onChange={(e) => {
              console.log(e);
            }}
          />
        </li>
        <li>
          Kiosk Lock Rule
          <Checkbox
            checked={rules.includes(`${KIOSK_PKG}::kiosk_lock_rule::Rule`)}
            value={`${KIOSK_PKG}::kiosk_lock_rule::Rule`}
          />
        </li>
        <li>
          Personal Kiosk Rule
          <Checkbox
            checked={rules.includes(`${KIOSK_PKG}::personal_kiosk_rule::Rule`)}
            value={`${KIOSK_PKG}::personal_kiosk_rule::Rule`}
          />
        </li>
        <li>
          Floor Price Rule
          <Checkbox
            checked={rules.includes(`${KIOSK_PKG}::floor_price_rule::Rule`)}
            value={`${KIOSK_PKG}::floor_price_rule::Rule`}
          />
        </li>
      </ul>
      <Button onClick={updateRules}>Update Rules</Button>
    </>
  );

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

    tpx.addPersonalKioskRule();
    tpx.addLockRule();
    tpx.addFloorPriceRule("1000000000"); // 1 SUI

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
          console.log(tx);
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  }
}
