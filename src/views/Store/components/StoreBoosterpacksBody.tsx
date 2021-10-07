import React from "react";
import { StoreCards, StoreSelection, StyledStoreBody } from './index';
import { DropDownMenu } from '../../../components';

const StoreBoosterpacksBody: React.FC<any> = ({pokePacksArr, pokePacks, activeSeriesPack, setSelectedPack, selectedPack, options, storeState}) => {
	return (
		<StyledStoreBody>
			<StoreSelection>
				<DropDownMenu title="0 Selected" options={options} activeOptions={activeSeriesPack}/>
			</StoreSelection>
			{ pokePacksArr.map((series: string, key: number) => {
				const active = activeSeriesPack.includes(pokePacks[series as keyof typeof pokePacks].title);
				if (active || activeSeriesPack.length === 0) {
					return <StoreCards
								key={key}
								title={ pokePacks[series as keyof typeof pokePacks]?.title }
								pokeCards={ pokePacks[series as keyof typeof pokePacks]?.cards }
								gridCols={ Object.keys(selectedPack).length !== 0 ? 3 : 5 }
								selectedCard={selectedPack}
								selectCard={setSelectedPack}
							/>
				}
				return;
			})}
		</StyledStoreBody>
	)
}

export default StoreBoosterpacksBody;
