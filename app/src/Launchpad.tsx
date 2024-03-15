// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Link } from "@radix-ui/themes";

export function Launchpad() {
  return (
    <div>
      <h1>Welcome to the Launchpad</h1>
      <p>This is the Launchpad. From here you can access the different apps.</p>
      <p>
        <Link to="/policies">Marketplace Policies</Link>
      </p>
      <p>
        <Link to="/marketplace">Marketplace Interface</Link>
      </p>
      <p>
        <Link to="/kiosk">Kiosk</Link>
      </p>
    </div>
  );
}
