interface Chain {
    chainId: number;
    chainIdHex: string;
    isTestNet: boolean;
}

interface ChainIds {
    [key: string]: Chain
}

export const chainIds: ChainIds = {
    "ethereum": {
        chainId: 1,
        chainIdHex: "0x1",
        isTestNet: false
    },
    "goerli": {
        chainId: 5,
        chainIdHex: "0x5",
        isTestNet: true
    },
    "pepemon_testnet": {
        chainId: 906090,
        chainIdHex: "0xDD36A",
        isTestNet: true
    }
}

// https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}


interface ChainsProps extends AddEthereumChainParameter {
    name: string,
    blockExplorerTitle: string
}

const chains: ChainsProps[] = [
    {
        chainId: "0x1",
        name: "ETH",
        chainName: "Etherem Mainnet",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: ['https://main-light.eth.linkpool.io'],
        blockExplorerUrls: ['https://etherscan.io'],
        blockExplorerTitle: 'Etherscan'
    },
    {
        chainId: "0x4",
        name: "RINKEBY",
        chainName: "Rinkeby Testnet",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: ['https://rinkeby-light.eth.linkpool.io'],
        blockExplorerUrls: ['https://rinkeby.etherscan.io'],
        blockExplorerTitle: 'Etherscan (Rinkeby)'
    },
    {
        chainId: "0x5",
        name: "GOERLI",
        chainName: "Goerli Testnet",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        },
        rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
        blockExplorerUrls: ['https://goerli.etherscan.io/'],
        blockExplorerTitle: 'Etherscan (Goerli)'
    },
    {
        chainId: "0x38", // = 56
        name: "BSC",
        chainName: "BSC Mainnet",
        nativeCurrency: {
            name: "Binance Coin",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ['https://bscscan.com'],
        blockExplorerTitle: 'BSCscan'
    },
    {
        chainId: "0xDD36A", // = 906090
        name: "Pepechain",
        chainName: "Pepemon Mainnet",
        nativeCurrency: {
            name: "Pepe Eth",
            symbol: "PPETH",
            decimals: 18
        },
        rpcUrls: ["https://l2-pepechain-testnet-8uk55qlld4.t.conduit.xyz"],
        blockExplorerUrls: ['https://explorerl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz'],
        blockExplorerTitle: 'Pepescan'
    }
    // {
    // 	chainId: "0x89", // = 137
    // 	name: "Matic",
    // 	chainName: "Matic Mainnet",
    // 	nativeCurrency: {
    //       name: "Matic",
    //       symbol: "MATIC",
    //       decimals: 18
    //   	},
    // 	rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
    // 	blockExplorerUrls: ['https://polygonscan.com/'],
    // 	blockExplorerTitle: 'Polygonscan'
    // }
];

export default chains;
