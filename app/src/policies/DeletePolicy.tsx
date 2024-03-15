// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// Button to delete a Policy, takes the policyId parameter and fetches
// the object from the network. Then runs the delete transaction.

import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { SharedObjectRef } from "@mysten/sui.js/bcs";
import {
  SuiObjectData,
  SuiObjectRef,
  SuiTransactionBlockResponse,
} from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { normalizeStructTag, parseStructTag } from "@mysten/sui.js/utils";
import { Button } from "@radix-ui/themes";

export function DeletePolicy({
  policyId,
  text,
  capRef,
  onDelete,
}: {
  text: string;
  policyId: string;
  capRef: SuiObjectRef;
  onDelete?: (tx: SuiTransactionBlockResponse) => void;
}) {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const { data, isPending, error } = useSuiClientQuery("getObject", {
    id: policyId,
    options: {
      showType: true,
      showOwner: true,
    },
  });

  if (!account) return null;
  if (isPending) return <Button disabled>Loading...</Button>;
  if (error) return <Button disabled>Delete</Button>;
  if (!data.data) return <Button disabled>Delete</Button>;

  const policyObjectRef = getPolicyRef(data.data);
  const itemType = parseStructTag(data.data.type!).typeParams[0];

  if (!policyObjectRef) return <Button disabled>Delete</Button>;

  return (
    <Button
      onClick={() => {
        deletePolicy();
      }}
    >
      {text}
    </Button>
  );

  function deletePolicy() {
    const txb = new TransactionBlock();
    const refArg =
      "mutable" in policyObjectRef!
        ? txb.sharedObjectRef(policyObjectRef!)
        : txb.objectRef(policyObjectRef!);

    const proceeds = txb.moveCall({
      target: "0x2::transfer_policy::destroy_and_withdraw",
      typeArguments: [normalizeStructTag(itemType)],
      arguments: [refArg, txb.objectRef(capRef)],
    });

    txb.transferObjects([proceeds], txb.pure(account?.address));

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
          onDelete && onDelete(tx);
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  }
}

/**
 * Get the policy reference for the delete transaction.
 *
 * @param data
 * @returns
 */
function getPolicyRef(
  data: SuiObjectData,
): SuiObjectRef | SharedObjectRef | null {
  if (!data.owner || typeof data.owner != "object") {
    throw new Error("Owner not fetched or the object is 'Immutable'");
  }

  // We allow deleting Shared policies;
  if ("Shared" in data.owner) {
    return {
      objectId: data.objectId,
      mutable: true,
      initialSharedVersion: data.owner.Shared.initial_shared_version!,
    };
  }

  // We also allow deleting Owned policies;
  if ("AddressOwner" in data.owner) {
    return {
      objectId: data.objectId,
      version: data.version,
      digest: data.digest,
    };
  }

  return null;
}
