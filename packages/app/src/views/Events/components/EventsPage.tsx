import React, { useState } from 'react'
import styled from 'styled-components';
import { Button, Loader } from '../../../components';
import { default as EventsCard } from './EventsCard';
import { usePepemon, useCardsFactoryData, useIsApprovedForAll, useDetectMobileScreen, useBlock } from '../../../hooks';

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

const EventsPage: React.FC<any> = ({ events, allEventCards }) => {
    const [transactions, setTransactions] = useState(0);
    const { account } = usePepemon()
    const blockNumber = useBlock();
    const pepemon = usePepemon()
    const cardsBalances = useCardsFactoryData(allEventCards, transactions)
    const isApprovedForAll = useIsApprovedForAll();
    const isMobile = useDetectMobileScreen();
    // @ts-ignore
    const openSeaUri = (pepemon && pepemon.chainId === 1) ? `https://opensea.io/accounts/${account}` : `https://rinkeby.opensea.io/accounts/${account}`;

    return (
        <>
            {events !== null ?
                <>
                    <StyledStoreHeader>
                        {!isMobile &&
                        <StyledHeaderDetail>
                          <StyledSubHeader>ACTIVE EVENTS</StyledSubHeader>
                            <StyledSubHeaderText>{events.filter((filterEvent: any) => filterEvent.blockEnd >= blockNumber).length}</StyledSubHeaderText>
                        </StyledHeaderDetail>
                        }
                        <StyledHeaderDetails>
                            <StyledHeaderDetail>
                                <StyledSubHeader>UNIQUE CARDS OWNED</StyledSubHeader>
                                <StyledLink href={openSeaUri} target="_blank">
                                    <Button size="sm">VIEW ON OPENSEA</Button>
                                </StyledLink>
                            </StyledHeaderDetail>
                            {!isMobile &&
                            <StyledWalletAddress>
                                {account.substr(0, 6)}.....{account.slice(-6)}
                            </StyledWalletAddress>
                            }
                        </StyledHeaderDetails>
                    </StyledStoreHeader>
                    <EventsCard
                        pepemon={pepemon}
                        events={events}
                        cardsBalances={cardsBalances}
                        isApproved={isApprovedForAll}
                        setTransactions={setTransactions}
                        transactions={transactions}
                        account={account}
                        blockNumber={blockNumber}
                    />
                </>
                :
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Loader />
                </div>
            }
        </>
    )
}

const StyledStoreHeader = styled.div`
    background-color: ${(props) => props.theme.color[4]};
    height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledHeaderDetails = styled.div`
    display: flex;
    width: 940px;
    justify-content: flex-end;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        justify-content: center;
    }
`

const StyledLink = styled.a`
    text-decoration: none;
`

const StyledHeaderDetail = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    justify-content: center;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
        padding: 0 1rem;
    }
`

const StyledSubHeader = styled.div`
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    padding-bottom: .1rem;
    font-weight: 600;
`

const StyledSubHeaderText = styled.div`
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 1px;
    color: white;
`

const StyledWalletAddress = styled.div`
    display: flex;
    background-color: ${props => props.theme.color[3]};
    font-size: 26p;
    font-weight: bold;
    padding: .5rem 1rem;
    margin-left: 2rem;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`

export default EventsPage
