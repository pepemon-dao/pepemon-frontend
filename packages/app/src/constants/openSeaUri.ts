import { useContext } from "react";
import { PepemonProviderContext } from "../contexts";

export const getOpenSeaUri = async () => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { account, chainId } = pepemonContext[0];

	const openSeaUri = (chainId === 1) ? `https://opensea.io/accounts/${account}` :
		chainId === 4 ? `https://rinkeby.opensea.io/accounts/${account}` :
			chainId === 56 ? `https://treasureland.market/#/nft-market/pepemon` : `https://matic.opensea.io/accounts/${account}`;
}
