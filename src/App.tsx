import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { theme } from "./theme";
import Home from "./views/Home";
import Stake from "./views/Stake";
import Subscription from "./views/Subscription";
import Store from "./views/Store";
import PepemonProvider from "./contexts/PepemonProvider";
import ModalsProvider from "./contexts/Modals";
import { Page, TopBar } from "./components";
import { darktealTiles } from "./assets";

const App: React.FC = () => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [ethChainId, setEthChainId] = useState(
		parseInt((window as any).ethereum && (window as any).ethereum.chainId) || 1
	); // ETH default
	const [providerChainId, setProviderChainId] = useState(
		parseInt((window as any).ethereum && (window as any).ethereum.chainId) || 1
	);
	const handleDismissMobileMenu = useCallback(() => {
		setMobileMenu(false);
	}, [setMobileMenu]);
	const handlePresentMobileMenu = useCallback(() => {
		setMobileMenu(true);
	}, [setMobileMenu]);

	useEffect(() => {
	// @ts-ignore
		window.ethereum && window.ethereum.on("chainChanged", (chainId: string) => {
			setProviderChainId(parseInt(chainId));
			});
	}, []);

	return (
		<Providers ethChainId={ethChainId}>
			<TopBar
				staking={true}
				ethChainId={ethChainId}
				setEthChainId={setEthChainId}
			/>
			<Router>
				<Page>
					<Switch>
						<Route
							path="/"
							component={() => (
								<Home
								providerChainId={providerChainId}
								appChainId={ethChainId}
								setChainId={setEthChainId}
								/>
							)}
							exact
						/>
						<Route path="/staking" exact>
							<Stake
								providerChainId={providerChainId}
								appChainId={ethChainId}
								setChainId={setEthChainId}
							/>
						</Route>
						<Route path="/subscription" exact>
							<Subscription
								providerChainId={providerChainId}
								appChainId={ethChainId}
								setChainId={setEthChainId}
							/>
						</Route>
						<Route path="/store/:storeState?">
							<Store
								providerChainId={providerChainId}
								appChainId={ethChainId}
								setChainId={setEthChainId}
							/>
						</Route>
					</Switch>
				</Page>
			</Router>
		</Providers>
	);
};

export default App;

const Providers: React.FC<any> = ({ ethChainId, children }) => {
	const getConnectorRpcUrl = () => {
	switch (ethChainId) {
		case 1:
		return "https://mainnet.eth.aragon.network/"; // MAIN
		case 4:
		return "https://api.infura.io/v1/jsonrpc/rinkeby"; // RINKEBY
		case 56:
		return "https://bsc-dataseed.binance.org/"; // BSC
		case 137:
		return "https://rpc-mainnet.matic.network";
		//'https://rpc-mainnet.maticvigil.com/v1/7bb3aa1bee5774caa7c9eab73c97fa27ca388d95' // MATIC
	}
	};

	return (
		<ThemeProvider theme={theme}>
			<PepemonProvider>
			<ModalsProvider>{children}</ModalsProvider>
			</PepemonProvider>
			{/*</UseWalletProvider>*/}
		</ThemeProvider>
	);
};
