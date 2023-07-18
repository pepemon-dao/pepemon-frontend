import {ethers} from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { useCallback, useContext, useState } from 'react';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import { Contracts } from '../pepemon/lib/contracts';
import { PepemonProviderContext } from '../contexts';

const projectId = 'e3ef7e3d65785beff0a858d1cafdda23' as const;

// // Enter a valid infura key here to avoid being rate limited
// // You can get a key for free at https://infura.io/register
// const INFURA_ID = '7a9c4ff3188d481f9143904079638424';

// const NETWORK_NAME = 'mainnet';

declare global {
	interface Window {
		ethereum?: ExternalProvider;
	}
}

function useWeb3Modals(config = {}) {
	const [web3Provider, setweb3Provider] = useState<any>();
	const [ethereumProvider, setEthereumProvider] = useState<any>();
	const [, dispatch] = useContext(PepemonProviderContext);

	// Open wallet selection modal.
	const loadWeb3Modal = useCallback(async () => {
		// return when account deteted

		const setPepemon = async (newProvider: any, newChainId: any = null) => {
			if (!newProvider) {
				return;
			}

			const { chainId } = await newProvider.getNetwork();
			const accounts = await newProvider.listAccounts();
			const contracts = new Contracts(
				newProvider,
				newChainId ? parseInt(newChainId, 16) : chainId
			);

			return await dispatch({
				type: 'all',
				contracts,
				chainId: newChainId ? parseInt(newChainId, 16) : chainId,
				// account: newProvider.provider.selectedAddress ? newProvider.provider.selectedAddress : newProvider.provider.accounts[0],
				account: accounts[0],
				provider: newProvider,
			});
		};

		const subscribeProvider = async (provider: any) => {
			if (!provider.on) {
				return;
			}
			provider.on('chainChanged', async (chainId: string) => {
				console.info('[PROVIDER] chain changed to ', chainId);

				const web3Provider = new Web3Provider(provider, 'any');
				setPepemon(web3Provider, chainId).then(() =>
					console.log('Contracts LOADED')
				);
			});

			provider.on('accountsChanged', async (account: string) => {
				console.info('[PROVIDER] account changed to ', account);

				const web3Provider = new Web3Provider(provider, 'any');
				setPepemon(web3Provider).then(() => console.log('Contracts LOADED'));
			});
		};

		try {
			const provider = await EthereumProvider.init({
				projectId: projectId, // REQUIRED your projectId
				chains: [1], // REQUIRED chain ids
				optionalChains: [5, 54],
				showQrModal: true, // REQUIRED set to "true" to use @walletconnect/modal
				methods: [
					'eth_requestAccounts',
					'eth_sendTransaction',
				], // OPTIONAL
				events: ['connect','accountsChanged', 'chainChanged', 'disconnect','session_event','display_uri'], // OPTIONAL
				qrModalOptions: {
					explorerRecommendedWalletIds: [
						'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
						'1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
						'4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
					],
				},
			});

			console.log(provider)

			await provider.connect()

			
			provider.on('connect', async () => {

				console.log("clicked")

				await subscribeProvider(provider);


			setEthereumProvider(provider);
			const web3Provider = new Web3Provider(provider, 'any');
			setweb3Provider(web3Provider);
			setPepemon(web3Provider).then(() => console.log('Contracts LOADED'));
			});

			
		} catch (err: any) {
			console.log(err);
		}
	}, [dispatch]);

	const logoutOfWeb3Modal = useCallback(
		async function () {
			try {
				if (typeof ethereumProvider === 'undefined') {
					console.log('ethereumProvider is not initialized');
				}

				if (
					typeof ethereumProvider?.disconnect === 'function' &&
					ethereumProvider?.connected
				) {
					await ethereumProvider?.disconnect();
				}

				ethereumProvider?.reset();

				setEthereumProvider(null);
				setweb3Provider(null);

				await dispatch({
					type: 'reset',
				});
			} catch (err) {
				console.log(err);
			}
		},
		[dispatch, ethereumProvider]
	);

	// If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
	// useEffect(() => {
	//     if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
	//         loadWeb3Modal();
	//         setAutoLoaded(true);
	//     }
	// }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

	return [web3Provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modals;
