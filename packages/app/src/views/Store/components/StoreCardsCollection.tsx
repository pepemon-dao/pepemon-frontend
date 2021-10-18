import React, { useEffect, useState, useContext } from 'react';
import { Button, Title, Spacer, DropdownMenu } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { cards } from '../../../constants';
import { theme } from '../../../theme';
// import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../../hooks';
import { CardSingle, StyledStoreCardsWrapper, StoreSelectionWrapper } from '../components';

const StoreCardsCollection : React.FC<any> = ({selectedCard, setSelectedCard}) => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];
	const [activeSeries, setActiveSeries] = useState([]);
	const [seriesToMap, setSeriesToMap] = useState(cards.get(chainId));

	const pokeCards = cards.get(chainId);
	const pokeCardsArr = pokeCards;
	const options = pokeCardsArr.map((series, key) => {
		let newActiveSeries = activeSeries;
		return {
			title: series.title,
			onClick: async () => {
				let newActiveSeries = activeSeries;
				const index = newActiveSeries.findIndex(serie => serie.title === series.title);
				if (index >= 0) { newActiveSeries.splice(index,1); }
				else { newActiveSeries.push(series); }
				setActiveSeries(newActiveSeries);
				console.log(newActiveSeries.length > 0 ? newActiveSeries : cards.get(chainId));

				setSeriesToMap(newActiveSeries.length > 0 ? newActiveSeries : cards.get(chainId));
			}
		}
	});

	const selectAllSeries = () =>{
		setActiveSeries(cards.get(chainId));
	}

	return (
		<div>
			<StoreSelectionWrapper>
				<Button styling="link" style={{padding: 0}} onClick={selectAllSeries}>show series</Button>
				<DropdownMenu title="0 Selected" options={options} activeOptions={activeSeries}/>
			</StoreSelectionWrapper>
			{seriesToMap.map((activeSerie, key) => {
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
