// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Button } from "@radix-ui/themes";
import { DEVNET_KIOSK_PACKAGE_ID, CAPY_POLICY_ID } from "./constants";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";

type MintAndLockProps = {
  kioskId: string;
  capId: string;
  text: string;
};

/**
 * The MintAndLock component. When a button is clicked, an NFT is minted and locked
 * in the user's Kiosk. Requires kiosk ID to be passed in as a prop.
 *
 * @returns
 */
export function MintAndLock({ kioskId, capId, text }: MintAndLockProps) {
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const client = useSuiClient();

  return (
    <div>
      <Button
        content={text}
        onClick={() => {
          mintCapy(kioskId, capId);
        }}
      >{text}</Button>
    </div>
  );

  function mintCapy(kioskId: string, capId: string) {
    const txb = new TransactionBlock();
    const personal_cap = txb.object(capId);
    const capy = txb.moveCall({
      target: `${DEVNET_KIOSK_PACKAGE_ID}::nft::mint`,
    });
    const policyArg = txb.object(CAPY_POLICY_ID);
    const [cap, borrow] = txb.moveCall({
      target: `${DEVNET_KIOSK_PACKAGE_ID}::personal_kiosk::borrow_val`,
      arguments: [personal_cap],
    });

    txb.moveCall({
      target: `0x2::kiosk::lock`,
      arguments: [txb.object(kioskId), cap, policyArg, capy],
      typeArguments: [`${DEVNET_KIOSK_PACKAGE_ID}::nft::Capy`],
    });

    txb.moveCall({
      target: `${DEVNET_KIOSK_PACKAGE_ID}::personal_kiosk::return_val`,
      arguments: [personal_cap, cap, borrow],
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
                //   onCreated(objects);
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
