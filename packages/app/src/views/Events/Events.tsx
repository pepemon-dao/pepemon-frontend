import React, {useEffect, useState} from 'react'
import { Button, Page, NotSupportedModal } from '../../components';
import { useModal, usePepemon, useWeb3Modal } from '../../hooks';
import { default as EventsPage } from './components/EventsPage';

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

/* EVENTS
0 - Golden pepketchum *
1 - Pemeleon evo burn *
2 - Pemeleon evo item *
3 - Golden Pemeleon evo burn *
4 - Golden Pemeleon evo item *
5 - Warpertle evo burn *
6 - Warpertle evo item *
7 - Golden Warpertle evo burn *
8 - Golden Warpertle evo item *
9 - Pivysaur evo burn *
10 - Pivysaur evo item *
11 - Golden Pivysaur evo burn *
12 - Golden Pivysaur evo item *
*/

const EVENTS_PER_CHAIN: Map<number, IStakeEvent[]> = new Map([
    [1, [
        {
            id: 0,
            title: 'To become the very best!',
            description: '',
            cardsRequired: [9, 8, 19],
            cardsBurned: [19],
            rewardCard: 20,
            blockEnd: 11387694,
            stakeLength: 59585,
        },
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

const Events: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
    const { account } = usePepemon()
    const pepemon = usePepemon()
    const [, onPresentWalletProviderModal] = useWeb3Modal();

    const [onPresentSupportModal] = useModal(<NotSupportedModal setChainId={setChainId} chainId={chainId} page="Home"/>, 'not-supported-modal-home')
    const [providerChainId, setProviderChainId] = useState((window.ethereum && parseInt(window.ethereum.chainId)) || 1);

    const isSupportedChain = (chainId: number) => {
        return (chainId === 1 || chainId === 4);
    }
    // const isOnSupportedChain = () => {
    //     return isSupportedChain(providerChainId);
    // }

    useEffect(() => {
        const supported = isSupportedChain(chainId);
        if (!supported) {
            return onPresentSupportModal();
        }
    }, [chainId, onPresentSupportModal])

    useEffect(() => {
        pepemon.provider && pepemon.provider.getNetwork().then((network: any) => {
            setProviderChainId(parseInt(network.chainId));
        })
    }, [pepemon.provider])

    return (
        <Page>
            {(account && isSupportedChain(providerChainId) && (chainId === providerChainId)) ? (
               <EventsPage
                   events={EVENTS_PER_CHAIN.has(providerChainId) ? EVENTS_PER_CHAIN.get(providerChainId) : []}
                   allEventCards={allEventCards(providerChainId)}
               />
            ) : (
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        onClick={onPresentWalletProviderModal}
                        text="🔓 Connect Wallet"
                    />
                </div>
            )}
        </Page>
    )
}

export default Events
