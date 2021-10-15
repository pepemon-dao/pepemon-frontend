import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import Spacer from '../../../components/Spacer';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import { CardBalances, useUserEventProgress, useSetApprovalForAll, useJoinEvent, useClaimEvent, useWithdrawEvent, useUserEventStatus, useDetectMobileScreen } from '../../../hooks';
import {getCardInfo} from '../../../utils/nftCards';
import {getPepemonFactoryAddress} from '../../../pepemon/utils';
import {IStakeEvent} from '../../Events/Events';

interface EventsCardProps {
    pepemon: any;
    event: IStakeEvent;
    cardsBalances: CardBalances[];
    isApproved: boolean;
    eventTransactions: number;
    setEventTransactions: any;
    account: any;
    currentBlockNumber: number;
}

interface EventModalProps {
    title: string,
    description: React.ReactNode,
    buttons: React.ReactNode[],
}

const EventModal: React.FC<EventModalProps> = ({
    title, description, buttons,
}) => {
    return (
        <StyledEventModal>
            <StyledModalTitle>{title}</StyledModalTitle>
            <StyledSubTitle>{description}</StyledSubTitle>
            <div style={{marginTop: 'auto', display: 'flex', width: '100%'}}>
            {buttons.map((button, index) => {
                return (
                    <div key={`${title}-button-${index}`} style={{margin: '0 1rem', width: '50%'}}>{button}</div>
                );
            })}
            </div>
        </StyledEventModal>
    )
}

const StyledEventModal = styled.div`
    position: absolute;
    width: 89%;
    height: 15rem;

    z-index: 2;
    border-radius: 8px;
    opacity: 0.97;
    padding: 1.5rem 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;


`

