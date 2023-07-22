import { ethers, providers } from 'ethers';
import { useCallback, useContext, useState, useEffect } from 'react';
import { Web3Provider, ExternalProvider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { Contracts } from '../pepemon/lib/contracts';
import { PepemonProviderContext } from '../contexts';
import { useAccount, useDisconnect} from 'wagmi';
import { useEthersProvider } from './useEthersProvider';
import {
	useConnectModal,

} from '@rainbow-me/rainbowkit';

import usePepemon from './usePepemon';
import useSubscribeProvider from './useSubscribeProvider';
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

	const { openConnectModal} = useConnectModal();
	const { disconnect } = useDisconnect();
	const { account } = usePepemon();
	const provider: any = useEthersProvider();
	const {isSubscribed} = useSubscribeProvider()

	// console.log(connectModalOpen,account)

	// console.log(address);

	// if the address present in the account then sunscribe to the provider
	// if(address){
	// 	console.log('address present')
	// 	// subscribeProvider(ethereumProvider)
	// }

	
		
		// console.log(isSubscribed)

	// Open wallet selection modal.
	const loadWeb3Modal = useCallback(async () => {

		const setPepemon = async (newProvider: any, newChainId: any = null) => {
			if (!newProvider) {
				return;
			}

			const { chainId } = await newProvider.getNetwork();
			console.log(chainId);
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

		setEthereumProvider(null)
		setweb3Provider(null)
		
		try {



			if (typeof openConnectModal === 'function') {
				openConnectModal();
			}

			await subscribeProvider(await detectEthereumProvider());

			setEthereumProvider(await detectEthereumProvider());

			setweb3Provider(provider);

			setPepemon(provider).then(() => console.log('Contracts LOADED'));
		} catch (err: any) {
			console.log(err);
		}
	}, [dispatch,openConnectModal,provider]);

	const logoutOfWeb3Modal = useCallback(

		async function () {
			const resetApp = async () => {
				if (typeof disconnect === 'function') {
					disconnect();
				}

				setEthereumProvider(null);
				setweb3Provider(null);

				await dispatch({
					type: 'reset',
				});
			};

			await resetApp();
		},
		[dispatch, disconnect]
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
