import React, { useEffect, useState, useContext } from 'react';
import { Title, Spacer, DropdownMenu,
	// Button
} from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { cards } from '../../../constants';
import { theme } from '../../../theme';
import { CardSingle, StyledStoreCardsWrapper, StoreSelectionWrapper } from '../components';

const StoreCardsCollection : React.FC<any> = ({selectedCard, setSelectedCard}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;
	const [activeSeries, setActiveSeries] = useState(cards.get(chainId).find(series => {
		if (chainId === 56) {
			return series.title_formatted === 'CARTOONIZED_SERIES'
		}
		return series.title_formatted === 'EVENT_ITEM_CARDS'
	}));

	useEffect(() => {
		setSelectedCard(null);
	},[setSelectedCard, chainId])

	const options = cards.get(chainId).map((series, key) => {
		return {
			title: series.title,
			onClick: () => setActiveSeries(series)
		}
	});

	return (
		<div>
			<StoreSelectionWrapper>
				{/*<Button styling="link" style={{padding: 0}} onClick={selectAllSeries}>show series</Button>*/}
				<DropdownMenu title="0 Selected" options={options} activeOptions={activeSeries} setActiveSeries={setActiveSeries}/>
			</StoreSelectionWrapper>
			{/*{seriesToMap.map((activeSerie, key) => {
				return (
					<div key={key}>*/}
					{ activeSeries &&
						<div>
							<Title as="h3" size={1.3} font={theme.font.spaceMace}>{activeSeries.title}</Title>
							<Spacer size="sm"/>
							<StyledStoreCardsWrapper gridCols={selectedCard ? 3 : 5}>
								{activeSeries.cards.map(cardId => {
									return <CardSingle key={cardId} cardId={cardId} selectedCard={selectedCard} selectCard={setSelectedCard}/>
								})}
							</StyledStoreCardsWrapper>
							<Spacer size="md"/>
						</div>
					}
				{/*)
			})}*/}
		</div>
	)
}

export default StoreCardsCollection;
