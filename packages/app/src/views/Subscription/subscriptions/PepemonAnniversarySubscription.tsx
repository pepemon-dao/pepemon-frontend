import React, { useState, useContext } from "react";
import BigNumber from "bignumber.js";
import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderTitle,
  AccordionHeaderButton,
  AccordionBody,
  AccordionBodyContent,
  Spacer,
  Button,
  Title,
  Text,
  ContentColumns,
  ContentColumn,
  ExternalLink,
} from "../../../components";
import { PepemonProviderContext } from "../../../contexts";
import {
  useCardsMetadata,
  useTokenBalance,
  useApprove,
  useAllowance,
  useLotteryMinLPTokens,
  useLotteryRewardCard,
  useLotteryLPBalance,
  useLotteryIsStaking,
  useLotteryHasClaimed,
  useLotteryStakingDeadline,
  useLotteryStakingStartblock,
  useLotteryClaim,
  useLotteryWithdraw,
  useLotteryStake,
  useBlock,
} from "../../../hooks";
import {
  getPepemonLotteryContract,
  getPpdexAddress,
  getPpdexUniV2Contract,
  getUniV2PpdexAddress,
} from "../../../pepemon/utils";
import { getBalanceNumber } from "../../../utils";
import {
  cardback_normal,
  dropdownarrow,
  pokeball,
  uparrow,
  anniversarycard,
} from "../../../assets";
import { theme } from "../../../theme";
import styled from "styled-components";

