import React, { useEffect, useState, useContext } from 'react';
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle, Loading } from '../../components';
import { PepemonProviderContext } from '../../contexts';
import StoreCard from './components/StoreCard';
import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../hooks';

export const CARDS_PER_CHAIN = new Map([
	[1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 30, 38, 39, 40, 41, 42, 43, 47, 51, 52, 53, 54, 58, 62, 63, 64, 68]],
	[4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 30, 38, 39, 40, 41, 42, 43]],
	[56, [3, 4, 5, 6, 7, 8, 10, 11, 12]],
	[137, [1, 2]],
]);

const Store: React.FC<any> = () => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Store</StyledPageTitle>
					<StoreFront/>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export const StoreFront: React.FC<any> = () => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId, contracts: { pepemonStore, ppdex }, ppdexAddress } = pepemonContext[0];
	const [activeCards, setActiveCards] = useState([]);
	const [transactions, setTransactions] = useState(0);

	const { onApprove, isApproving } = useApprove(pepemonStore, ppdex);
	const allowance = useAllowance(pepemonStore);
	const ppdexBalance = useTokenBalance(ppdexAddress);
	// @ts-ignore
	const cardsBalances = useCardsFactoryData(activeCards, transactions);
	const cardsPrice = useCardsStorePrices(activeCards);
	const cardsMetadata = useCardsMetadata(activeCards);

	useEffect(() => {
		setActiveCards([...CARDS_PER_CHAIN.get(chainId)]);
	}, [chainId])

	return (
		<>
			{cardsBalances.length && (cardsBalances.length === cardsMetadata.length) ?
				<>
					<StoreCard
						ppdexBalance={ppdexBalance}
						cardsMetadata={cardsMetadata}
						cardsBalances={cardsBalances}
						cardsPrice={cardsPrice}
						allowance={allowance}
						onApprove={onApprove}
						isApproving={isApproving}
						transactions={transactions}
						setTransactions={setTransactions}
					/>
				</>
			:
				<div style={{ alignItems: 'center', display: 'flex', flex: 1, justifyContent: 'center' }}>
					<Loading text={'Loading cards...'} />
				</div>
			}
		</>
	)
}

export default Store
