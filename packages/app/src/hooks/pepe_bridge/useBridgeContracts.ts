import {CrossChainMessenger} from "@eth-optimism/sdk";
import {Goerli, PepemonChain} from "../../utils/providers";
import {useContext, useEffect, useState} from "react";
import {getOptimismConfiguration} from "@conduitxyz/sdk";
import {PepemonProviderContext} from "../../contexts";
import {chainIds} from "../../constants/chains";


export const useBridgeContracts = () => {
    const [pepemon] = useContext(PepemonProviderContext);

    const {provider} = pepemon;

    const [messenger, setMessenger] = useState<CrossChainMessenger>()

    useEffect(() => {
        const fetchChainMessenger = async () => {
            const config = await getOptimismConfiguration("conduit:pepechain-testnet-8uk55qlld4");

            if (provider.chainId === chainIds["goerli"].chainId) {
                // @ts-ignore
                config.l1SignerOrProvider = provider.getSigner()
                // @ts-ignore
                config.l2SignerOrProvider = PepemonChain;
            } else {
                // @ts-ignore
                config.l1SignerOrProvider = PepemonChain
                // @ts-ignore
                config.l2SignerOrProvider = provider.getSigner();
            }

            // @ts-ignore
            let newMessenger = new CrossChainMessenger(config)

            // @ts-ignore
            setMessenger(newMessenger)
        }

        fetchChainMessenger()
    }, [Goerli, PepemonChain, provider])

    return messenger
}
