// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";

/**
 * Implements the Display editor for types.
 * A simple text editing application with Display update functionality.
 */
export function Display() {
    const client = useSuiClient();
    const currentAccount = useCurrentAccount();
    // const [display, setDisplay] = useState(new Map());
}
