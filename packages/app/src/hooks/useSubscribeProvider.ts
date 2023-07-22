import React from 'react';
import { ethers, providers } from 'ethers';
import { useCallback, useContext, useState, useEffect } from 'react';
import { useAccount
 } from 'wagmi';
import { Web3Provider} from '@ethersproject/providers';
import { Contracts } from '../pepemon/lib/contracts';
import { PepemonProviderContext } from '../contexts';
import detectEthereumProvider from '@metamask/detect-provider';
import { useEthersProvider } from './useEthersProvider';

function useSubscribeProvider(){

    const [web3Provider, setweb3Provider] = useState<any>();
	const [ethereumProvider, setEthereumProvider] = useState<any>();
	const [, dispatch] = useContext(PepemonProviderContext);

    const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false);
    const provider: any = useEthersProvider();
    const {address} = useAccount();

    const setPepemon = useCallback(async (newProvider: any, newChainId: any = null) => {
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
    },[dispatch]);

    const subscribeProvider = useCallback(async (provider: any) => {
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
    },[setPepemon]);

   // look for the address and if available subscribe and set the provider

    useEffect(() => {
        if (address) {
           
           
          (async function(){
            
            await subscribeProvider(await detectEthereumProvider());

			setEthereumProvider(await detectEthereumProvider());

			setweb3Provider(provider);

			setPepemon(provider).then(() => console.log('Contracts LOADED'))

            setIsSubscribed(true);
        })()

       
        }

        if(!address){

         ( function () {
               setIsSubscribed(false);
               setEthereumProvider(null);   
                setweb3Provider(null);
            })()
        }

        // unsubscribe on unmount
        return () => {
            setIsSubscribed(false);
            setEthereumProvider(null);   
            setweb3Provider(null);
        }
    }
    , [address, ethereumProvider,subscribeProvider,provider,setPepemon,web3Provider]);
    
    return {isSubscribed}
}

export default useSubscribeProvider;