const StakeEvent: React.FC<EventsCardProps> = ({
                                                   pepemon,
                                                   event,
                                                   cardsBalances,
                                                   isApproved,
                                                   setEventTransactions,
                                                   eventTransactions,
                                                   account,
                                                   currentBlockNumber,
                                               }) => {
    const [transactions, setTransactions] = useState(0);
    const [showModal, setShowModal] = useState({join: false, cancel: false});
    const isMobile = useDetectMobileScreen();
    const userProgress = useUserEventProgress(event.id, transactions);
    const userEventStatus = useUserEventStatus(event.id, transactions);

    const { onSetApprovalForAll, isApproving } = useSetApprovalForAll();
    const { onJoinEvent, isJoining } = useJoinEvent(event.id);
    const { onClaimEvent, isClaiming } = useClaimEvent(event.id);
    const { onWithdrawEvent, isWithdrawing } = useWithdrawEvent(event.id);

    const openSeaUri = (pepemon && pepemon.chainId === 1) ? `https://opensea.io/assets/` : `https://rinkeby.opensea.io/assets/`;

    const updateTransactions = () => {
        setTransactions(transactions + 1);
        setEventTransactions(eventTransactions + 1);
    }
    const blocksToSeconds = (blocks: number) => {
        if (blocks < 0) {
            return 0;
        }
        return blocks * 13.1;
    }
    const secondsToDays = (seconds: number) => {
        const day = 60 * 60 * 24;
        return Math.floor(seconds / day) < 0 ? 0 : Math.floor(seconds / day);
    }
    const secondsToHoursMinusDays = (seconds: number, days: number) => {
        const day = 60 * 60 * 24;
        const hour = 60 * 60;
        return Math.floor((seconds - (day * days)) / hour);
    }
    const secondsToMinutesMinusDaysMinusHours = (seconds: number, days: number, hours: number) => {
        const day = 60 * 60 * 24;
        const hour = 60 * 60;
        const minute = 60;
        return Math.ceil((seconds - (day * days) - (hour * hours)) / minute);
    }
    const timeLeft = (seconds: number) => {
        const days = secondsToDays(seconds);
        const hours = secondsToHoursMinusDays(seconds, days);
        const minutes = secondsToMinutesMinusDaysMinusHours(seconds, days, hours);
        return {
            days,
            hours,
            minutes,
        }
    }
    const formatTime = (days: number, hours: number, minutes: number) => {
        if (days >= 1) {
            return `${days} ${days === 1 ? 'day' : 'days'}`
        }
        if (hours >= 1) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
        }
        if (minutes === 0) {
            return `no time`;
        }
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
    }

    const isEligable = () => {
        let isMissingCard = false;
        event.cardsRequired.map((cardId) => {
            const card = cardsBalances.find(card => card.tokenId === cardId);
			// TODO: Check what is going on here
            if (!card || !(parseInt(card.userBalance) > 0)) {
                return isMissingCard;
            }
			return isMissingCard;
        })
        return !isMissingCard;
    }

    const isCompleted = () => {
        return userEventStatus && userEventStatus.isCompleted;
    }
    const isStarted = () => {
        return userEventStatus && (parseInt(userEventStatus.blockEnd.toString()) > 0);
    }
    const isClaimable = () => {
        return userProgress === '100000';
    }
    const isClosed = () => {
        return formatTime(
            timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).days,
            timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).hours,
            timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).minutes,
        ) === 'no time'
    }
    const isComingSoon = () => {
        return event.blockEnd === 0;
    }

    const cardsReturned = () => {
        return [...event.cardsRequired.filter(cardId => !event.cardsBurned.includes(cardId)), event.rewardCard]
    }

    const isItemCard = (cardId: number) => {
        return [17, 18, 19].includes(cardId);
    }

    return (
        <StyledEventWrapper>
                <StyledTitle>{event.title}</StyledTitle>
            {account &&
                <StyledSubTitle>
                  <div>You have&nbsp;</div>
                  <div style={{fontWeight: 'bold'}}>
                      {(isClosed() || isComingSoon()) ? (!isComingSoon() ? 'missed it!' : 'to wait a little bit longer') : formatTime(
                          timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).days,
                          timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).hours,
                          timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).minutes,
                      )}
                      {!isClosed() && ' left to enter'}
                  </div>
                </StyledSubTitle>
            }
            {(cardsBalances.length || event.blockEnd === 0) ?
                <StyledContent isMobile={isMobile}>
                    {(showModal && showModal.join) &&
                    <EventModal
                      title={'Confirm joining event'}
                      description={
                          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                              <div>When you complete this event you will <span style={{fontWeight: 'bold'}}>receive</span> the following cards:<br/>
                                  {cardsReturned().map((cardId) => { return (<div style={{textAlign: 'center', fontWeight: 'bold'}}> {getCardInfo(cardId).title}<br/></div>)})}
                              </div>
                              <Spacer/>
                              <div>When you withdraw the prize the following cards are <span style={{fontWeight: 'bold'}}>burned</span><br/>
                                  {event.cardsBurned.length ?
                                      event.cardsBurned.map((cardId) => { return (<div style={{textAlign: 'center', fontWeight: 'bold'}}> {getCardInfo(cardId).title}<br/></div>)}) :
                                      <div style={{textAlign: 'center', fontWeight: 'bold'}}>none</div>
                                  }
                              </div>
                          </div>
                      }
                      buttons={[
                          <Button size="sm" variant="quaternary"
                                  onClick={() => setShowModal({...showModal, join: false})}
                          >
                              {'Cancel'}
                          </Button>,
                          <Button size="sm" variant="secondary"
                                  disabled={!isEligable() || isJoining || isClosed()}
                                  onClick={() => onJoinEvent().then(() => {
                                      updateTransactions();
                                      setShowModal({...showModal, join: false});
                                  })}
                          >
                              {isEligable() ? (isJoining ? 'Joining...' : 'Join Event') : 'Not Eligible'}
                          </Button>
                      ]}
                    />
                    }
                    {(showModal && showModal.cancel) &&
                    <EventModal
                      title={'Confirm withdrawing from event'}
                      description={
                          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                              <div>Are you sure you want to <span style={{fontWeight: 'bold'}}>withdraw</span> from the event?</div><br/>
                              <div style={{textAlign: 'center'}}>After withdrawing your <span style={{fontWeight: 'bold'}}>event progress will be reset</span>. <br/> Re-entering the event might no longer be possible!</div>
                          </div>
                      }
                      buttons={[
                          <Button size="sm" variant="quaternary"
                                  onClick={() => setShowModal({...showModal, cancel: false})}
                          >
                              {'Cancel'}
                          </Button>,
                          <Button size="sm" variant="secondary" disabled={isWithdrawing}
                                  onClick={() => onWithdrawEvent().then(() => {
                                      updateTransactions();
                                      setShowModal({...showModal, cancel: false});
                                  })}>
                              {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                          </Button>
                      ]}
                    />
                    }
                    <StyledRequiredCards>
                        {event.cardsRequired.map((cardId, index) => {
                            const card = getCardInfo(cardId);
                            const balance = cardsBalances.find(card => card.tokenId === cardId);
                            const isBurned = event.cardsBurned.includes(cardId);
                            const isOwned = balance && parseInt(balance.userBalance) > 0;
                            return card && (
                                <div style={{position: 'relative', padding: '0 1rem 0 0'}} key={`${event.id}${cardId}${index}`}>
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        padding: '0 .2rem .2rem .2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>{card.title}</div>
                                        {isBurned && <img alt="placeholder" src={'skullImg'} height="20"/>}
                                        {!isBurned && <div style={{fontSize: '20px', color: 'white'}}>A</div>}
                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <img alt="placeholder" style={{opacity: isOwned ? 1 : .7}} height='180' src={card.img}/>
                                        <img alt="placeholder"
                                            style={{position: 'absolute', bottom: '8px', left: '93px'}}
                                            src={isOwned ? 'checkmarkImg' : 'crossImg'}
                                        />
                                    </div>
                                    {!isComingSoon() &&
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: '.5rem',
                                        fontSize: '20px',
                                    }}>
                                        {isOwned ?
                                            <>
                                                <div style={{paddingRight: '.3rem'}}>You own:</div>
                                                <div style={{fontWeight: 600}}>{parseInt(balance.userBalance)}</div>
                                            </>
                                            :
                                            isItemCard(cardId) ?
                                                <StyledNavLink exact activeClassName="active" to="/store">
                                                    Buy in shop
                                                </StyledNavLink>
                                                :
                                                <StyledLink
                                                    href={`${openSeaUri}${getPepemonFactoryAddress(pepemon) ? getPepemonFactoryAddress(pepemon) : '0xCB6768a968440187157Cfe13b67Cac82ef6cc5a4'}/${cardId}/`}
                                                    target="_blank"
                                                >
                                                    Buy on opensea
                                                </StyledLink>
                                        }
                                    </div>
                                    }
                                </div>
                            )
                        })}
                    </StyledRequiredCards>
                    <Spacer/>
                    <StyledBetween>
                        {!isCompleted() &&
                          <>
                            <div>{isStarted() ? 'Time left:' : 'Duration:'}</div>
                            <div style={{fontWeight: 'bold'}}>
                            {isStarted() ?
                                formatTime(
                                    timeLeft(blocksToSeconds(event.stakeLength * (1 - (parseInt(userProgress) / 100000)))).days,
                                    timeLeft(blocksToSeconds(event.stakeLength * (1 - (parseInt(userProgress) / 100000)))).hours,
                                    timeLeft(blocksToSeconds(event.stakeLength * (1 - (parseInt(userProgress) / 100000)))).minutes,
                                ) :
                                formatTime(
                                    timeLeft(blocksToSeconds(event.stakeLength)).days,
                                    timeLeft(blocksToSeconds(event.stakeLength)).hours,
                                    timeLeft(blocksToSeconds(event.stakeLength)).minutes,
                                )
                            }
                            </div>
                          </>
                        }
                        <img alt="placeholder" style={{padding: isMobile ? '1rem 0' : '.5rem 0', transform: isMobile && 'rotate(90deg)'}} height="50" src={'arrowImg'}/>
                        {isStarted() &&
                            <>
                                <div>Progress:</div>
                                <div style={{fontWeight: 'bold'}}>{isComingSoon() ? 0 : parseInt(userProgress) / 1000}%</div>
                            </>
                        }
                    </StyledBetween>
                    <Spacer/>
                    <StyledRequiredCards>
                        {cardsReturned().filter(cardId => cardId !== event.rewardCard).map((returnedCardId => {
                            const card = getCardInfo(returnedCardId);
                            return card && (
                                <div style={{position: 'relative', padding: '0 1rem 0 0'}} key={`${event.id}${returnedCardId}`}>
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        letterSpacing: '1px',
                                        padding: '0 .2rem .2rem .2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{whiteSpace: 'nowrap'}}>{card.title}</div>
                                        <div style={{fontSize: '20px', color: 'white'}}>A</div>
                                    </div>
                                    <img alt="placeholder" height='180' src={card.img}/>
                                </div>
                            )
                        }))}
                        <div style={{position: 'relative', padding: '0 1rem .5rem 0'}} key={`${event.id}${event.rewardCard}`}>
                            {(isCompleted() && !isComingSoon()) &&<StyledOverlay>{'COMPLETED'}</StyledOverlay>}
                            {!isCompleted() &&
                                <StyledProgressOverlay img={getCardInfo(0).img} percentage={parseInt(userProgress) / 1000}/>
                            }
                            <div style={{
                                fontSize: '15px',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                padding: '0 .2rem .2rem .2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{whiteSpace: 'nowrap'}}>{getCardInfo(event.rewardCard).title}</div>
                                <div style={{fontSize: '20px', color: 'white'}}>A</div>
                            </div>
                            <img alt="placeholder" height='180' style={{marginBottom: '.3rem'}} src={getCardInfo(event.rewardCard).img}/>
                            {!account ? <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => console.log('connect')} //onPresentWalletProviderModal}
                                text="Connect Wallet"
                            /> : !isApproved ?
                                <Button size="sm" disabled={isApproving} variant="secondary"
                                        onClick={() => onSetApprovalForAll()}>
                                    {isApproving ? 'Approving...' : 'Approve first'}
                                </Button> : (!isStarted() || isComingSoon()) ?
                                    <Button size="sm" variant="secondary" disabled={!isEligable() || isClosed()}
                                            onClick={() => setShowModal({...showModal, join: true})}
                                    >
                                        {isEligable() ? (isJoining ? 'Joining...' : 'Join Event') : 'Not Eligible'}
                                    </Button>
                                    : isClaimable() ?
                                        <Button size="sm" variant="secondary" disabled={isClaiming || isCompleted()}
                                                onClick={() => onClaimEvent().then(() => updateTransactions())}>
                                            {isCompleted() ? 'Claimed' : (isClaiming ? 'Claiming...' : 'Claim reward')}
                                        </Button>
                                        :
                                        <Button size="sm" variant="quaternary"
                                                onClick={() => setShowModal({...showModal, cancel: true})}>
                                            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                                        </Button>
                            }
                        </div>
                    </StyledRequiredCards>
                </StyledContent>
                :
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Loader/>
                </div>
            }
        </StyledEventWrapper>
    );
}

