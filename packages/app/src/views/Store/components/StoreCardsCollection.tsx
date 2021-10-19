import React, { useEffect, useState, useContext } from 'react';
import { Title, Spacer,
	// Button, DropdownMenu
} from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { cards } from '../../../constants';
import { theme } from '../../../theme';
// import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../../hooks';
import { CardSingle, StyledStoreCardsWrapper, StoreSelectionWrapper } from '../components';

const StoreCardsCollection : React.FC<any> = ({selectedCard, setSelectedCard}) => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];
	const [activeSeries,
		// setActiveSeries
	] = useState([]);

	useEffect(() => {
		setSelectedCard(null);
	},[setSelectedCard, chainId])

	// const pokeCards = cards.get(chainId);
	// const pokeCardsArr = pokeCards;

	// const options = pokeCardsArr.map((series, key) => {
	// 	let newActiveSeries = activeSeries;
	// 	return {
	// 		title: series.title,
	// 		onClick: () => {
	// 			const index = newActiveSeries.findIndex(serie => serie.title === series.title);
	// 			if (index >= 0) { // if exists => delete
	// 				newActiveSeries.splice(index,1);
	// 				setActiveSeries(newActiveSeries);
	// 			}
	// 			else {
	// 				newActiveSeries.push(series);
	// 				setActiveSeries(newActiveSeries);
	// 			} // else add
	// 		}
	// 	}
	// });

	// const selectAllSeries = () =>{
	// 	setActiveSeries(cards.get(chainId));
	// }

	const seriesToMap = () => activeSeries.length === 0 ? cards.get(chainId) : activeSeries

	return (
		<div>
			<StoreSelectionWrapper>
				{/*<Button styling="link" style={{padding: 0}} onClick={selectAllSeries}>show series</Button>
				<DropdownMenu title="0 Selected" options={options} activeOptions={activeSeries} setActiveSeries={setActiveSeries}/>*/}
			</StoreSelectionWrapper>
			{seriesToMap().map((activeSerie, key) => {
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
			})}
		</div>
	)
}

export default StoreCardsCollection;
