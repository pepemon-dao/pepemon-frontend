import React, { Suspense, useEffect, useState, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Page, TopBar } from './components'
import { ModalsProvider, PepemonProvider } from './contexts';
import { withConnectedWallet } from './hocs'
import { theme } from './theme'
import { LoadingPage } from './views';
const Home = lazy(() =>  import("./views/Home").then((module) => ({ default: module.default })));
const Staking = lazy(() =>  import("./views/Staking").then((module) => ({ default: module.default })));
const Subscription = lazy(() =>  import("./views/Subscription").then((module) => ({ default: module.default })));
const Store = lazy(() =>  import("./views/Store").then((module) => ({ default: module.default })));

const StakingWithAuth = withConnectedWallet(Staking);
const SubscriptionWithAuth = withConnectedWallet(Subscription);
const StoreWithAuth = withConnectedWallet(Store);

const App: React.FC = () => {
	const defaultChain = process.env.NODE_ENV !== 'production' ? 4 : 1;
	const [ethChainId, setEthChainId] = useState(parseInt((window as any).ethereum && (window as any).ethereum.chainId) || defaultChain) // ETH default
	const [providerChainId, setProviderChainId] = useState(parseInt((window as any).ethereum && (window as any).ethereum.chainId) || defaultChain)

	useEffect(() => {
		// Not working for some mobile implementation, alternative to check for pr
		// @ts-ignore
		window.ethereum && window.ethereum.on('chainChanged', (chainId: string) => {
			setProviderChainId(parseInt(chainId));
		})
	}, []);

	const pepemonState = {
		appChainId: ethChainId,
		providerChainId: providerChainId,
		setChainId: setEthChainId,
	}

  return (
	<Providers ethChainId={ethChainId}>
		<Router>
			<TopBar {...pepemonState}/>
			<Page>
				<Suspense fallback={<LoadingPage/>}>
					<Switch>
						<Route path="/" exact>
							<Home {...pepemonState}/>
						</Route>
						<Route path="/test" exact>
							<LoadingPage/>
						</Route>
						<Route path="/staking">
							<StakingWithAuth {...pepemonState}/>
						</Route>
						<Route path="/subscription">
							<SubscriptionWithAuth {...pepemonState}/>
						</Route>
						<Route path="/store/:storeState?">
							<StoreWithAuth {...pepemonState}/>
						</Route>
					</Switch>
				</Suspense>
			</Page>
		</Router>
	</Providers>
  )
}

const Providers: React.FC<any> = ({ ethChainId, children }) => {
  // const getConnectorRpcUrl = () => {
  //   switch (ethChainId) {
  //     case 1: return 'https://mainnet.eth.aragon.network/' // MAIN
  //     case 4: return 'https://api.infura.io/v1/jsonrpc/rinkeby' // RINKEBY
  //     case 56: return 'https://bsc-dataseed.binance.org/' // BSC
  //     case 137: return 'https://rpc-mainnet.matic.network'
  //       //'https://rpc-mainnet.maticvigil.com/v1/7bb3aa1bee5774caa7c9eab73c97fa27ca388d95' // MATIC
  //   }
  // }

	return (
		<ThemeProvider theme={theme}>
			<ModalsProvider>
				<PepemonProvider>
					{children}
				</PepemonProvider>
			</ModalsProvider>
		</ThemeProvider>
	)
}

export default App
