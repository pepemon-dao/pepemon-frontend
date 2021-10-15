import React, {useState} from 'react';

import styled from 'styled-components';
import { Card } from '../../../components';
import {CardBalances} from '../../../hooks';
import StakeEvent from './StakeEvent';
import {IStakeEvent} from '../Events';



interface EventsCardProps {
    pepemon: any,
    events: IStakeEvent[],
    cardsBalances: CardBalances[];
    isApproved: boolean;
    setTransactions: any,
    transactions: number;
    account: any,
    blockNumber: number;
}

const EventsCard: React.FC<EventsCardProps> = ({
                                                 pepemon,
                                                 events,
                                                 cardsBalances,
                                                 isApproved,
                                                 setTransactions,
                                                 transactions,
                                                 account,
                                                 blockNumber,
                                             }) => {
    const [activeEvents, setActiveEvents] = useState(true);

    return (
        <StyledCardWrapper>
            <Card>
                <StyledCardHead>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <StyledTitle size="l">Card Staking Pools</StyledTitle>
                        <div style={{display: 'flex', padding: '.3rem', fontSize: '32px', fontWeight: 'bold'}}>
                            <StyledLink onClick={() => setActiveEvents(true)}>
                                <div style={{margin: '0 5rem', borderBottom: activeEvents ? `4px white solid` : ''}}>Active events</div>
                            </StyledLink>
                            <StyledLink onClick={() => setActiveEvents(false)}>
                                <div style={{margin: '0 5rem 0 0', borderBottom: !activeEvents ? `4px white solid` : ''}}>Closed events</div>
                            </StyledLink>
                        </div>
                    </div>
                    <div style={{fontSize: '20px', paddingTop: '1rem'}}>
                        Hey Pepetrainer! <br/>
                        <p style={{margin: '.5rem 0'}}>
                            On this page you can stake your awesome Pepemon cards to receive even more awesome exclusive Pepemon rewards.
                            If you are missing one, or maybe even multiple cards required for joining your desired event, you can always try buying them from a fellow Pepetrainer on OpenSea.
                        </p>
                        <p style={{margin: '.5rem 0 0 0'}}>
                            Sometimes an event requires you to burn certain cards in the process, these cards are marked with this cute emoji <img alt="placeholder" style={{padding: '0 .2rem 0 0', verticalAlign: 'top'}} src={'skullImg'} height="22"/>.<br/>
                            Until event completion you can always withdraw your cards without any penalty or card burned.
                        </p>
                    </div>
                </StyledCardHead>
                <StyledCardContent>
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
                                        isApproved={isApproved}
                                        eventTransactions={transactions}
                                        setEventTransactions={setTransactions}
                                        account={account}
                                        currentBlockNumber={blockNumber}
                                    />
                                );
                            })
                        }
                </StyledCardContent>
            </Card>
        </StyledCardWrapper>
    );
}

interface StyledTitleProps {
    size: 'm' | 'l';
}

const StyledLink = styled.a`
    cursor: pointer;
    color: ${props => props.theme.color[5]};

    &:hover {

    }
`

const StyledCardHead = styled.div`
    background-color: ${(props) => props.theme.color[3]};
    padding: 1.5rem 3rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const StyledCardWrapper = styled.div`
  max-width: 1130px;
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  padding: 0 3rem;

  @media (max-width: 880px) {
    min-width: unset;
    text-align: center;
  }
`

const StyledCardContent = styled.div`
    position: relative;
    padding: 1.5rem 3rem;
    background-color: #f1f1f1;
`

const StyledTitle = styled.h4<StyledTitleProps>`

  font-size: ${(props) => props.size === 'l' ? 38 : 30}px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 3px;
  @media (max-width: 880px) {
    text-align: center;
  }
`

export default EventsCard
