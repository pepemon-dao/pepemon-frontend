import React from 'react';
import { DefaultPage } from '../../components';
import { StoreCard } from './components';

export const storeMeta = {
	title: 'Pepemon! Store',
	description: 'Use PPDEX to mint Pepemon NFT cards. All the cards are created by upcoming artists all over the world. You can become the very best by dueling with your NFTs in a web3 card game!'
}

const Store: React.FC<any> = () => {
	return (
		<DefaultPage title='Store'>
			<StoreCard/>
		</DefaultPage>
	)
}

export default Store
