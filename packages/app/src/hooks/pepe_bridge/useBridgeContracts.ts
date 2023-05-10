import {CrossChainMessenger} from "@eth-optimism/sdk";
import {PepemonChain, Goerli} from "../../utils/providers";
import {useContext, useEffect, useState} from "react";
import {getOptimismConfiguration} from "@conduitxyz/sdk";
import {PepemonProviderContext} from "../../contexts";
import {chainIds} from "../../constants/chains";

export enum Layer {
    Layer1 = "Layer1",
    Layer2 = "Layer2",
    Unknown = "Unknown"
}

export const useBridgeContracts = () => {
    const [pepemon] = useContext(PepemonProviderContext);

    const {provider, account} = pepemon;

    const [messenger, setMessenger] = useState<CrossChainMessenger>()
    const [activeLayer, setActiveLayer] = useState<Layer>(Layer.Unknown)

    useEffect(() => {
        const fetchChainMessenger = async () => {

            const config = await getOptimismConfiguration("conduit:pepechain-testnet-8uk55qlld4");

            if (provider.network.chainId === chainIds["goerli"]?.chainId) {
                console.log('l1')
                // @ts-ignore
                config.l1SignerOrProvider = provider.getSigner()
                // @ts-ignore
                config.l2SignerOrProvider = PepemonChain;
                setActiveLayer(Layer.Layer1)
            } else if (provider.network.chainId === chainIds["pepemon_testnet"]?.chainId) {
                console.log('l2')

                // @ts-ignore
                config.l1SignerOrProvider = Goerli;
                // @ts-ignore
                config.l2SignerOrProvider = provider.getSigner();
                setActiveLayer(Layer.Layer2)
            } else {
                console.log('invalid chain')
                setActiveLayer(Layer.Unknown)
                return
            }

            // @ts-ignore
            let newMessenger = new CrossChainMessenger(config)

            // @ts-ignore
            setMessenger(newMessenger)
        }

        if(provider && account) {
            fetchChainMessenger()
        }
    }, [provider, account])

    return {
        messenger: messenger,
        activeLayer: activeLayer
    }
}