interface StyledProgressOverlayProps {
    percentage: number;
    img: string;
}

interface StyledContentProps {
    isMobile: boolean;
}

const StyledNavLink = styled(NavLink)`
    color: #7c6258;
    font-weight: 600;
    text-decoration: none;

    &:hover {

    }
`

const StyledEventWrapper = styled.div`
    margin-bottom: 2rem;

`

const StyledTitle = styled.div`
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 0 0 .2rem .5rem;
`

const StyledModalTitle = styled.div`
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 0 0 1.5rem 0;
`

const StyledSubTitle = styled.div`
    display: flex;
    font-size: 18px;
    letter-spacing: 2px;
    padding: 0 0 .5rem .5rem;
`

const StyledLink = styled.a`
    color: #7c6258;
    font-weight: 600;
    text-decoration: none;

    &:hover {

    }
`

const StyledContent = styled.div<StyledContentProps>`
    position: relative;
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column': 'row'}
`

const StyledRequiredCards = styled.div`
    background-color: white;
    padding: 1rem 0 0 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: row;

    @media (max-width: 880px) {
        padding: 1rem .5rem .5rem 1rem;
        justify-content: center;
    }
`

const StyledBetween = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 5rem;
`

const StyledOverlay = styled.div`
    position: absolute;
    width: 90%;
    height: 5rem;
    transform: skewY(-18deg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 800;
    opacity: 0.7;

    top: 5rem;
`

const StyledProgressOverlay = styled.div<StyledProgressOverlayProps>`
    position: absolute;
    top: 23px;
    width: ${props => 90 - ((props.percentage / 100) * 90)}%;
    height: 71%;
    display: flex;
    align-items: center;
    justify-content: center;

    display: flex;
    justify-content: flex-end;
    // z-index: 1;
    background-image: url(${props => props.img});
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: cover;
`


export default StakeEvent
