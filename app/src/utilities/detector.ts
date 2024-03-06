// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SuiMoveNormalizedFunction } from "@mysten/sui.js/client";
import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";

/**
 * List of available types for the automatic rule detection.
 * Internal to the tool.
 */
enum Types {
  Item = "Item",
  Kiosk = "Kiosk",
  Policy = "Policy",
  Request = "Request",
  Clock = "Clock",
  Ctx = "Context",
}

/**
 * Params required for the rule resolution.
 */
export type AutoResolverParams = {
  txb: TransactionBlock;
  itemType: string;
  item: TransactionArgument;
  kiosk: TransactionArgument;
  policy: TransactionArgument;
  request: TransactionArgument;
};

/**
 * The approach for automatic rule detection is the following:
 *
 * - get the normalized function signature from the RPC
 * - we know preemptively what arguments can be used in this function
 * - collect the order of the arguments and their types
 * - return a callback which assembles the txb call
 *
 * The signature can take any of:
 *
 * - &mut TransferRequest<T> (must take) - the request to confirm
 * - &Item (the T parameter) - the item being transferred
 * - &Kiosk - destination kiosk (the one that receives the item)
 * - &Clock - the clock (0x6) object for time based rules
 * - &mut TransferPolicy<T> - the policy for which the request is made (can be immutable)
 * - &mut TxContext - the transaction context (ignored)
 *
 * Each of the arguments can only be used at most once.
 *
 * For application specific rules, we need to detect the T from the signature.
 * Imagine a rule that explicitly takes only SuiFren<Capy> and applies to Capy
 * objects. A signature like this won't contain a generic `T`, hence we need to:
 *
 * 1. Detect the type of T from `TransferRequest`
 * 2. Provide an extra check that the T in resolution matches the expected T
 *
 * @param sig  Normalized function signature from the RPC
 * @param name Name of the function
 * @return A callback that assembles the txb call
 */
export function detectSignature(
  sig: SuiMoveNormalizedFunction,
  name: string,
): (params: AutoResolverParams) => void {
  if (sig.visibility !== "Public") {
    throw new Error(`Function is not public: ${name}`);
  }

  if (sig.isEntry) {
    throw new Error(`Can't use "entry" function: ${name}`);
  }

  if (sig.typeParameters.length > 1) {
    throw new Error(`Function "${name}" must have only 0 or 1 type parameter`);
  }

  // Find the `&mut TransferRequest<T>` parameter.
  let requestArg = sig.parameters.find(
    (p) =>
      typeof p === "object" &&
      "MutableReference" in p &&
      typeof p.MutableReference === "object" &&
      "Struct" in p.MutableReference &&
      p.MutableReference.Struct.address == "0x2" &&
      p.MutableReference.Struct.module == "transfer_policy" &&
      p.MutableReference.Struct.name == "TransferRequest",
  );

  if (!requestArg) {
    throw new Error(
      `Function "${name}" must have a &mut TransferRequest<T> parameter`,
    );
  }

  // @ts-ignore
  const typeArg = requestArg.MutableReference.Struct.typeArguments[0];
  const argsList = [] as Types[];
  const isGeneric = sig.typeParameters.length > 0;

  for (let param of sig.parameters) {
    if (typeof param !== "object") {
      throw new Error(
        `Invalid parameter in ${name}; only struct params are available: ${JSON.stringify(param)}`,
      );
    }

    if (!("Reference" in param || "MutableReference" in param)) {
      throw new Error(
        `Invalid parameter in ${name}; only reference or mutable reference params are available: ${JSON.stringify(param)}`,
      );
    }

    // We already found the request argument, so we can skip it
    if (param === requestArg) {
      argsList.push(Types.Request);
      continue;
    }

    if (JSON.stringify(param) === JSON.stringify({ Reference: typeArg })) {
      argsList.push(Types.Item);
      continue;
    }

    // Allow `&0x2::kiosk::Kiosk` as a parameter
    if (
      "Reference" in param &&
      typeof param.Reference === "object" &&
      "Struct" in param.Reference &&
      param.Reference.Struct.address == "0x2" &&
      param.Reference.Struct.module == "kiosk" &&
      param.Reference.Struct.name == "Kiosk"
    ) {
      argsList.push(Types.Kiosk);
      continue;
    }

    // Allow `&0x2::transfer_policy::TransferPolicy<T>` as a parameter
    if (
      "Reference" in param &&
      typeof param.Reference === "object" &&
      "Struct" in param.Reference &&
      param.Reference.Struct.address == "0x2" &&
      param.Reference.Struct.module == "transfer_policy" &&
      param.Reference.Struct.name == "TransferPolicy"
    ) {
      argsList.push(Types.Policy);
      continue;
    }

    // Allow &mut 0x2::transfer_policy::TransferPolicy<T> as a parameter
    if (
        "MutableReference" in param &&
        typeof param.MutableReference === "object" &&
        "Struct" in param.MutableReference &&
        param.MutableReference.Struct.address == "0x2" &&
        param.MutableReference.Struct.module == "transfer_policy" &&
        param.MutableReference.Struct.name == "TransferPolicy"
      ) {
        argsList.push(Types.Policy);
        continue;
      }

    // Allow &0x2::clock::Clock as a parameter
      if (
        "Reference" in param &&
        typeof param.Reference === "object" &&
        "Struct" in param.Reference &&
        param.Reference.Struct.address == "0x2" &&
        param.Reference.Struct.module == "clock" &&
        param.Reference.Struct.name == "Clock"
      ) {
        argsList.push(Types.Clock);
        continue;
      }

    // Allow `&mut 0x2::transfer_policy::TxContext` as a parameter
    if (
      "MutableReference" in param &&
      typeof param.MutableReference === "object" &&
      "Struct" in param.MutableReference &&
      param.MutableReference.Struct.address == "0x2" &&
      param.MutableReference.Struct.module == "tx_context" &&
      param.MutableReference.Struct.name == "TxContext"
    ) {
      continue;
    }

    // Allow `&0x2::tx_context::TxContext` as a parameter
    if (
      "Reference" in param &&
      typeof param.Reference === "object" &&
      "Struct" in param.Reference &&
      param.Reference.Struct.address == "0x2" &&
      param.Reference.Struct.module == "tx_context" &&
      param.Reference.Struct.name == "TxContext"
    ) {
      continue;
    }

    throw new Error(
      `Unexpected parameter in signature; function: ${name}, param: ${JSON.stringify(param)}`,
    );
  }

  console.log(`Detected signature for ${name}:`, argsList, isGeneric, typeArg);

  return function resolveRule({
    txb,
    itemType,
    item,
    kiosk,
    policy,
    request,
  }: {
    txb: TransactionBlock;
    item: TransactionArgument;
    kiosk: TransactionArgument;
    policy: TransactionArgument;
    request: TransactionArgument;
    itemType: string;
  }) {
    txb.moveCall({
      target: name as `${string}::${string}::${string}`,
      arguments: argsList.map((arg) => {
        switch (arg) {
          case Types.Item:
            return item;
          case Types.Kiosk:
            return kiosk;
          case Types.Policy:
            return policy;
          case Types.Request:
            return request;
          case Types.Clock:
            return txb.object('0x6');
          default:
            throw new Error(`Unknown argument type: ${arg}`);
        }
      }),
      typeArguments: isGeneric ? [itemType] : [],
    });
  };
}
