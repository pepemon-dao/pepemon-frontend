import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

const chains = [arbitrum, mainnet, polygon];
const projectId = 'e3ef7e3d65785beff0a858d1cafdda23';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<>
		
			<App />
		
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
