// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Heading, Text } from "@radix-ui/themes";

export function Home() {
    return (
        <div>
            <Heading size="6" className="mt-4">Home</Heading>
            <Text className="mt-2 block">This is a demo application which demonstrates capabilities of Kiosk and its utilities.</Text>
        </div>
    );
}
