import React, { useState, Suspense, lazy } from 'react';
import { Link, useParams, Redirect } from "react-router-dom";
import { StoreCardsBody, StoreBoosterpacksBody, StyledStoreWrapper, StyledStoreHeader } from './components';
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledTitle, StyledPageTitle, Loading } from '../../components';
import { theme } from '../../theme';
import { pokeCards, pokePacks } from '../../constants';
const StoreCardsAside = lazy(() => import('./components').then((module) => ({
	default: module.StoreCardsAside,
  })));
const StoreBoosterpacksAside = lazy(() => import('./components').then((module) => ({
	default: module.StoreBoosterpacksAside,
  })));

const Store: React.FC<any> = () => {
	const [activeSeries, setActiveSeries] = useState("");
	const [activeSeriesPack, setActiveSeriesPack] = useState("");
	const [selectedCard, setSelectedCard] = useState<any>({});
	const [selectedPack, setSelectedPack] = useState<any>({});
	const pokeCardsArr = Object.keys(pokeCards);
	const pokePacksArr = Object.keys(pokePacks);

	const options = pokeCardsArr.map((series, key) => {
		const seriesTitle = pokeCards[series as keyof typeof pokeCards].title;
		return {
			title: seriesTitle,
			onClick: async () => {
				if (activeSeries?.includes(seriesTitle)) {
					setActiveSeries(activeSeries.replace('|' + seriesTitle, ''));
				} else {
					setActiveSeries(activeSeries + '|' + seriesTitle);
				}
			}
		}
	});

	const optionsPack = pokePacksArr.map((series, key) => {
		const seriesTitle = pokePacks[series as keyof typeof pokePacks].title;
		return {
			title: seriesTitle,
			onClick: async () => {
				if (activeSeriesPack?.includes(seriesTitle)) {
					setActiveSeriesPack(activeSeriesPack.replace('|' + seriesTitle, ''));
				} else {
					setActiveSeriesPack(activeSeriesPack + '|' + seriesTitle);
				}
			}
		}
	});

	const account = false;

	const routerParams: any = useParams();

	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				{ !routerParams.storeState ?
					<Redirect to={`/store/cards`}/> // default route
					:
					<>
						<StyledPageTitle as="h1">Staking</StyledPageTitle>
							{account ? (
								<>
									{/*isOnSupportedChain() && (chainId === providerChainId) &&
										<StoreFront providerChainId={providerChainId} appChainId={chainId}/>*/}
								</>
							) : (
								<div>
									<div style={{display: 'flex'}}>
										<StyledStoreWrapper width="100%">
											<StyledStoreHeader>
												<div style={{display: 'flex'}}>
													<StyledTitle as="h2" weight={routerParams.storeState === "cards" ? 900 : 400} color={theme.color.white} size="1.2rem" font={theme.font.neometric}>
														<Link to={`/store/cards`}>Cards</Link>
													</StyledTitle>
													<StyledTitle as="h2" weight={routerParams.storeState === "boosterpacks" ? 900 : 400} color={theme.color.white} size="1.2rem" font={theme.font.neometric}>
														<Link to={`/store/boosterpacks`}>Boosterpacks</Link>
													</StyledTitle>
												</div>
											</StyledStoreHeader>
											{ routerParams.storeState === "cards" ?
												<StoreCardsBody
													options={options}
													storeState={routerParams.storeState}
													pokeCards={pokeCards}
													pokeCardsArr={pokeCardsArr}
													activeSeries={activeSeries}
													setSelectedCard={setSelectedCard}
													selectedCard={selectedCard}/>
												:
												<>
													{console.log(pokePacks)
													}
												<StoreBoosterpacksBody
													options={optionsPack}
													storeState={routerParams.storeState}
													pokePacks={pokePacks}
													pokePacksArr={pokePacksArr}
													activeSeriesPack={activeSeriesPack}
													setSelectedPack={setSelectedPack}
													selectedPack={selectedPack}/>
												</>
											}
										</StyledStoreWrapper>
										{ routerParams.storeState === "cards" && Object.keys(selectedCard).length !== 0 ?
											<Suspense fallback={<Loading/>}>
												<StoreCardsAside selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
											</Suspense>
											: routerParams.storeState === "boosterpacks" && Object.keys(selectedPack).length !== 0 &&
											<Suspense fallback={<Loading/>}>
												<StoreBoosterpacksAside selectedPack={selectedPack} setSelectedPack={setSelectedPack}/>
											</Suspense>
										}
									</div>
								</div>
							)}
					</>
				}
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default Store;
