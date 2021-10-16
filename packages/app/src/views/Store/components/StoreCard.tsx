import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import { Link, useParams, Redirect } from "react-router-dom";
import BigNumber from 'bignumber.js';
import { Spacer, Button, PepemonCard, DropdownMenu, StyledLinkTitle, Text, Title } from '../../../components';
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StoreCardsAside } from '../components';
import { CardPrice, CardMetadata, CardBalances, useOutsideClick, useRedeemCard } from '../../../hooks';
import { theme } from '../../../theme';
import {getPepemonStoreContract} from '../../../pepemon/utils';

interface StakeCardProps {
	pepemon: any,
	ppdexBalance: any;
	cardsMetadata: CardMetadata[],
	cardsBalances: CardBalances[],
	cardsPrice: CardPrice[],
	allowance: any,
	onApprove(): Promise<any>,
	isApproving: boolean,
	transactions: number;
	setTransactions: any;
	providerChainId: number;
}

// STORE CONSTANTS
// ETH SERIES
const ORIGIN_SERIES = {
	cards: [1, 2, 3, 4, 5, 6, 7, 8],
	title: 'Origin Series',
}
const CHARACTER_SERIES_CARDS = {
	cards: [9, 10, 11, 12],
	title: 'Character Series',
}
const FRIENDS_SERIES_CARDS = {
	cards: [13, 14, 15, 16],
	title: 'Buddy Series',
}
const EVENT_ITEM_CARDS = {
	cards: [17, 18, 19],
	title: 'Event Items'
}
const NEW_BEGINNING_CARDS = {
	cards: [25, 26, 27, 28, 29, 30, 47, 62, 63, 64],
	title: 'New Beginning Series'
}
const DUNGEONS_AND_DRAGONS = {
	cards: [38, 39, 40, 41, 42, 43],
	title: 'Dungeons & Dragons Series'
}
const NEW_BEGINNING_PIXEL_CARDS = {
	cards: [54, 53, 52, 51, 58, 68],
	title: 'New Beginning Pixel Series'
}

// MATIC SERIES
const MATIC_SERIES = {
	cards: [1, 2],
	title: 'Matic Test Series',
}

// BSC SERIES
const CARTOONIZED_SERIES = {
	cards: [3, 4, 5, 6, 7, 8, 10, 11, 12],
	title: 'Cartoonized Series',
}


// series per chainId
const ALL_SERIES = new Map([
	[1, [NEW_BEGINNING_PIXEL_CARDS, NEW_BEGINNING_CARDS, EVENT_ITEM_CARDS, DUNGEONS_AND_DRAGONS, FRIENDS_SERIES_CARDS, CHARACTER_SERIES_CARDS, ORIGIN_SERIES]],
	[4, [NEW_BEGINNING_CARDS, EVENT_ITEM_CARDS, DUNGEONS_AND_DRAGONS, FRIENDS_SERIES_CARDS, CHARACTER_SERIES_CARDS, ORIGIN_SERIES]],
	[56, [CARTOONIZED_SERIES]],
	[137, [MATIC_SERIES]],
]);

// options per chainId
const OPTION_PER_CHAIN = (setActiveSeries: any, setActiveCards?: any) => new Map([
	[1, [
		{title: 'SHOW ALL', onClick: () => setActiveSeries('All Series')},
		{title: 'EVENT ITEMS', onClick: () => setActiveSeries('Event Items')},
		{title: 'ORIGIN', onClick: () => setActiveSeries('Origin Series')},
		{title: 'CHARACTER', onClick: () => setActiveSeries('Character Series')},
		{title: 'BUDDY', onClick: () => setActiveSeries('Buddy Series')},
		{title: 'DUNGEONS & DRAGONS', onClick: () => setActiveSeries('Dungeons & Dragons Series')},
		{title: 'NEW BEGINNING', onClick: () => setActiveSeries('New Beginning Series')},
		{title: 'NEW BEGINNING PIXEL', onClick: () => setActiveSeries('New Beginning Pixel Series')},
	]],
	[4, [
		{title: 'SHOW ALL', onClick: () => setActiveSeries('All Series')},
		{title: 'EVENT ITEMS', onClick: () => setActiveSeries('Event Items')},
		{title: 'ORIGIN', onClick: () => setActiveSeries('Origin Series')},
		{title: 'CHARACTER', onClick: () => setActiveSeries('Character Series')},
		{title: 'BUDDY', onClick: () => setActiveSeries('Buddy Series')},
		{title: 'NEW BEGINNING', onClick: () => setActiveSeries('New Beginning Series')},
		{title: 'DUNGEONS & DRAGONS', onClick: () => setActiveSeries('Dungeons & Dragons Series')},
	]],
	[56, [
		{title: 'SHOW ALL', onClick: () => setActiveSeries('All Series')},
		{title: 'CARTOONIZED SERIES', onClick: () => setActiveSeries('Cartoonized Series')},
	]],
	[137, [
		{title: 'SHOW ALL', onClick: () => setActiveSeries('All Series')},
		{title: 'MATIC TEST', onClick: () => setActiveSeries('Matic Test Series')},
	]]
]);

