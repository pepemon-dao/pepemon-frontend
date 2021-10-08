import React from "react";
import { StoreCards, StoreSelection, StyledStoreBody } from './index';
import { DropDownMenu } from '../../../components';

const StoreCardsBody: React.FC<any> = ({pokeCardsArr, pokeCards, activeSeries, setSelectedCard, selectedCard, options, storeState}) => {
	return (
		<StyledStoreBody>
			<StoreSelection>
				<DropDownMenu title="0 Selected" options={options} activeOptions={activeSeries}/>
			</StoreSelection>
			{ pokeCardsArr.map((series: string, key: number) => {
				const active = activeSeries.includes(pokeCards[series as keyof typeof pokeCards].title);
				if (active || activeSeries.length === 0) {
					return <StoreCards
								key={key}
								title={ pokeCards[series as keyof typeof pokeCards]?.title }
								pokeCards={ pokeCards[series as keyof typeof pokeCards]?.cards }
								gridCols={ Object.keys(selectedCard).length !== 0 ? 3 : 5 }
								selectedCard={selectedCard}
								selectCard={setSelectedCard}
							/>
				}
				return;
			})}
		</StyledStoreBody>
	)
}

export default StoreCardsBody;
