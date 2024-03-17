import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { Policies } from "./policies/Policies";
import { Home } from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Kiosk } from "./kiosk/Kiosk";
import { Marketplace } from "./Marketplace";
import { Menu } from "./Menu";
import { Launchpad } from "./launchpad/Launchpad";
import { Display } from "./display/Display";

function App() {
  const currentAccount = useCurrentAccount();

  return (
    <Router>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Kiosk Docs Companion Application</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Menu />
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {currentAccount ? (
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/kiosk" Component={Kiosk} />
              <Route path="/policies" Component={Policies} />
              <Route path="/marketplace" Component={Marketplace} />
              <Route path="/launchpad" Component={Launchpad} />
              <Route path="/display" Component={Display} />
            </Routes>
          ) : (
            <Heading>Please connect your wallet</Heading>
          )}
        </Container>
      </Container>
    </Router>
  );
}

export default App;
