import React, {useEffect, useState} from 'react'
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle, Loading, NotSupportedModal } from '../../components';
import StoreCard from './components/StoreCard';
import { useModal, useCardsMetadata, usePepemon, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../hooks';
import { getPepemonStoreContract, getPpdexAddress, getPpdexContract } from '../../pepemon/utils';

export const CARDS_PER_CHAIN = new Map([
	[1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 30, 38, 39, 40, 41, 42, 43, 47, 51, 52, 53, 54, 58, 62, 63, 64, 68]],
	[4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 30, 38, 39, 40, 41, 42, 43]],
	[56, [3, 4, 5, 6, 7, 8, 10, 11, 12]],
	[137, [1, 2]],
]);

const Store: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
	const pepemon = usePepemon();
	const [onPresentSupportModal] = useModal(<NotSupportedModal page="Store"/>, 'not-supported-modal')
	const isSupportedChain = (chainId: number) => {
		return (chainId === 1 || chainId === 4 || chainId === 137 || chainId === 56);
	}
	const isOnSupportedChain = () => {
		return isSupportedChain(providerChainId);
	}

	const [providerChainId, setProviderChainId] = useState((window.ethereum && parseInt(window.ethereum.chainId)) || 1);
	useEffect(() => {
		pepemon.provider && pepemon.provider.getNetwork().then((network: any) => {
			setProviderChainId(parseInt(network.chainId));
		})
	}, [pepemon.provider])

	useEffect(() => {
		const supported = isSupportedChain(chainId);
		if (!supported) {
			return onPresentSupportModal();
		}
	}, [chainId, onPresentSupportModal])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Store</StyledPageTitle>
				{isOnSupportedChain() && (chainId === providerChainId) &&
					<StoreFront providerChainId={providerChainId} appChainId={chainId}/>
				}
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}


export const StoreFront: React.FC<{providerChainId: number, appChainId: number}> = ({ providerChainId, appChainId }) => {
	const pepemon = usePepemon();
	const [activeCards, setActiveCards] = useState([]);
	const [transactions, setTransactions] = useState(0);
	const { onApprove, isApproving } = useApprove(getPepemonStoreContract(pepemon), getPpdexContract(pepemon));
	const allowance = useAllowance(getPepemonStoreContract(pepemon));
	const ppdexBalance = useTokenBalance(getPpdexAddress(pepemon));
	// @ts-ignore
	const cardsBalances = useCardsFactoryData(activeCards, transactions);
	const cardsPrice = useCardsStorePrices(activeCards);
	const cardsMetadata = useCardsMetadata(activeCards);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])

	useEffect(() => {
		setActiveCards([...CARDS_PER_CHAIN.get(providerChainId)]);
	}, [providerChainId, appChainId])

	return (
		<>
			{cardsBalances.length && (cardsBalances.length === cardsMetadata.length) ?
				<>
					<StoreCard
					  pepemon={pepemon}
					  ppdexBalance={ppdexBalance}
					  cardsMetadata={cardsMetadata}
					  cardsBalances={cardsBalances}
					  cardsPrice={cardsPrice}
					  allowance={allowance}
					  onApprove={onApprove}
					  isApproving={isApproving}
					  transactions={transactions}
					  setTransactions={setTransactions}
					  providerChainId={providerChainId}
					/>
				</>
			:
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<Loading text={'Loading cards...'} />
				</div>
			}
		</>
	)
}

export default Store
