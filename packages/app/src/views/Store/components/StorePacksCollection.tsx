import React, { useEffect, useState, useContext } from 'react';
import { Title, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { packs } from '../../../constants';
import { theme } from '../../../theme';
// import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../../hooks';
import { PackSingle, StyledStoreCardsInner } from '../components';

const StorePacksCollection : React.FC<any> = ({selectedPack, setSelectedPack}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;
	
	const [activeSeries, setActiveSeries] = useState<any>([]);

	useEffect(() => {
		setActiveSeries(packs?.get(chainId));
		// TODO: Handle url to switch actice cards to boosterpacks
	},[chainId])

	return (
		<>{activeSeries.map((activeSerie:any, key:any) => {
			return (
				<div key={key}>
					<Title as="h3" size='m' font={theme.font.spaceMace}>{activeSerie.title}</Title>
					<Spacer size="md"/>
					<StyledStoreCardsInner gridCols={selectedPack ? 3 : 5}>
						{activeSerie.packs.map((pack:any, key:any) => {
							return <PackSingle key={key}
										packId={`${activeSerie.title_formatted}_${key}`}
										selectedPack={selectedPack}
										selectPack={setSelectedPack}
										chainId={chainId}
										packMeta={pack}/>
						})}
					</StyledStoreCardsInner>
					<Spacer size="md"/>
				</div>
			)
		})}</>
	)
}

export default StorePacksCollection;
