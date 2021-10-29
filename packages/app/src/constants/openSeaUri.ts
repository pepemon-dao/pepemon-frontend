type GetOpenSeaUriProps = {
	chainId: number,
	account?: string
};

export const getOpenSeaUri = (fn: GetOpenSeaUriProps) : string => {
	const { chainId, account } = fn;
	const openSeaUri = (chainId === 1) ? `https://opensea.io/accounts/${account}` :
		chainId === 4 ? `https://rinkeby.opensea.io/accounts/${account}` :
			chainId === 56 ? `https://treasureland.market/#/nft-market/pepemon` : `https://matic.opensea.io/accounts/${account}`;

	return openSeaUri;
}
