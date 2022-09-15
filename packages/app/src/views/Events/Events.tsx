import React, { useEffect, useState, useContext } from 'react'
import { DefaultPage, StyledPageTitle } from '../../components';
import { cards } from '../../constants';
import { theme } from '../../theme';
import EventInfo from './components/EventInfo';
import { AccordionV2, AccordionGroup , ContentColumns, ContentColumn, Title, Spacer, DropdownMenu } from '../../components';
import { pepechu1stanniversarycard, pepemander1stanniversarycard, pepertle1stanniversarycard, pepesaur1stanniversarycard } from '../../assets';
import styled from 'styled-components';
import { CardToClaim } from './CardToClaim';
import usePepemon from '../../hooks/usePepemon'
import { PepemonProviderContext } from '../../contexts';
import StakeEvent from './components/StakeEvent';
import useBlock from '../../hooks/useBlock';
import useIsApprovedForAll from '../../hooks/useIsApprovedForAll';
import useCardsFactoryData from '../../hooks/useCardsFactoryData';
import { log } from 'logrocket';
import console from 'console';
import { getCardInfo } from '../../utils/nftCards';
import { getBalanceOfBatch } from '../../utils/erc1155';


export const eventsMeta = {
	title:'Pepemon! Card staking',
	description: "Stake your awesome Pepemon cards to receive even more awesome exclusive Pepemon rewards",
}

export interface IStakeEvent {
    id: number;
    title: string;
    description: string;
    cardsRequired: number[];
    cardsBurned: number[];
    rewardCard: number;
    blockEnd: number;
    stakeLength: number;
}


