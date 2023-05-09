import {CrossChainMessenger} from "@eth-optimism/sdk";
import { chainIds } from "../constants/chains";
import {Goerli, PepemonChain} from "./providers";

// let config = await conduitSDK.getOptimismConfiguration(slug);
//
// export const crossChainMessenger = new CrossChainMessenger({
//     l1ChainId: chainIds["goerli"].chainId,
//     l2ChainId: chainIds["goerli"].chainId,
//     // l2ChainId: chainIds["pepemon_testnet"].chainId,
//     l1SignerOrProvider: Goerli,
//     l2SignerOrProvider: Goerli,
//     // l2SignerOrProvider: PepemonChain,
//     bedrock: true,
//     contracts: {
//         l1: {
//             L1CrossDomainMessenger: "0x616756E1E44ACDe3C596c467f6544091195bca2A",
//             L1StandardBridge: "0x047b92065d6B890d3B096A16518C8dfbEd8e211A",
//             AddressManager: "0x3dA0B5876bEf37fcAdB0bF51b99dE06759AfE17e"
//         }
//     }
// })
