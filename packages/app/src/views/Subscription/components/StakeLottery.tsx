import React, { useState } from 'react'
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Accordion, Spacer, Button, Title, Text, ContentColumns, ContentColumn, ExternalLink } from "../../../components";
import { useCardsMetadata, useTokenBalance, useApprove, useAllowance, useLotteryMinLPTokens, useLotteryRewardCard, useLotteryLPBalance, useLotteryIsStaking, useLotteryHasClaimed, useLotteryStakingDeadline, useLotteryStakingStartblock, useLotteryClaim, useLotteryWithdraw, useLotteryStake, useBlock } from '../../../hooks';
import { getPepemonLotteryContract, getPpdexAddress, getPpdexUniV2Contract, getUniV2PpdexAddress } from '../../../pepemon/utils';
import { getBalanceNumber } from '../../../utils';
import { cardback_normal, dropdownarrow, pokeball, uparrow } from "../../../assets";
import { theme } from "../../../theme";

const StakeLotteryCard: React.FC<any> = ({ pepemon, account }) => {
    const ppdexUniV2Balance = useTokenBalance(getUniV2PpdexAddress(pepemon));
    const [transaction, setTransaction] = useState(0);
    const { onApprove, isApproving } = useApprove(getPepemonLotteryContract(pepemon), getPpdexUniV2Contract(pepemon));
    const { onLotteryStake, isJoining } = useLotteryStake();
    const { onLotteryWithdraw, isWithdrawing } = useLotteryWithdraw();
    const { onLotteryClaim, isClaiming } = useLotteryClaim();
    const blockNumber = useBlock();
    const lockedPeriod = 208000;
    const allowance = useAllowance(getPepemonLotteryContract(pepemon), getPpdexUniV2Contract(pepemon));
    const minLPTokens: BigNumber = useLotteryMinLPTokens();
    const isStaking = useLotteryIsStaking(transaction);
    const stakedBalance = useLotteryLPBalance(transaction);
    const rewardCard = useLotteryRewardCard();
	const cardMeta = useCardsMetadata([parseInt(rewardCard || 0 )])[0];
    const stakingDeadline = useLotteryStakingDeadline();
    const stakingStart = useLotteryStakingStartblock(transaction);
    const hasClaimed = useLotteryHasClaimed(rewardCard, transaction);
    const lockedBlocks = (parseInt(stakingStart) + lockedPeriod) - blockNumber;
    const canClaimCurrentCard = () => {
        return stakingDeadline > stakingStart;
    }

	const [openAccordion, setOpenAccordion] = useState(true);
	const toggleAccordion = () => {
		console.log(openAccordion);
		setOpenAccordion(!openAccordion)
	}

    return (
		<>
			<AccordionWrapper isOpen={openAccordion}>
				<AccordionHeader onClick={toggleAccordion} isOpen={openAccordion}>
					<AccordionHeaderTitle>
						<img loading="lazy" src={pokeball} alt="Pokeball" style={{ width: "40px", height: "40px", marginRight: "1em" }}/>
						<Title as="h2" color={true ? theme.color.green[200] : theme.color.white} weight={900} font={theme.font.neometric}>Real subscription</Title>
					</AccordionHeaderTitle>
					<AccordionHeaderButton onClick={toggleAccordion}>
							<span>Show {true ? "less" : "more"}</span>
							<img loading="lazy" src={true ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
					</AccordionHeaderButton>
				</AccordionHeader>
				{true &&
					<AccordionBody>
						<AccordionBodyContent side="left">
							<Text as="p" size={.875} lineHeight={1.125}>
								Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP, stake these LP tokens and recieve a unique NFT every month. Your LP tokens will be locked for a minimum 32 days.
							</Text>
							<Spacer size="lg"/>
							<ContentColumns>
								<ContentColumn width="50%">
									<Text as="p" lineHeight={1}>PPDEX-ETH LP balance</Text>
									<Spacer size="sm"/>
									<Text as="p" size={2.5} weight={900} lineHeight={1} font={theme.font.neometric}>
										{parseFloat(getBalanceNumber(ppdexUniV2Balance).toString()).toFixed(2)}
									</Text>
									<Spacer size="md"/>
									<Text as="p" lineHeight={1}>PPDEX-ETH LP staked</Text>
									<Spacer size="sm"/>
									<Text as="p" size={2.5} weight={900} lineHeight={1} font={theme.font.neometric}>
										{parseFloat(getBalanceNumber(stakedBalance).toString()).toFixed(2)}
									</Text>
								</ContentColumn>
								<ContentColumn width="50%">
									<ExternalLink href={`https://app.uniswap.org/#/add/v2/ETH/${getPpdexAddress(pepemon)}`}>Buy PPBLZ-ETH LP</ExternalLink>
								</ContentColumn>
							</ContentColumns>
							<Spacer size="md"/>
							{ isStaking &&
								<>
									<Text as="p" size={2.5} lineHeight={1.1} color={theme.color.purple[600]} weight={900} font={theme.font.neometric}>
										You have an active <wbr/>subscription!
									</Text>
									<Spacer size="md"/>
								</>
							}
								<div style={{ display: "inline-flex", flexDirection: "column" }}>
									<Text as="p" size={.875}>
										{ minLPTokens ?
											`${parseFloat(parseFloat((getBalanceNumber(minLPTokens) + 0.01).toString()).toPrecision(3))} PPBLZ-ETH LP needed to subscribe` :
											'fetching...'
										}
									</Text>
									<Spacer size="sm"/>
									{allowance.comparedTo(minLPTokens) === -1 ?
										<Button disabled={isApproving} size="sm" styling="purple" onClick={onApprove}>
											{isApproving ? 'Approving...' : 'Approve LP'}
										</Button>
									: isStaking ?
										<Button disabled={isWithdrawing || (lockedBlocks > 0)} size="sm" styling="purple" onClick={() => onLotteryWithdraw().then(() => setTransaction(transaction + 1))}>
											{(lockedBlocks > 0) ? 'Locked' : isWithdrawing ? 'Unsubscribing...' : 'Unsubscribe'}
										</Button>
									:
										<Button disabled={(minLPTokens && ppdexUniV2Balance.comparedTo(minLPTokens) === -1) || isJoining || isStaking} size="sm" styling="purple" onClick={() => onLotteryStake().then(() => setTransaction(transaction + 1))}>
											{isStaking ? 'Active' : (minLPTokens && ppdexUniV2Balance.comparedTo(minLPTokens) === -1) ? 'Insufficient LP' : isJoining ? 'Staking...' : 'Subscribe & Stake LP'}
										</Button>
									}
								</div>
							<Spacer size="md"/>
						</AccordionBodyContent>

						<AccordionBodyContent side="right">
							<div>
								<Text as="p" size={.75} color={theme.color.gray[400]} txtTransform="uppercase">This months card:</Text>
								<Spacer size="md"/>
								<Text as="p" size={1.375} color={theme.color.headers} weight={900} font={theme.font.neometric}>{cardMeta ? cardMeta.name : 'Loading card title...'}</Text>
								<Spacer size="sm"/>
								<Text as="p" size={.875} color={theme.color.headers}>
									{cardMeta ? cardMeta.description : 'Loading card description...'}
								</Text>
								<Spacer size="sm"/>
								<img src={cardMeta ? cardMeta.image : cardback_normal} alt={cardMeta ? cardMeta.name : 'Loading card...'}/>
								<Spacer size="md"/>
								{ isStaking ?
									<>
										{ canClaimCurrentCard() ?
											<Button disabled={hasClaimed || isClaiming} styling="purple" width="100%" onClick={() => onLotteryClaim().then(() => setTransaction(transaction + 1))}>
												{hasClaimed ? 'Already claimed' : (isClaiming ? 'Claiming...' : 'Claim card')}
											</Button>
											:
											<Button disabled styling="white_borderless" width="100%">
												Not eligible
											</Button>
										}
									</>
									:
									<Button disabled styling="white_borderless" width="100%">
										Subscribe to claim
									</Button>
								}
							</div>
						</AccordionBodyContent>
					</AccordionBody>
				}
			</AccordionWrapper>
			<AccordionGroup>
				<Accordion state="approve" heading="Pepemon One Subscription" />
				<Accordion state="can_stake" heading="Pepemon Two Subscription" />
				<Accordion state="active" heading="Pepemon Three Subscription" />
				<Accordion state="active" heading="Pepemon Four Subscription" />
			</AccordionGroup>
		</>
    )
}

export const AccordionGroup = styled.section`
	display: flex;
	flex-direction: column;
`

const AccordionWrapper = styled.div<{isOpen: boolean}>`
	background-color: ${props => props.theme.color.purple[800]};
	border-radius: ${props => props.theme.borderRadius}px;
	margin-bottom: .5em;
	outline: ${props => props.isOpen && `2px solid ${props.theme.color.green[200]}` };
	width: 100%;
`

const AccordionHeader = styled.div<{isOpen: boolean}>`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	padding: 1.25em 2em;
`

const AccordionHeaderTitle = styled.div`
	display: flex;
	align-items: center;
`

const AccordionHeaderButton = styled.button`
	align-items: center;
	background-color: ${props => props.theme.color.transparent};
	border: none;
	color: ${props => props.theme.color.white};
	cursor: pointer;
	display: flex;
	font-family: ${props => props.theme.font.neometric};
	font-size: 0.75rem;

	img {
		margin-left: .7em;
	}
`

const AccordionBody = styled.div`
	background-color: ${props => props.theme.color.white};
	border-bottom-left-radius: ${props => props.theme.borderRadius}px;
	border-bottom-right-radius: ${props => props.theme.borderRadius}px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1.5em 5.3em 2em 2em;
`

const AccordionBodyContent = styled.div<{side: "left" | "right"}>`
	border-left: ${props => props.side === "right" && `2px solid ${props.theme.color.colorsLayoutBorders}`};
	padding-left: ${props => props.side === "right" && "5.5em"};
	padding-right: ${props => props.side === "left" && "5.5em"};
`

export default StakeLotteryCard
