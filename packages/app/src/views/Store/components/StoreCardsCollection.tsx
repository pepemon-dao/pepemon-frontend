import React, { useEffect, useState, useContext } from 'react';
import { Title, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { cards } from '../../../constants';
import { theme } from '../../../theme';
// import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../../hooks';
import { CardSingle, StyledStoreCardsWrapper } from '../components';

const StoreCardsCollection : React.FC<any> = ({selectedCard, setSelectedCard}) => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];
	const [activeSeries, setActiveSeries] = useState([]);

	useEffect(() => {
		setActiveSeries(cards.get(chainId));
		// TODO: Handle url to switch actice cards to boosterpacks
	},[chainId])

	return (
		<>{activeSeries.map((activeSerie, key) => {
			return (
				<div key={key}>
					<Title as="h3" size={1.3} font={theme.font.spaceMace}>{activeSerie.title}</Title>
					<Spacer size="sm"/>
					<StyledStoreCardsWrapper gridCols={selectedCard ? 3 : 5}>
						{activeSerie.cards.map(cardId => {
							return <CardSingle key={cardId} cardId={cardId} selectedCard={selectedCard} selectCard={setSelectedCard}/>
						})}
					</StyledStoreCardsWrapper>
					<Spacer size="md"/>
				</div>
			)
		})}</>
	)
}

export default StoreCardsCollection;