const StoreCard: React.FC<StakeCardProps> = ({
												 pepemon,
												 ppdexBalance,
												 cardsMetadata,
												 cardsBalances,
												 cardsPrice,
												 allowance,
												 onApprove,
												 isApproving,
												 transactions,
												 setTransactions,
												 providerChainId,
}) => {
	const [delayApprove, setDelayApprove] = useState(false)
	const [imageModal, setImageModal] = useState(null);
	const [selectedCard, setSelectedCard] = useState(null);
	const [activeSeries, setActiveSeries] = useState('All Series');
	const { onRedeemCard } = useRedeemCard(getPepemonStoreContract(pepemon));

	const isAllowedSpending = () => {
		// No allowance needed for native BNB payments
		if (providerChainId === 56) {
			return true
		}
		return new BigNumber(100000000000000000000).comparedTo(allowance) === -1;
	}

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (imageModal !== null) {
			setImageModal(null);
		}
	})

	// const allCardsInOrder = ALL_SERIES.get(providerChainId).flatMap((series) => {
	//     return series.cards
	// })

	const routerParams: any = useParams();

	return (
		<div>
			{ !routerParams.storeState ?
				<Redirect to={`/store/cards`}/> // default route
			:
				<div style={{display: 'flex', position: 'relative'}}>
					<StyledStoreWrapper width={selectedCard ? "calc(66% - .5em)" : "100%"}>
						<StyledStoreHeader>
							<div style={{display: 'flex'}}>
								<StyledLinkTitle isInactive={routerParams.storeState !== "cards"}>
									<Link to={`/store/cards`}>Cards</Link>
								</StyledLinkTitle>
								<StyledLinkTitle isInactive={routerParams.storeState !== "boosterpacks"}>
									<Link to={`/store/boosterpacks`}>Boosterpacks</Link>
								</StyledLinkTitle>
							</div>
						</StyledStoreHeader>
							<StyledStoreBody>
								<StyledStoreContentWrapper>
									<DropdownMenu style={{position: 'absolute',
										right: '1.1em'}} title={'0 Selected'} options={OPTION_PER_CHAIN(setActiveSeries).get(providerChainId)}/>
									{(!isAllowedSpending() && !delayApprove) &&
										<StyledOverlay>
											<Text as="p" size={2} weight={900} font={theme.font.neometric}>Approve PPDEX spending in shop</Text>
											<Spacer size="md"/>
											<StyleOverlayButtonContainer>
												<Button size="md" styling="purple" disabled={isApproving} onClick={() => onApprove().then(() => setDelayApprove(true))}>{isApproving ? 'Approving...' : 'Approve now'}</Button>
												<Spacer size="lg"/>
												<Button size="md" styling="white" disabled={isApproving} onClick={() => setDelayApprove(true)}>Just look around</Button>
											</StyleOverlayButtonContainer>
										</StyledOverlay>
									}
									{ imageModal !== null &&
										<StyledOverlay>
											<img ref={ref} height="600" src={imageModal} alt="imageModal"/>
										</StyledOverlay>
									}
									{ ALL_SERIES.get(providerChainId).filter((series) => {
										if (activeSeries === 'All Series') {
											return true;
										}
										return series.title === activeSeries;
									}).map(filteredSeries => {
										return (
											<div key={filteredSeries.title}>
												<Title as="h3" size={1.3} font={theme.font.spaceMace}>{filteredSeries.title}</Title>
													<Spacer size="lg"/>
													<StyledStoreCardsWrapper gridCols={selectedCard ? 3 : 5}>
														{
															cardsMetadata
															.filter((metaData) => filteredSeries.cards.includes(metaData.tokenId))
															.map((cardMetadata, index) => {
																const active = selectedCard?.title === cardMetadata.name;
																const cardPrice = cardsPrice.find((price) => price.tokenId === cardMetadata.tokenId);
																const pepemonCardProps = {
																	key: cardMetadata.tokenId,
																	pepemon: pepemon,
																	active: active,
																	ppdexBalance: ppdexBalance,
																	tokenId: cardMetadata.tokenId,
																	metadata: cardMetadata,
																	balances: cardsBalances.find(balance => balance.tokenId === cardMetadata.tokenId),
																	price: (cardPrice && cardPrice.price) || new BigNumber(0),
																	allowance: allowance,
																	transactions: transactions,
																	setTransactions: setTransactions,
																	setDelayApprove: setDelayApprove,
																	setImageModal: setImageModal,
																	onRedeemCard: onRedeemCard,
																	providerChainId: providerChainId,
																}

																return (
																	<PepemonCard {...pepemonCardProps} setSelectedCard={setSelectedCard}/>
																);
															})
														}
													</StyledStoreCardsWrapper>
													<Spacer size="md"/>
												</div>
											)
										})}
								</StyledStoreContentWrapper>
							</StyledStoreBody>
						</StyledStoreWrapper>
						{ routerParams.storeState === "cards" && selectedCard &&
							<StoreCardsAside selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
						}
					</div>
				}
		</div>
	);
}

const StyledOverlay = styled.div`
	align-items: center;
	background-color: rgba(240, 233, 231, 0.9);
	border-radius: ${theme.borderRadius}px;
	display: flex;
	flex-direction: column;
	inset: 0;
	overflow: hidden;
	padding-top: 10em;
	position: absolute;
	width: 100%;
	z-index: 100;
`

const StyleOverlayButtonContainer = styled.div`
    display: flex;
`

const StyledStoreContentWrapper = styled.div`
  &{
	background-color: ${(props) => props.theme.color.white};
	display: flex;
	flex-direction: column;
	width: 100%;
  }
`

const StyledStoreCardsWrapper = styled.div<{gridCols: number}>`
	display: grid;
	grid-template-columns: repeat(${props => props.gridCols}, 1fr);
	grid-row-gap: 2rem;
	grid-column-gap: 1rem;
	overflow: visible;
`

export default StoreCard
