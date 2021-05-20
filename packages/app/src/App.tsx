import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ModalProvider from "./context/ModalProvider";
import { ThemeProvider } from "styled-components";
import { TransactionProvider } from "./context/TransactionProvider";
import { WalletProvider } from "./context/WalletProvider";
import withConnectedWallet from "./hocs/withConnectedWallet";
import Home from "./containers/Home/Home";
import TopBar from "./containers/TopBar/TopBar";
import theme from "./theme/theme";
import SideBar from "./containers/SideBar/SideBar";
import { Body } from "./components";

const HomeWithAuth = withConnectedWallet(Home);

function App() {
  return (
    <Providers>
      <Router>
        <Body>
          <SideBar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <TopBar />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <Switch>
                <Route path="/" exact component={HomeWithAuth} />
                <Route path="/otherRoute" component={Home} />
              </Switch>
            </div>
          </div>
        </Body>
      </Router>
    </Providers>
  );
}

const Providers: React.FC<any> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <TransactionProvider>
          <ModalProvider>{children}</ModalProvider>
        </TransactionProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};

export default App;
