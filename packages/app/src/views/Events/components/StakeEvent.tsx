import React, { useState } from "react";
import { ProgressBar, Loader, ExternalLink } from "../../../components";
import { disabledplusIcon, equalIcon, enabledplusIcon } from "../../../assets";
import {
  AccordionV2,
  ContentColumns,
  ContentColumn,
  Text,
  Spacer,
  Button,
} from "../../../components";
import { CardContentColumn, IStakeEvent } from "../Events";
import { CardBalances } from "../../../hooks/useCardsFactoryData";
import useUserEventProgress from "../../../hooks/useUserEventProgress";
import useUserEventStatus from "../../../hooks/useUserEventStatus";
import useSetApprovalForAll from "../../../hooks/useSetApprovalForAll";
import useJoinEvent from "../../../hooks/useJoinEvent";
import useClaimEvent from "../../../hooks/useClaimEvent";
import useWithdrawEvent from "../../../hooks/useWithdrawEvent";
import { getCardInfo } from "../../../utils/nftCards";
import { getPepemonFactoryAddress } from "../../../pepemon/utils";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

interface StyledProgressOverlayProps {
  percentage: number;
  img: string;
}

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
  const [showModal, setShowModal] = useState({ join: false, cancel: false });
  const userProgress = useUserEventProgress(event.id, transactions);
  const userEventStatus = useUserEventStatus(event.id, transactions);

  const { onSetApprovalForAll, isApproving } = useSetApprovalForAll();
  const { onJoinEvent, isJoining } = useJoinEvent(event.id);
  const { onClaimEvent, isClaiming } = useClaimEvent(event.id);
  const { onWithdrawEvent, isWithdrawing } = useWithdrawEvent(event.id);

  const openSeaUri =
    pepemon && pepemon.chainId === 1
      ? `https://opensea.io/assets/`
      : `https://rinkeby.opensea.io/assets/`;

  const updateTransactions = () => {
    setTransactions(transactions + 1);
    setEventTransactions(eventTransactions + 1);
  };
  const blocksToSeconds = (blocks: number) => {
    if (blocks < 0) {
      return 0;
    }
    return blocks * 13.1;
  };
  const secondsToDays = (seconds: number) => {
    const day = 60 * 60 * 24;
    return Math.floor(seconds / day) < 0 ? 0 : Math.floor(seconds / day);
  };
  const secondsToHoursMinusDays = (seconds: number, days: number) => {
    const day = 60 * 60 * 24;
    const hour = 60 * 60;
    return Math.floor((seconds - day * days) / hour);
  };
  const secondsToMinutesMinusDaysMinusHours = (
    seconds: number,
    days: number,
    hours: number
  ) => {
    const day = 60 * 60 * 24;
    const hour = 60 * 60;
    const minute = 60;
    return Math.ceil((seconds - day * days - hour * hours) / minute);
  };
  const timeLeft = (seconds: number) => {
    const days = secondsToDays(seconds);
    const hours = secondsToHoursMinusDays(seconds, days);
    const minutes = secondsToMinutesMinusDaysMinusHours(seconds, days, hours);
    return {
      days,
      hours,
      minutes,
    };
  };
  const formatTime = (days: number, hours: number, minutes: number) => {
    if (days >= 1) {
      return `${days} ${days === 1 ? "day" : "days"}`;
    }
    if (hours >= 1) {
      return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    }
    if (minutes === 0) {
      return `no time`;
    }
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  };

  const isEligable = () => {
    let isMissingCard = false;
    event.cardsRequired.map((cardId) => {
      const card = cardsBalances.find((card) => card.tokenId === cardId);
      if (!card || !(parseInt(card.userBalance) > 0)) {
        isMissingCard = true;
      }
    });

    return !isMissingCard;
  };

  const isCompleted = () => {
    return userEventStatus && userEventStatus.isCompleted;
  };
  const isStarted = () => {
    return userEventStatus && parseInt(userEventStatus.blockEnd.toString()) > 0;
  };
  const isClaimable = () => {
    return userProgress === "100000";
  };
  const isClosed = () => {
    return (
      formatTime(
        timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).days,
        timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).hours,
        timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber)).minutes
      ) === "no time"
    );
  };
  const isComingSoon = () => {
    return event.blockEnd === 0;
  };

  const cardsReturned = () => {
    return [
      ...event.cardsRequired.filter(
        (cardId) => !event.cardsBurned.includes(cardId)
      ),
      event.rewardCard,
    ];
  };

  const isItemCard = (cardId: number) => {
    return [17, 18, 19].includes(cardId);
  };

  return (
    <AccordionV2
      title={event.title}
      isOpen={true}
      timeLeft={
        isClosed() || isComingSoon()
          ? !isComingSoon()
            ? "Ended"
            : "You have to wait a little bit longer"
          : !isClosed() &&
            `${formatTime(
              timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber))
                .days,
              timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber))
                .hours,
              timeLeft(blocksToSeconds(event.blockEnd - currentBlockNumber))
                .minutes
            )} left to enter`
      }
    >
      <div>
        <ContentColumns>
          <ContentColumn width="50%">
            <Text as="p" size="m" lineHeight={1.125}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, non nemo. Omnis aliquam totam dolores sequi, ea optio
              quibusdam id voluptatem blanditiis ducimus explicabo libero natus
              molestiae assumenda neque nesciunt.
            </Text>
          </ContentColumn>
        </ContentColumns>
        <Spacer size="md" />
        <div style={{ display: "flex" }}>
          {/* <ContentColumns> */}
          <StyledRequiredCards>
            {event.cardsRequired.map((cardId, index, { length }) => {
              const card = getCardInfo(cardId);
              const balance = cardsBalances.find(
                (card) => card.tokenId === cardId
              );
              const isBurned = event.cardsBurned.includes(cardId);
              const isOwned = balance && parseInt(balance.userBalance) > 0;

              return (
                card && (
                  <>
                    <div
                      style={{ position: "relative", padding: "0 1rem 0 0" }}
                      key={`${event.id}${cardId}${index}`}
                    >
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          letterSpacing: "1px",
                          padding: "0 .2rem .2rem .2rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>{card.title}</div>
                        {/* {isBurned && <img src={skullImg} height="20"/>} */}
                        {!isBurned && (
                          <div style={{ fontSize: "20px", color: "white" }}>
                            A
                          </div>
                        )}
                      </div>
                      <div style={{ position: "relative" }}>
                        <img
                          loading="lazy"
                          style={{ opacity: isOwned ? 1 : 0.7 }}
                          height="180"
                          src={card.img}
                        />
                        {/* <img
                                            style={{position: 'absolute', bottom: '8px', left: '93px'}}
                                            src={isOwned ? checkmarkImg : crossImg}
                                        /> */}
                      </div>

                      {!isComingSoon() && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: ".5rem",
                            fontSize: "20px",
                          }}
                        >
                          {isOwned ? (
                            <>
                              <div style={{ paddingRight: ".3rem" }}>
                                You own:
                              </div>
                              <div style={{ fontWeight: 600 }}>
                                {parseInt(balance.userBalance)}
                              </div>
                            </>
                          ) : isItemCard(cardId) ? (
                            <Link to="/store">Buy in shop</Link>
                          ) : (
                            <ExternalLink
                              href={`${openSeaUri}${
                                getPepemonFactoryAddress(pepemon)
                                  ? getPepemonFactoryAddress(pepemon)
                                  : "0xCB6768a968440187157Cfe13b67Cac82ef6cc5a4"
                              }/${cardId}/`}
                            >
                              Buy on opensea
                            </ExternalLink>
                          )}
                        </div>
                      )}
                    </div>
                    {!(index + 1 === length) && (
                      <div style={{ width: "100px" }}>
                        {" "}
                        <img
                          src={disabledplusIcon}
                          alt="disabledplusIcon"
                        />{" "}
                      </div>
                    )}
                  </>
                )
              );
            })}
          </StyledRequiredCards>
          <img loading="lazy" src={equalIcon} alt="equalIcon" />
          <StyledRequiredCards>
            {cardsReturned()
              .filter((cardId) => cardId !== event.rewardCard)
              .map((returnedCardId, index, { length }) => {
                const card = getCardInfo(returnedCardId);


                return (
                  card && (
                    <>
                      <div
                        style={{
                          position: "relative",
                          padding: "0 1rem 0 0",
                          flex: "1 1 0px",
                        }}
                        key={`${event.id}${returnedCardId}`}
                      >
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            padding: "0 .2rem .2rem .2rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ whiteSpace: "nowrap" }}>
                            {card.title}
                          </div>
                          <div style={{ fontSize: "20px", color: "white" }}>
                            A
                          </div>
                        </div>
                        <img height="180" src={card.img} />
                      </div>
                      {!(index + 1 === length) && (
                        <img src={enabledplusIcon} alt="enabledplusIcon" />
                      )}
                    </>
                  )
                );
              })}
            <div
              style={{
                position: "relative",
                padding: "0 1rem .5rem 0",
                flex: "1 1 0px",
              }}
              key={`${event.id}${event.rewardCard}`}
            >
              {/* {(isCompleted() && !isComingSoon()) &&<StyledOverlay>{'COMPLETED'}</StyledOverlay>}
                            {!isCompleted() &&
                                <StyledProgressOverlay img={getCardInfo(0).img} percentage={parseInt(userProgress) / 1000}/>
                            } */}
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  padding: "0 .2rem .2rem .2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ whiteSpace: "nowrap" }}>
                  {getCardInfo(event.rewardCard).title}
                </div>
                <div style={{ fontSize: "20px", color: "white" }}>A</div>
              </div>
              <img
                loading="lazy"
                height="180"
                style={{ marginBottom: ".3rem" }}
                src={getCardInfo(event.rewardCard).img}
              />
              {/* {!account ? <Button
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
                             } */}
            </div>
          </StyledRequiredCards>
          {/* </ContentColumns> */}
        </div>

        <Spacer size="sm" />
        <ProgressBar percent={0} />
        <Spacer size="md" />
        <ContentColumns>
          <Text as="p" size="m" lineHeight={1.125} style={{ margin: "auto" }}>
            {/* Duration of event: 9 days */}
          </Text>
        </ContentColumns>
        <Spacer size="sm" />
        <ContentColumns>
          {isClosed() ? (
            <Text as="p" size="m" lineHeight={1.125} style={{ margin: "auto" }}>
              Event has ended
            </Text>
          ) : (
            <Button width="25%" styling="purple" style={{ margin: "auto" }}>
              {" "}
              JOIN EVENT
            </Button>
          )}
        </ContentColumns>
      </div>
    </AccordionV2>
  );
};

const StyledRequiredCards = styled.div`
  background-color: white;
  padding: 1rem 0 0 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 880px) {
    padding: 1rem 0.5rem 0.5rem 1rem;
    justify-content: center;
  }
`;
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
  background-color: ${(props) => props.theme.color.white};
  top: 5rem;
`;

const StyledProgressOverlay = styled.div<StyledProgressOverlayProps>`
  position: absolute;
  top: 23px;
  width: ${(props) => 90 - (props.percentage / 100) * 90}%;
  height: 71%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: flex-end;
  // z-index: 1;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: cover;
`;
// const StyledNavLink = styled(NavLink)`
//     color: #7c6258;
//     font-weight: 600;
//     text-decoration: none;

//     &:hover {
//       color: ${props => props.theme.color.grey[600]};
//     }
// `

// const StyledLink = styled.a`
//     color: #7c6258;
//     font-weight: 600;
//     text-decoration: none;

//     &:hover {
//       color: ${props => props.theme.color.grey[600]};
//     }
// `
export default StakeEvent;
