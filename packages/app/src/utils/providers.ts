import {ethers} from "ethers";
import {BaseProvider} from "@ethersproject/providers";

export const PepemonChain: BaseProvider = ethers.providers.getDefaultProvider(
    "https://l2-pepechain-testnet-8uk55qlld4.t.conduit.xyz",
    {
        name: "pepechain-testnet",
        chainId: 906090,
    }
);

export const Goerli: BaseProvider = new ethers.providers.AlchemyProvider(
    "goerli",
    ""
)

// export const Goerli: BaseProvider = ethers.providers.getDefaultProvider(
//     "goerli",
//     {
//         name: "goerli",
//         chainId: 5
//     }
// );
