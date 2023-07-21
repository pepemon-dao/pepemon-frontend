import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {  mainnet,  bsc,goerli } from 'wagmi/chains';
import { Chain } from '@wagmi/chains'
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { infuraProvider } from 'wagmi/providers/infura'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { connectorsForWallets} from '@rainbow-me/rainbowkit';
import {
	walletConnectWallet,
	metaMaskWallet,
	trustWallet,
} from '@rainbow-me/rainbowkit/wallets';

const projectId = 'e3ef7e3d65785beff0a858d1cafdda23';



const pepeChain: Chain ={

	id:906090,
	name:'Pepechain',
	nativeCurrency: {
		decimals: 18,
		name: 'PEPETH',
		symbol: 'pepETH',
	  },

	  rpcUrls: {
		public: { http: ['https://l2-pepechain-testnet-8uk55qlld4.t.conduit.xyz'] },
		default: { http: ['https://l2-pepechain-testnet-8uk55qlld4.t.conduit.xyz'] },
	  },
	  blockExplorers: {
		default: { name: 'pepechain', url: 'https://explorerl2new-pepechain-testnet-8uk55qlld4.t.conduit.xyz' },
		etherscan: { name: 'pepechain', url: 'https://explorerl2new-pepechain-testnet-8uk55qlld4.t.conduit.xyz' },
	  },
	  testnet: false,
	  network:'pepechain'  


} 
const chain = [bsc, mainnet,goerli,pepeChain];

const { chains, publicClient } = configureChains(chain, [
	publicProvider(),
	infuraProvider({ apiKey: "7a9c4ff3188d481f9143904079638424" })
	]);

const connectors = connectorsForWallets([
	{
		groupName: 'Recommended',
		wallets: [
			metaMaskWallet({
				chains,
				projectId,
				shimDisconnect: true,
				UNSTABLE_shimOnConnectSelectAccount: true,
			}),
			walletConnectWallet({ projectId, chains }),
			trustWallet({ projectId, chains }),
		],

		
	},
]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		root.render(
			<>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider chains={chains}>
						<App />
					</RainbowKitProvider>
				</WagmiConfig>
			</>
		);
	}
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
