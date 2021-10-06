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
import { TopBar, Navigation } from "./components";
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
			<StyledPageWrapper>
				<Router>
					<Navigation />
					<StyledPageWrapperMain>
						<StyledPageWrapperMainInner>
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
						</StyledPageWrapperMainInner>
					</StyledPageWrapperMain>
				</Router>
			</StyledPageWrapper>
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

const StyledPageWrapper = styled.div`
	display: flex;
`

const StyledPageWrapperMain = styled.main`
	background-attachment: fixed;
	background-image: url(${darktealTiles});
	background-repeat: no-repeat;
	background-size: cover;
	box-shadow: inset 0 0 0 2000px ${props => props.theme.color.buttonSecondaryDisabled};
	margin-left: ${120}px;
	padding-left: 2em;
	padding-right: 2em;
	min-height: 100vh;
	width: calc(100vw - ${120}px);
`

const StyledPageWrapperMainInner = styled.div`
	max-width: 940px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 10em;
`