const PepemonAnniversarySubscription: React.FC<any> = () => {
  const pepemonContext = useContext(PepemonProviderContext);
  const pepemon = pepemonContext[0];

  const ppdexUniV2Balance = useTokenBalance(getUniV2PpdexAddress(pepemon));
  const [transaction, setTransaction] = useState(0);
  const { onApprove, isApproving } = useApprove(
    getPepemonLotteryContract(pepemon),
    getPpdexUniV2Contract(pepemon)
  );
  const { onLotteryStake, isJoining } = useLotteryStake();
  const { onLotteryWithdraw, isWithdrawing } = useLotteryWithdraw();
  const { onLotteryClaim, isClaiming } = useLotteryClaim();
  const blockNumber = useBlock();
  const lockedPeriod = 208000;
  const allowance = useAllowance(
    getPepemonLotteryContract(pepemon),
    getPpdexUniV2Contract(pepemon)
  );
  const minLPTokens: BigNumber = useLotteryMinLPTokens();
  const isStaking = useLotteryIsStaking(transaction);
  const stakedBalance = useLotteryLPBalance(transaction);
  const rewardCard = useLotteryRewardCard();
  const cardMeta = useCardsMetadata([parseInt(rewardCard || 0)])[0];
  const stakingDeadline = useLotteryStakingDeadline();
  const stakingStart = useLotteryStakingStartblock(transaction);
  const hasClaimed = useLotteryHasClaimed(rewardCard, transaction);
  const lockedBlocks = parseInt(stakingStart) + lockedPeriod - blockNumber;
  const canClaimCurrentCard = () => {
    return stakingDeadline > stakingStart;
  };

  const [openAccordion, setOpenAccordion] = useState(true);
  const toggleAccordion = () => {
    console.log(openAccordion);
    setOpenAccordion(!openAccordion);
  };

  return (
    <AccordionWrapper isOpen={openAccordion}>
      <AccordionHeader onClick={toggleAccordion} isOpen={openAccordion}>
        <AccordionHeaderTitle>
          <img
            loading="lazy"
            src={pokeball}
            alt="Pokeball"
            style={{ width: "40px", height: "40px", marginRight: "1em" }}
          />
          <Title
            as="h2"
            color={openAccordion ? theme.color.green[200] : theme.color.white}
            weight={900}
            font={theme.font.neometric}
          >
            Pepemon One 1st Anniversary set
          </Title>
        </AccordionHeaderTitle>
        <AccordionHeaderButton onClick={toggleAccordion}>
          <span>Show {openAccordion ? "less" : "more"}</span>
          <img
            loading="lazy"
            src={openAccordion ? uparrow : dropdownarrow}
            alt="logo"
            style={{ height: "0.5em", alignSelf: "center" }}
          />
        </AccordionHeaderButton>
      </AccordionHeader>
      {openAccordion && (
        <AccordionBody>
          <SubscriptionColWrapper>
            <div>
              <Text
                as="p"
                size={2.5}
                weight={900}
                lineHeight={1}
                font={theme.font.neometric}
              >
                1st Anniversary set
              </Text>
              <Spacer size="sm" />

              <TextWrap>
                <Text as="p" size={1} lineHeight={1.125}>
                  Celebrating a full year of Pepemon with an awesome birthday
                  set. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </Text>
              </TextWrap>
              <Spacer size="lg" />
            </div>
            <div>
              <CardsRowWrapper>
                <AccordionBodyContent side="left">
                  <div>
                    <Text
                      as="p"
                      size={1.375}
                      color={theme.color.headers}
                      weight={900}
                      font={theme.font.neometric}
                    >
                      Pepertle
                    </Text>
                    <Spacer size="sm" />

                    <Spacer size="sm" />
                    <img
                      src={anniversarycard}
                      alt={cardMeta ? cardMeta.name : "Loading card..."}
                    />

                    <Spacer size="md" />
                    <Text
                      as="p"
                      size={0.75}
                      color={theme.color.gray[400]}
                      txtTransform="uppercase"
                      text-align="center"
                    >
                      Providing ppblz liquidity to recieve this card
                    </Text>
                    <Spacer size="md" />

                    <>
                      <Button
                        disabled={hasClaimed || isClaiming}
                        styling="purple"
                        width="100%"
                        onClick={() =>
                          onLotteryClaim().then(() =>
                            setTransaction(transaction + 1)
                          )
                        }
                      >
                        {hasClaimed
                          ? "Already claimed"
                          : isClaiming
                          ? "Claiming..."
                          : "Claim card"}
                      </Button>
                    </>
                  </div>
                </AccordionBodyContent>
                <AccordionBodyContent side="left">
                  <div>
                    <Text
                      as="p"
                      size={1.375}
                      color={theme.color.headers}
                      weight={900}
                      font={theme.font.neometric}
                    >
                      Pepemander
                    </Text>
                    <Spacer size="sm" />

                    <img
                      src={anniversarycard}
                      alt={cardMeta ? cardMeta.name : "Loading card..."}
                    />
                    <Spacer size="md" />
                    <Text
                      as="p"
                      size={0.75}
                      color={theme.color.gray[400]}
                      txtTransform="uppercase"
                      align="center"
                    >
                      Donate 1 card to recieve this card
                    </Text>
                    <Spacer size="md" />

                    <>
                      <Button
                        disabled={hasClaimed || isClaiming}
                        styling="purple"
                        width="100%"
                        onClick={() =>
                          onLotteryClaim().then(() =>
                            setTransaction(transaction + 1)
                          )
                        }
                      >
                        {hasClaimed
                          ? "Already claimed"
                          : isClaiming
                          ? "Claiming..."
                          : "Claim card"}
                      </Button>
                    </>
                  </div>
                </AccordionBodyContent>

                <AccordionBodyContent side="left">
                  <div>
                    <Text
                      as="p"
                      size={1.375}
                      color={theme.color.headers}
                      weight={900}
                      font={theme.font.neometric}
                    >
                      Pepesaur
                    </Text>
                    <Spacer size="sm" />

                    <Spacer size="sm" />
                    <img
                      src={anniversarycard}
                      alt={cardMeta ? cardMeta.name : "Loading card..."}
                    />
                    <Spacer size="md" />
                    <Text
                      as="p"
                      size={0.75}
                      color={theme.color.gray[400]}
                      txtTransform="uppercase"
                    >
                      Providing ppblz liquidity to recieve this card
                    </Text>
                    <Spacer size="md" />

                    <>
                      <Button
                        disabled={hasClaimed || isClaiming}
                        styling="purple"
                        width="100%"
                        onClick={() =>
                          onLotteryClaim().then(() =>
                            setTransaction(transaction + 1)
                          )
                        }
                      >
                        {hasClaimed
                          ? "Already claimed"
                          : isClaiming
                          ? "Claiming..."
                          : "Claim card"}
                      </Button>
                    </>
                  </div>
                </AccordionBodyContent>
                <AccordionBodyContent side="left">
                  <div>
                    <Text
                      as="p"
                      size={1.375}
                      color={theme.color.headers}
                      weight={900}
                      font={theme.font.neometric}
                    >
                      Pepechu
                    </Text>
                    <Spacer size="sm" />

                    <Spacer size="sm" />
                    <img
                      src={anniversarycard}
                      alt={cardMeta ? cardMeta.name : "Loading card..."}
                    />
                    <Spacer size="md" />
                    <Text
                      as="p"
                      size={0.75}
                      color={theme.color.gray[400]}
                      txtTransform="uppercase"
                    >
                      Providing ppblz liquidity to recieve this card
                    </Text>
                    <>
                      <Spacer size="md" />

                      <Button
                        disabled={hasClaimed || isClaiming}
                        styling="purple"
                        width="100%"
                        onClick={() =>
                          onLotteryClaim().then(() =>
                            setTransaction(transaction + 1)
                          )
                        }
                      >
                        {hasClaimed
                          ? "Already claimed"
                          : isClaiming
                          ? "Claiming..."
                          : "Claim card"}
                      </Button>
                    </>
                  </div>
                </AccordionBodyContent>
              </CardsRowWrapper>
            </div>
          </SubscriptionColWrapper>
        </AccordionBody>
      )}
    </AccordionWrapper>
  );
};

export default PepemonAnniversarySubscription;
const CardsRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubscriptionColWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextWrap = styled.div`
  width: 55%;
`;