const EVENTS_PER_CHAIN: Map<number, IStakeEvent[]> = new Map([
    [1, [
        // {
        //     id: 0,
        //     title: 'To become the very best!',
        //     description: '',
        //     cardsRequired: [9, 8, 19],
        //     cardsBurned: [19],
        //     rewardCard: 20,
        //     blockEnd: 11387694,
        //     stakeLength: 59585,
        // },
        {
            id: 1,
            title: 'Road to Pyro',
            description: '',
            cardsRequired: [1],
            cardsBurned: [1],
            rewardCard: 21,
            blockEnd: 11387694,
            stakeLength: 79345,
        },
        {
            id: 2,
            title: 'Road to Pyrokinesis',
            description: '',
            cardsRequired: [1, 17],
            cardsBurned: [17],
            rewardCard: 21,
            blockEnd: 11387694,
            stakeLength: 59585,
        },
        {
            id: 3,
            title: 'Road to Thermokinesis',
            description: '',
            cardsRequired: [5],
            cardsBurned: [5],
            rewardCard: 22,
            blockEnd: 11387694,
            stakeLength: 79345,
        },
        {
            id: 4,
            title: 'Road to Geo-thermokinesis',
            description: '',
            cardsRequired: [5, 18],
            cardsBurned: [18],
            rewardCard: 22,
            blockEnd: 11387694,
            stakeLength: 59585,
        },
        {
            id: 5,
            title: 'Mark of Water',
            description: '',
            cardsRequired: [2],
            cardsBurned: [2],
            rewardCard: 23,
            blockEnd: 11434461,
            stakeLength: 59585,
        },
        {
            id: 6,
            title: 'Seal of Water',
            description: '',
            cardsRequired: [2, 17],
            cardsBurned: [17],
            rewardCard: 23,
            blockEnd: 11434461,
            stakeLength: 59585,
        },
        {
            id: 7,
            title: 'Mark of Tidal',
            description: '',
            cardsRequired: [7],
            cardsBurned: [7],
            rewardCard: 24,
            blockEnd: 11434461,
            stakeLength: 59585,
        },
        {
            id: 8,
            title: 'Seal of Tidal',
            description: '',
            cardsRequired: [7, 18],
            cardsBurned: [18],
            rewardCard: 24,
            blockEnd: 11434461,
            stakeLength: 59585,
        },
        {
            id: 9,
            title: 'Path to Synthesis',
            description: '',
            cardsRequired: [3],
            cardsBurned: [3],
            rewardCard: 31,
            blockEnd: 11480655,
            stakeLength: 59585,
        },
        {
            id: 10,
            title: 'Path to Photosynthesis',
            description: '',
            cardsRequired: [3, 17],
            cardsBurned: [17],
            rewardCard: 31,
            blockEnd: 11480655,
            stakeLength: 59585,
        },
        {
            id: 11,
            title: 'Path to Basifixed',
            description: '',
            cardsRequired: [6],
            cardsBurned: [6],
            rewardCard: 32,
            blockEnd: 11480655,
            stakeLength: 59585,
        },
        {
            id: 12,
            title: 'Path to Diadelphous',
            description: '',
            cardsRequired: [6, 18],
            cardsBurned: [18],
            rewardCard: 32,
            blockEnd: 11480655,
            stakeLength: 59585,
        },
        {
            id: 13,
            title: 'Merry christmas Pepekarp!',
            description: '',
            cardsRequired: [33, 17],
            cardsBurned: [17],
            rewardCard: 37,
            blockEnd: 11536462,
            stakeLength: 59585,
        }, {
            id: 14,
            title: 'Fishing for more!',
            description: '',
            cardsRequired: [33],
            cardsBurned: [33],
            rewardCard: 37,
            blockEnd: 11536462,
            stakeLength: 59585,
        }, {
            id: 15,
            title: 'Seal of Unsafe Pyromancy',
            description: '',
            cardsRequired: [21],
            cardsBurned: [21],
            rewardCard: 45,
            blockEnd: 11741928,
            stakeLength: 59585,
        }, {
            id: 16,
            title: 'Seal of Pyromancy',
            description: '',
            cardsRequired: [21,17],
            cardsBurned: [17],
            rewardCard: 45,
            blockEnd: 11741928,
            stakeLength: 59585,
        }, {
            id: 17,
            title: 'Seal of Unsafe Pyrosolariss',
            description: '',
            cardsRequired: [22],
            cardsBurned: [22],
            rewardCard: 46,
            blockEnd: 11741928,
            stakeLength: 59585,
        }, {
            id: 18,
            title: 'Seal of Pyrosolariss',
            description: '',
            cardsRequired: [22, 18],
            cardsBurned: [18],
            rewardCard: 46,
            blockEnd: 11741928,
            stakeLength: 59585,
        }, {
            id: 19,
            title: 'Seal of Unsafe Hydromancy',
            description: '',
            cardsRequired: [23],
            cardsBurned: [23],
            rewardCard: 48,
            blockEnd: 11798988,
            stakeLength: 59585,
        }, {
            id: 20,
            title: 'Seal of Hydromancy',
            description: '',
            cardsRequired: [23, 17],
            cardsBurned: [17],
            rewardCard: 48,
            blockEnd: 11798988,
            stakeLength: 59585,
        }, {
            id: 21,
            title: 'Seal of Unsafe Hydroportation',
            description: '',
            cardsRequired: [24],
            cardsBurned: [24],
            rewardCard: 49,
            blockEnd: 11798988,
            stakeLength: 59585,
        }, {
            id: 22,
            title: 'Seal of Hydroportation',
            description: '',
            cardsRequired: [24, 18],
            cardsBurned: [18],
            rewardCard: 49,
            blockEnd: 11798988,
            stakeLength: 59585,
        }, {
            id: 23,
            title: 'Seal of Unsafe Geomancy',
            description: '',
            cardsRequired: [31],
            cardsBurned: [31],
            rewardCard: 55,
            blockEnd: 11985712,
            stakeLength: 59585,
        }, {
            id: 24,
            title: 'Seal of Geomancy',
            description: '',
            cardsRequired: [31, 17],
            cardsBurned: [17],
            rewardCard: 55,
            blockEnd: 11985712,
            stakeLength: 59585,
        }, {
            id: 25,
            title: 'Seal of Unsafe Geosolariss',
            description: '',
            cardsRequired: [32],
            cardsBurned: [32],
            rewardCard: 56,
            blockEnd: 11985712,
            stakeLength: 59585,
        }, {
            id: 26,
            title: 'Seal of Geosolariss',
            description: '',
            cardsRequired: [32, 18],
            cardsBurned: [18],
            rewardCard: 56,
            blockEnd: 11985712,
            stakeLength: 59585,
        }, {
            id: 27,
            title: 'Seal of Unsafe Magnetism',
            description: '',
            cardsRequired: [4],
            cardsBurned: [4],
            rewardCard: 59,
            blockEnd: 12199512,
            stakeLength: 59585,
        }, {
            id: 28,
            title: 'Seal of Magnetism',
            description: '',
            cardsRequired: [4, 17],
            cardsBurned: [17],
            rewardCard: 59,
            blockEnd: 12199512,
            stakeLength: 59585,
        }, {
            id: 29,
            title: 'Seal of Unsafe Quintessense Force',
            description: '',
            cardsRequired: [8],
            cardsBurned: [8],
            rewardCard: 60,
            blockEnd: 12199512,
            stakeLength: 59585,
        }, {
            id: 30,
            title: 'Seal of Quintessense Force',
            description: '',
            cardsRequired: [8, 18],
            cardsBurned: [18],
            rewardCard: 60,
            blockEnd: 12199512,
            stakeLength: 59585,
        }, {
            id: 31,
            title: "Pastry's burning desire",
            description: '',
            cardsRequired: [25, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 32,
            title: "Cerbery's burning desire",
            description: '',
            cardsRequired: [26, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 33,
            title: "Primariny's burning desire",
            description: '',
            cardsRequired: [27, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 34,
            title: "Unifairy's burning desire",
            description: '',
            cardsRequired: [28, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 35,
            title: "Witchenry's burning desire",
            description: '',
            cardsRequired: [29, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 36,
            title: "Cosmony's burning desire",
            description: '',
            cardsRequired: [30, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 37,
            title: "Moltry's burning desire",
            description: '',
            cardsRequired: [47, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        },{
            id: 38,
            title: "Phishy's burning desire",
            description: '',
            cardsRequired: [62, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 39,
            title: "Mermy's burning desire",
            description: '',
            cardsRequired: [63, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 40,
            title: "Metaphy's burning desire",
            description: '',
            cardsRequired: [64, 17],
            cardsBurned: [17],
            rewardCard: 67,
            blockEnd: 12595164,
            stakeLength: 59585,
        }, {
            id: 41,
            title: "Buy bitcoin or bust",
            description: '',
            cardsRequired: [69, 19],
            cardsBurned: [19],
            rewardCard: 71,
            blockEnd: 12912500,
            stakeLength: 59585,
        }, {
            id: 42,
            title: "Zhu Not Rong At All",
            description: '',
            cardsRequired: [70, 19],
            cardsBurned: [19],
            rewardCard: 73,
            blockEnd: 13077655,
            stakeLength: 59585,
        }]],
    // length -> 7 days // 50000 BLOCKS
    [4, [{
        id: 12,
        title: 'Seal of TEST',
        description: '',
        cardsRequired: [1, 2],
        cardsBurned: [1],
        rewardCard: 6,
        blockEnd: 8437300,
        stakeLength: 40,
    }, {
        id: 13,
        title: 'ANY test',
        description: '',
        cardsRequired: [1, 2, 3],
        cardsBurned: [1],
        rewardCard: 5,
        blockEnd: 8565582,
        stakeLength: 100,
    },]]
])

const allEventCards = (chainId: number) => EVENTS_PER_CHAIN.has(chainId) ?
    Array.from(new Set(EVENTS_PER_CHAIN.get(chainId).map(event => [...event.cardsRequired, event.rewardCard].filter(card => !(card === 0))).flat())) :
    [];


const Events: React.FC<any> = () => {
    const [transactions, setTransactions] = useState(0);
	const [pepemon] = useContext(PepemonProviderContext);
	const { account , chainId, contracts } = pepemon;
    const blockNumber = useBlock();
	const [providerChainId, setProviderChainId] = useState(window.ethereum && parseInt(window.ethereum.chainId) || 1);
    const [events, setEvents] = useState(EVENTS_PER_CHAIN.has(providerChainId) ? EVENTS_PER_CHAIN.get(providerChainId) : []);
    const cardsBalances = useCardsFactoryData(allEventCards(providerChainId), transactions)
    const isApprovedForAll = useIsApprovedForAll();
    const [options, setOptions] = useState(null);
    const [activeSeries, setActiveSeries] = useState<any>({title: 'Active Events'});
    const [activeEvents, setActiveEvents] = useState(true);
    const [cardsOwned, setCardsOwned] = useState<any>([]);

    const batchBalanceIds = Array.from(Array(100).keys());
    useEffect(() => {
		(async () => {
			if (!contracts.pepemonFactory) return;
			const batchBalance = await getBalanceOfBatch(contracts.pepemonFactory, account, batchBalanceIds);
			
			
			if (batchBalance) {
				const cardsOwned = batchBalance.map((el, index) => {
					if(parseInt(el) > 0) {
						return ({cardId: index, count: parseInt(el)});
					}
				}).filter(el => el);
				setCardsOwned(cardsOwned);
			}
		})()
	}, [contracts.pepemonFactory, chainId, account, batchBalanceIds])
	const isSupportedChain = (chainId: number) => {
        return (chainId === 1 || chainId === 4);
    }
    useEffect(() => {
        const supported = isSupportedChain(chainId);
        if (!supported) {
            return ;
        }
        
    }, [chainId])

    useEffect(() => {
        pepemon.provider && pepemon.provider.getNetwork().then((network: any) => {
            setProviderChainId(parseInt(network.chainId));
        })
    }, [pepemon.provider])
	return (
		<DefaultPage title='Evlove your pepemons'>
            <AccordionGroup>
           <EventInfo /> 
           <AccordionV2 title='My cards' isOpen={true}>
                {
                    cardsOwned && cardsOwned.length > 0 && cardsOwned.map((el: any) => {
                        
                        return (
                            <div style={{margin: "10px"}}>
                                 <div style={{whiteSpace: 'nowrap', marginBottom: '5px', fontStyle: 'bold' }}>{getCardInfo(el.cardId).title}</div>
                                 <div style={{position: 'relative'}}>
                                    <img loading='lazy' height='180' src={getCardInfo(el.cardId).img}/>
                                        <div style={{position: 'absolute', bottom: '8px', right: '3px', width: '22px', height: '30px', margin: '32px 20px 2px 98px',
                                        padding: '6px 8px',  opacity: '0.9',  borderRadius: '6px',  boxShadow: '1px 2px 3px 0 rgba(121, 121, 121, 0.5)' ,backgroundColor: 'black', color: 'white'}}>
                                        {parseFloat(el.count)} 
                                        </div>
                                 </div>
                                
                                {/* <p>{parseFloat(el.count)}</p> */}
                            </div>
                        )
                    })
                }
                {/* </div> */}
           </AccordionV2>
           <Spacer size='md' />
           <MidSection>
                <StyledPageTitle as='h2' size='s' >{activeSeries.title}</StyledPageTitle>
                <DropdownMenu title="0 Selected" options={[{title: 'Active Events', onClick: () => {setActiveSeries({title: 'Active Events'}); setActiveEvents(true)} },{title: 'Closed Events', onClick: () => {setActiveSeries({title: 'Closed Events'}); setActiveEvents(false) }} ]} activeOptions={activeSeries} setActiveSeries={setActiveSeries}/>
            </MidSection>

                        {
                            blockNumber > 0 && events
                                .filter(filterEvent => activeEvents ? filterEvent.blockEnd >= blockNumber : filterEvent.blockEnd < blockNumber)
                                .sort((sortEventA, sortEventB) => activeEvents ? sortEventA.id - sortEventB.id : sortEventB.id - sortEventA.id)
                                .map((event: any) => {
                                return (
                                    <StakeEvent
                                        pepemon={pepemon}
                                        key={event.id}
                                        event={event}
                                        cardsBalances={cardsBalances}
                                        isApproved={isApprovedForAll}
                                        eventTransactions={transactions}
                                        setEventTransactions={setTransactions}
                                        account={account}
                                        currentBlockNumber={blockNumber}
                                    />
                                    // <StakeEvent key={event.id} />
                                );
                                
                            })
                        }

           
           {/* <AccordionV2 title='Seal of Magnetism' isOpen={true} timeLeft='4 days left to enter'>
                <div></div>
           </AccordionV2> */}

           </AccordionGroup>
		</DefaultPage>
	)
}

export const CardContentColumn = styled(ContentColumn)`
	margin-bottom: 2em;
`
const MidSection = styled.div`
	display: flex;
    justify-content: space-between;
    align-items: start;

`;

export default Events;


