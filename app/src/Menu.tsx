// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {} from "@mysten/dapp-kit";
import * as Navigation from "@radix-ui/react-navigation-menu";
import { Flex } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

export function Menu() {
  return (
    <Navigation.Root className="relative mt-3 p-1 flex w-screen justify-start">
      <Navigation.List className="center m-0 flex list-none justify-start p-1">
        <Flex gap="4">
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/policies">
            Marketplace Policies
          </NavLink>
          <NavLink to="/marketplace">
            Marketplace Interface
          </NavLink>
          <NavLink to="/kiosk">
            Kiosk
          </NavLink>
        </Flex>
      </Navigation.List>
    </Navigation.Root>
  );
}
