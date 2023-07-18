
import {ethers} from "ethers";
import { BaseProvider,Web3Provider } from '@ethersproject/providers';

export const PepemonChain = ethers.providers.getDefaultProvider(
    "https://l2-pepechain-testnet-8uk55qlld4.t.conduit.xyz",
    {
        name: "pepechain-testnet",
        chainId: 906090,
    }
);

export const Goerli = ethers.providers.getDefaultProvider(
    "goerli",
    {
        name: "goerli",
        chainId: 5
    }
);


