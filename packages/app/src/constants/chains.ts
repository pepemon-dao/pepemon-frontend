interface AddEthereumChainParameter {
	// chainId: string; // A 0x-prefixed hexadecimal string
	// chainName: string;
	nativeCurrency: {
	name: string;
	symbol: string; // 2-6 characters long
	decimals: 18
	};
	rpcUrls: string[];
	blockExplorerUrls?: string[];
	iconUrls?: string[]; // Currently ignored.
}

const chains = {
	"1": {
		idHex: "0x1",
		name: "ETH",
		chainName: "Etherem Mainnet",
		nativeCurrency: {
	      name: "Ether",
	      symbol: "ETH",
	      decimals: 18
	  	},
		rpcUrls: ['https://main-light.eth.linkpool.io'],
		blockExplorerUrls: 'https://etherscan.io',
	},
	"4": {
		idHex: "0x4",
		name: "RINKEBY",
		chainName: "Rinkeby Testnet",
		nativeCurrency: {
	      name: "Ether",
	      symbol: "ETH",
	      decimals: 18
	  	},
		rpcUrls: ['https://rinkeby-light.eth.linkpool.io'],
		blockExplorerUrls: 'https://rinkeby.etherscan.io',
	},
	"56": {
		idHex: "0x38",
		name: "BSC",
		chainName: "BSC Mainnet",
		nativeCurrency: {
	      name: "Binance Coin",
	      symbol: "BNB",
	      decimals: 18
	  	},
		rpcUrls: ["https://bsc-dataseed1.defibit.io/"],
		blockExplorerUrls: ['https://bscscan.com'],
	},
	// "137": "MATIC",
};

export default chains;
