import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Popover } from "reactstrap";
import { ContentCentered, StyledPageWrapperMain, StyledPageWrapperMainInner, Button, LinkButton, StyledText, StyledTitle, StyledPageTitle, IbuttonPopover, Spacer } from "../../components";
import { usePepemon, useWeb3Modal } from "../../hooks";
import { correctChainIsLoaded } from "../../utils";
import { theme } from "../../theme";
import { sendTransaction } from "../../pepemon/utils";
import Web3 from "web3";
import "./Stake.css";
import { ibutton, pokeball } from "../../assets";

const Stake: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [popoverOpen2, setPopoverOpen2] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);
	const toggle2 = () => setPopoverOpen2(!popoverOpen2);
	const pepemon = usePepemon();
	const [provider] = useWeb3Modal();
	const web3: any = new Web3(provider);
	//TODO: implement proper state / context management
	const [ppblzStakeAdd, setPpblzStakeAdd] = useState(false);
	const [ppblzStakeSub, setPpblzStakeSub] = useState(false);
	const [ppblzStakeAmount, setPpblzStakeAmount] = useState<any>(null);
	const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0);
	const [uniV2PpblzStakeAmount, setUniV2PpblzStakeAmount] = useState<any>(null);
	const [uniV2PpblzStakedAmount, setUniV2PpblzStakedAmount] = useState(0);
	const [isApprovedPpblz, setIsApprovedPpblz] = useState(false);
	const [isApprovingPpblz, setIsApprovingPpblz] = useState(false);
	const [isApprovedUniV2Ppblz, setIsApprovedUniV2Ppblz] = useState(false);
	const [isApprovingUniV2Ppblz, setIsApprovingUniV2Ppblz] = useState(false);
	const [isStakingPpblz, setIsStakingPpblz] = useState(false);
	const [isWithdrawingPpblz, setIsWithdrawingPpblz] = useState(false);
	const [isStakingUniV2Ppblz, setIsStakingUniV2Ppblz] = useState(false);
	const [isClaiming, setIsClaiming] = useState(false);
	const [isUpdatingRewards, setIsUpdatingRewards] = useState(false);
	const [ppdexRewards, setPpdexRewards] = useState(0);
	const [totalPpblzSupply, setTotalPpblzSupply] = useState(0);
	const [totalUniV2PpblzSupply, setTotalUniV2PpblzSupply] = useState(0);
	const [uniV2PpblAllowance, setUniV2PpblzAllowance] = useState(0);
	const [ppblzBalance, setPpblzBalance] = useState(0);
	const [uniV2PpblzBalance, setUniV2PpblzBalance] = useState(0);
	const [ppdexBalance, setPpdexBalance] = useState(0);
	const [transactionFinished, setTransactionFinished] = useState(0);

	const { account } = usePepemon();
	const getAccount = useCallback(() => {
		return account;
	}, [account]);


	useEffect(() => {
		const timer: any = null;
		return () => timer && clearTimeout(timer);
	}, []);

	const resetToInitialStateOnReject = async () => {
	setIsStakingPpblz(false);
	setIsApprovingPpblz(false);
	setIsWithdrawingPpblz(false);
	setIsStakingUniV2Ppblz(false);
	setIsApprovingUniV2Ppblz(false);
	setIsClaiming(false);
	};

	//TODO: move to generic contract service
	/** getters */
	const getPpblzAllowance = useCallback(async () => {
		// @ts-ignore
		let _ppblzAllowance = await pepemon.contracts.ppblz.allowance(
			getAccount(),
			pepemon.contracts.ppdex.address
		);
		if (_ppblzAllowance > 0) {
			setIsApprovedPpblz(true);
		}
	},[pepemon, getAccount, setIsApprovedPpblz]);

	const getUniV2PpblzAllowance = useCallback(async () => {
		// @ts-ignore
		let _uniV2PpblzAllowance = await pepemon.contracts.uniV2_ppblz.allowance(
			getAccount(),
			pepemon.contracts.ppdex.address
		);
		setUniV2PpblzAllowance(web3.utils.fromWei(_uniV2PpblzAllowance.toString()));
		if (_uniV2PpblzAllowance > 0) {
			setIsApprovedUniV2Ppblz(true);
		}
	},[pepemon, getAccount, setIsApprovedUniV2Ppblz, web3.utils]);

	const getPpblzBalance = useCallback(async () => {
		let _ppblzBalance = await pepemon.contracts.ppblz.balanceOf(getAccount());
		setPpblzBalance(web3.utils.fromWei(_ppblzBalance.toString()));
	},[pepemon, web3.utils, getAccount]);

	const getUniV2PpblzBalance = useCallback(async () => {
		let _uniV2PpblzBalance = await pepemon.contracts.uniV2_ppblz.balanceOf(getAccount());
		setUniV2PpblzBalance(web3.utils.fromWei(_uniV2PpblzBalance.toString()));
	},[pepemon, web3.utils, getAccount]);

	const getPpdexBalance = useCallback(async () => {
		let _ppdexBalance = await pepemon.contracts.ppdex.balanceOf(getAccount());
		setPpdexBalance(web3.utils.fromWei(_ppdexBalance.toString()));
	},[pepemon, web3.utils, getAccount]);

	const getPpblzSupply = useCallback(async () => {
		let _ppblzSupply = await pepemon.contracts.ppblz.totalSupply();
		setTotalPpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
	},[pepemon, web3.utils]);

	const getUniV2PpblzSupply = useCallback(async () => {
		let _ppblzSupply = await pepemon.contracts.uniV2_ppblz.totalSupply();
		setTotalUniV2PpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
	},[pepemon, web3.utils]);

	const getMyPpblzStakeAmount = useCallback( async () => {
		let stakeA = await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount());
		setPpblzStakedAmount(web3.utils.fromWei(stakeA.toString()));
	}, [getAccount, pepemon, web3.utils]);

	const getMyUniV2PpblzStakeAmount = useCallback(async () => {
		let stakeA = await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount());
		setUniV2PpblzStakedAmount(web3.utils.fromWei(stakeA.toString()));
	},[pepemon, web3.utils, getAccount, setUniV2PpblzStakedAmount]);

	const getPpdexRewards = useCallback(async () => {
		setIsUpdatingRewards(true);
		let cRewards = (
			await pepemon.contracts.ppdex.myRewardsBalance(getAccount())
		).toString();
		const ppblzStaked = (
			await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount())
		).toString();
		const uniV2Staked = (
			await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount())
		).toString();

		// Faulty myRewardsBalance edge case.. dont use view but recalculate!
		if (ppblzStaked > 0 && uniV2Staked > 0) {
			const lastRewardBlock =
			await pepemon.contracts.ppdex.getLastBlockCheckedNum(getAccount());
			const currentBlock = await pepemon.contracts.ppdex.getBlockNum();
			const liquidityMultiplier =
			await pepemon.contracts.ppdex.getLiquidityMultiplier();
			const rewardsVar = 100000;

			const ppblzRewardBalance =
			(ppblzStaked * (currentBlock - lastRewardBlock)) / rewardsVar;
			const uniV2RewardsBalance =
			(uniV2Staked *
				((currentBlock - lastRewardBlock) * liquidityMultiplier)) /
			rewardsVar;
			const originalReward =
			cRewards - (ppblzRewardBalance + uniV2RewardsBalance);

			if (originalReward > 10000) {
			const realReward =
				(cRewards - (ppblzRewardBalance + uniV2RewardsBalance)) / 2 +
				(ppblzRewardBalance + uniV2RewardsBalance);
			cRewards = realReward.toString();
			}
		}
		setPpdexRewards(web3.utils.fromWei(cRewards));

		const timer = setTimeout(() => {
			setIsUpdatingRewards(false);
			clearTimeout(timer);
		}, 2000);
	},[getAccount, pepemon, web3.utils]);

	const stakePpblz = async () => {
	if (
		isStakingPpblz ||
		parseFloat(ppblzStakeAmount) === 0 ||
		parseFloat(ppblzStakeAmount) > ppblzBalance
	) {
		return;
	}

	setIsStakingPpblz(true);
	try {
		let stakeRes = await sendTransaction(
		provider,
		async () =>
			await pepemon.contracts.ppdex.stakePpblz(
			web3.utils.toWei(ppblzStakeAmount.toString()),
			{ gasLimit: 200000 }
			)
		);
		if (stakeRes) {
		setIsStakingPpblz(false);
		setPpblzStakeAmount(null);
		await getMyPpblzStakeAmount();
		await getPpblzBalance();
		await getPpblzAllowance();
		await getPpdexRewards();
		}
		return setTransactionFinished(transactionFinished + 1);
	} catch (error) {
		console.log(error);
		await resetToInitialStateOnReject();
	}
	};

	const stakeUniV2Ppblz = async () => {
	if (
		isStakingUniV2Ppblz ||
		parseFloat(uniV2PpblzStakeAmount) === 0 ||
		parseFloat(uniV2PpblzStakeAmount) > uniV2PpblzBalance
	) {
		return;
	}

	setIsStakingUniV2Ppblz(true);
	try {
		let stakeRes = await sendTransaction(
		provider,
		async () =>
			await pepemon.contracts.ppdex.stakeUniV2(
			web3.utils.toWei(uniV2PpblzStakeAmount.toString()),
			{ gasLimit: 200000 }
			)
		);
		if (stakeRes) {
		setIsStakingUniV2Ppblz(false);
		setUniV2PpblzStakeAmount(null);
		await getMyUniV2PpblzStakeAmount();
		await getUniV2PpblzBalance();
		await getUniV2PpblzAllowance();
		await getPpdexRewards();
		}
		return setTransactionFinished(transactionFinished + 1);
	} catch (error) {
		console.log(error);
		await resetToInitialStateOnReject();
	}
	};

	const withdrawPpblz = async () => {
	if (isWithdrawingPpblz || ppblzStakeAmount === 0) {
		return;
	}
	setIsWithdrawingPpblz(true);
	try {
		let unstakeRes = await sendTransaction(
		provider,
		async () =>
			await pepemon.contracts.ppdex.withdrawPpblz(
			web3.utils.toWei(ppblzStakeAmount.toString()),
			{ gasLimit: 200000 }
			)
		);

		if (unstakeRes) {
		setIsWithdrawingPpblz(false);
		setPpblzStakeAmount(null);
		await getMyPpblzStakeAmount();
		await getPpblzBalance();
		await getPpblzAllowance();
		await getPpdexRewards();
		} else {
		setIsWithdrawingPpblz(false);
		}

		return setTransactionFinished(transactionFinished + 1);
	} catch (error) {
		console.log(error);
		await resetToInitialStateOnReject();
	}
	};

	const approvePpblz = async () => {
	if (isApprovingPpblz) {
		return;
	}
	setIsApprovingPpblz(true);

	try {
		let approveStaking = await sendTransaction(
		provider,
		async () =>
			await pepemon.contracts.ppblz.approve(
			pepemon.contracts.ppdex.address,
			web3.utils.toWei(totalPpblzSupply.toString())
			)
		);

		await getPpblzAllowance();

		if (approveStaking) {
		setIsApprovingPpblz(false);
		setIsApprovedPpblz(true);
		}

		return setTransactionFinished(transactionFinished + 1);
	} catch (error) {
		console.log(error);
		await resetToInitialStateOnReject();
	}
	};

	const approveUniV2Ppblz = async () => {
	if (isApprovingUniV2Ppblz) {
		return;
	}
	setIsApprovingUniV2Ppblz(true);

	try {
		let approveStaking = await sendTransaction(
		provider,
		async () =>
			await pepemon.contracts.uniV2_ppblz.approve(
			pepemon.contracts.ppdex.address,
			web3.utils.toWei(totalUniV2PpblzSupply.toString())
			)
		);
		await getUniV2PpblzAllowance();

		if (approveStaking) {
		setIsApprovingUniV2Ppblz(false);
		setIsApprovedUniV2Ppblz(true);
		}

		return setTransactionFinished(transactionFinished + 1);
	} catch (error) {
		console.log(error);
		await resetToInitialStateOnReject();
	}
	};

	const cleanNumberInput = (value: string, maxDecimals: number) => {
	if (value[0] === "0" && value[1] && value[1] !== ".") {
		return value[1];
	}
	if (value.slice(-2) === "..") {
		return value.slice(0, -1);
	}
	if (
		value.split(".").length > 1 &&
		value.split(".")[1].length > maxDecimals
	) {
		return `${value.split(".")[0]}.${value
		.split(".")[1]
		.slice(0, maxDecimals)}`;
	}
	return value;
	};

	const isInvalidInput = (value: string) =>
	!Number(value) &&
	value !== "" &&
	parseFloat(value) !== 0 &&
	value.slice(-1) !== "." &&
	value.slice(-2) !== ".0";
	/** setters & modifiers */
	const updatePpblzStakingInput = (e: any) => {
	if (isInvalidInput(e.target.value)) {
		return;
	}
	setPpblzStakeAmount(cleanNumberInput(e.target.value, 18));
	};

	const updateUniV2PpblzStakingInput = (e: any) => {
	if (isInvalidInput(e.target.value)) {
		return;
	}
	setUniV2PpblzStakeAmount(cleanNumberInput(e.target.value, 18));
	};

	const setPpblzInputField = () => {
	if (ppblzStakeAmount !== null) {
		return ppblzStakeAmount;
	} else {
		return "";
	}
	};

	const setUniV2PpblzInputField = () => {
	if (uniV2PpblzStakeAmount !== null) {
		return uniV2PpblzStakeAmount;
	} else {
		return "";
	}
	};

	const setMaxPpblz = () => {
	if (parseFloat(ppblzBalance.toString()) === 0) {
		console.log("set max", ppblzStakedAmount);

		return setPpblzStakeAmount(ppblzStakedAmount);
	}
	if (parseFloat(ppblzStakedAmount.toString()) === 0) {
		console.log("set max", ppblzBalance);

		return setPpblzStakeAmount(ppblzBalance);
	}
	if (ppblzBalance === ppblzStakeAmount) {
		console.log("set max", ppblzStakedAmount);

		return setPpblzStakeAmount(ppblzStakedAmount);
	}
	return setPpblzStakeAmount(ppblzBalance);
	};

	const setMaxUniV2Ppblz = () => {
	if (parseFloat(uniV2PpblzBalance.toString()) === 0) {
		return setUniV2PpblzStakeAmount(uniV2PpblzStakedAmount);
	}
	if (parseFloat(uniV2PpblzStakedAmount.toString()) === 0) {
		return setUniV2PpblzStakeAmount(uniV2PpblzBalance);
	}
	if (uniV2PpblzBalance === uniV2PpblzStakeAmount) {
		return setUniV2PpblzStakeAmount(uniV2PpblzStakedAmount);
	}
	return setUniV2PpblzStakeAmount(uniV2PpblzBalance);
	};

	const claimRewards = async () => {
	if (isClaiming) {
		return;
	}

	if (ppdexRewards > 0) {
		setIsClaiming(true);
		try {
		await sendTransaction(
			provider,
			async () => await pepemon.contracts.ppdex.getReward()
		);

		await getPpdexRewards();
		setTransactionFinished(transactionFinished + 1);
		} catch (error) {
		console.log(error);
		await resetToInitialStateOnReject();
		}
	}
	setIsClaiming(false);
	};

	useEffect(() => {
		if (!pepemon || !pepemon.contracts) {
			return;
		}
		if (account) {
			correctChainIsLoaded(pepemon).then((correct) => {
			if (!correct) {
				return;
			}
			try {
				getPpblzAllowance();
				getPpblzSupply();
				getPpblzBalance();
				getMyPpblzStakeAmount();
				getUniV2PpblzAllowance();
				getUniV2PpblzSupply();
				getUniV2PpblzBalance();
				getMyUniV2PpblzStakeAmount();
				getPpdexBalance();
				getPpdexRewards();
				getUniV2PpblzBalance();
				getUniV2PpblzSupply();
				setIsApprovedPpblz(false);
				setIsApprovedUniV2Ppblz(false);
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
				);
				console.error(error);
			}
			});
		}
	}, [account, pepemon, provider, transactionFinished, getMyPpblzStakeAmount, getMyUniV2PpblzStakeAmount, getPpblzAllowance,
		getPpblzBalance, getUniV2PpblzBalance, getPpdexBalance, getPpblzSupply, getUniV2PpblzSupply, getPpdexRewards, getUniV2PpblzAllowance]);

	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Staking</StyledPageTitle>

				<StakeGrid>
					<StakeGridArea area="ppblz">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img loading="lazy" src={pokeball} alt="Pokeball"/>
								<Spacer size="sm"/>
								<StyledTitle as="h2" size="1.125rem" color={theme.color.white} font={theme.font.neometric}>Stake PPBLZ</StyledTitle>
							</StakeGridAreaHeaderTitle>
							<StakeGridAreaHeaderMeta>
								<span>{parseFloat(ppdexBalance.toString()).toFixed(2)}% APY</span>
								<img loading="lazy" id="Popover1" src={ibutton} alt="logo"/>
								<Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
									<IbuttonPopover onHide={toggle} button={"Buy PPBLZ"} />
								</Popover>
							</StakeGridAreaHeaderMeta>
						</StakeGridAreaHeader>
						<StakeGridAreaBody>
							<DataColumns>
								<DataColumn>
									<StyledText as="p" font={theme.font.inter}>PPBLZ balance</StyledText>
									<Spacer size="sm"/>
									<StyledText as="p" font={theme.font.neometric} weight={900} size="2rem">{parseFloat(ppblzBalance.toString()).toFixed(2)}</StyledText>
								</DataColumn>
								<DataColumn>
									<StyledText as="p" font={theme.font.inter}>PPBLZ staked</StyledText>
									<Spacer size="sm"/>
									<StyledText as="p" font={theme.font.neometric} weight={900} size="2rem">{parseFloat(ppblzStakedAmount.toString()).toFixed(2)}</StyledText>
								</DataColumn>
							</DataColumns>
							<div style={{ marginTop: "auto" }}>
								{(!isApprovedPpblz && !isApprovingPpblz) &&
									<StyledButton onClick={approvePpblz} borderless width="100%">Enable</StyledButton>
								}

								{isApprovedPpblz && !ppblzStakeAdd && !ppblzStakeSub ? (
									<ContentCentered
										style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										}}
									>
										{ppblzStakedAmount !== 0 ? (
											<Button onClick={() => {
												setPpblzStakeSub(true);
												setPpblzStakeAdd(false);
											}} borderless width="20%">-</Button>
										) : (
											<Button disabled bg={theme.color.purple[400]} color={theme.color.purple[500]} width="20%" borderless>-</Button>
										)}
										{ppblzBalance !== 0 ? (
											<StyledButton onClick={() => {
												setPpblzStakeSub(false);
												setPpblzStakeAdd(true);
											}} borderless width="80%">+</StyledButton>
										) : (
											<Button disabled bg={theme.color.purple[400]} color={theme.color.purple[500]} width="80%" borderless>+</Button>
										)}
									</ContentCentered>
								) : null}
								{isApprovingPpblz && !ppblzStakeAdd && !ppblzStakeSub ? (
									<StyledButton borderless width="100%">ENABLING...</StyledButton>
								) : null}

								{isApprovedPpblz &&
								ppblzStakeAdd &&
								!ppblzStakeSub &&
								!isWithdrawingPpblz &&
								!isStakingPpblz ? (
									<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
										<StyledInput
											placeholder="0.00"
											value={setPpblzInputField() || ""}
											onChange={(event) =>
												updatePpblzStakingInput(event)
											}
											min="0.00"
											step="1"
											autoFocus={true} />
										<LinkButton onClick={setMaxPpblz}>Max</LinkButton>
										<StyledButton onClick={stakePpblz} borderless>Stake</StyledButton>
									</ContentCentered>
								) : null}
								{isApprovedPpblz &&
								ppblzStakeSub &&
								!ppblzStakeAdd &&
								!isWithdrawingPpblz &&
								!isStakingPpblz ? (
									<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
										<StyledInput
											placeholder="0.00"
											value={setPpblzInputField() || ""}
											onChange={(event) =>
												updatePpblzStakingInput(event)
											}
											min="0.00"
											step="1"
											autoFocus={true} />
										<LinkButton onClick={setMaxPpblz}>Max</LinkButton>
										<StyledButton onClick={withdrawPpblz} borderless>Withdraw</StyledButton>
									</ContentCentered>
								) : null}
								{ (isStakingPpblz || isWithdrawingPpblz) &&
									<StyledButton onClick={approvePpblz} borderless width="100%">
										{isStakingPpblz && "Staking"}
										{isWithdrawingPpblz &&  "Withdrawing"}
									...</StyledButton>
								}
							</div>
						</StakeGridAreaBody>
					</StakeGridArea>
					<StakeGridArea area="pplbzEthLp">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img loading="lazy" src={pokeball} alt="Pokeball"/>
								<Spacer size="sm"/>
								<StyledTitle as="h2" size="1.125rem" color={theme.color.white} font={theme.font.neometric}>Stake PPBLZ-ETH LP</StyledTitle>
							</StakeGridAreaHeaderTitle>
							<StakeGridAreaHeaderMeta>
								<span className="StakeGridAreaHeader-number">87% APY</span>
								<img loading="lazy" id="Popover2" src={ibutton} alt="logo"
								/>
								<Popover placement="bottom" isOpen={popoverOpen2} target="Popover2" toggle={toggle2}>
									<IbuttonPopover onHide={toggle2} button={"Buy PPBLZ-ETH"}/>
								</Popover>
							</StakeGridAreaHeaderMeta>
						</StakeGridAreaHeader>
						<StakeGridAreaBody>
							<DataColumns>
								<DataColumn>
									<StyledText as="p" font={theme.font.inter}>PPBLZ-ETH balance</StyledText>
									<Spacer size="sm"/>
									<StyledText as="p" font={theme.font.neometric} weight={900} size="2rem">{parseFloat(uniV2PpblzBalance.toString()).toFixed(2)}</StyledText>
								</DataColumn>
								<DataColumn>
									<StyledText as="p" font={theme.font.inter}>PPBLZ-ETH staked</StyledText>
									<Spacer size="sm"/>
									<StyledText as="p" font={theme.font.neometric} weight={900} size="2rem">{parseFloat(uniV2PpblzStakedAmount.toString()).toFixed(2)}</StyledText>
								</DataColumn>
							</DataColumns>
							<div style={{ marginTop: "auto" }}>
								{(!isApprovedUniV2Ppblz || uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount)) &&
									<StyledButton onClick={approveUniV2Ppblz} borderless width="100%">{!isApprovingUniV2Ppblz ? "Enable" : "Enabling..."}</StyledButton>
								}
								{isApprovedUniV2Ppblz &&
									<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
										<StyledInput
											placeholder="0.00"
											value={setUniV2PpblzInputField() || ""}
											onChange={(event) =>
												updateUniV2PpblzStakingInput(event)
											}
											min="0.00" autoFocus={true} />
										<LinkButton onClick={setMaxUniV2Ppblz} >Max</LinkButton>
										<StyledButton onClick={stakeUniV2Ppblz} borderless>Stake</StyledButton>
									</ContentCentered>
								}
							</div>
						</StakeGridAreaBody>
					</StakeGridArea>
					<StakeGridArea area="ppdexEarned">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img loading="lazy" src={pokeball} alt="Pokeball"/>
								<Spacer size="sm"/>
								<StyledTitle as="h2" size="1.125rem" color={theme.color.white} font={theme.font.neometric}>PPDEX Earned</StyledTitle>
							</StakeGridAreaHeaderTitle>
						</StakeGridAreaHeader>
						<StakeGridAreaBody>
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
								<StyledText as="p" font={theme.font.neometric} weight={900} size="2rem">
									{parseFloat(ppdexBalance.toString()).toFixed(2)} PPDEX
								</StyledText>

								<div style={{ display: "flex" }}>
									<StyledText as="p" font={theme.font.inter}>
										Total value: $
										{parseFloat((ppdexRewards * 0.9).toString()).toFixed(4)}
									</StyledText>
									<Spacer size="md"/>
									<StyledText as="p" font={theme.font.inter} color={theme.color.purple[600]} txtDecoration="underline">
										{isUpdatingRewards ? "UPDATING..." : "UPDATE"}
									</StyledText>
								</div>

								<Spacer size="md"/>

								<>
									{ppblzStakedAmount > 0 ? (
										<div>
											{ppdexRewards > 0.001 ? (
												<Button onClick={claimRewards} bg={theme.color.purple[400]} color={theme.color.purple[500]} width="50%" borderless>{isClaiming ? "CLAIMING..." : "CLAIM"}</Button>
											) : (
												<Button disabled bg={theme.color.purple[400]} color={theme.color.purple[500]} width="50%" borderless>CLAIM</Button>
											)}
										</div>
									) : (
										<Button disabled bg={theme.color.purple[400]} color={theme.color.purple[500]} width="50%" borderless>STAKE FIRST</Button>
									)}
								</>
							</div>
						</StakeGridAreaBody>
					</StakeGridArea>
				</StakeGrid>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	);
};

const StakeGrid = styled.section`
	display: grid;
	grid-column-gap: 1.25em;
	grid-row-gap: 1em;
	grid-template-areas: "ppblz pplbzEthLp" "ppdexEarned ppdexEarned";
	grid-auto-columns: 1fr;
`

const StakeGridArea = styled.div<{area: string}>`
	background-color: ${props => props.theme.color.purple[800]};
	border-radius: ${props => props.theme.borderRadius}px;
	display: flex;
	flex-direction: column;
	grid-area: ${props => props.area};
	min-width: 0px;
	overflow: hidden;
`

const StakeGridAreaHeader = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 1.25em 2em;
`

const StakeGridAreaHeaderTitle = styled.div`
	&{
		display: flex;
		align-items: center;
	}

	img { width: 2.5em; }
`

const StakeGridAreaHeaderMeta = styled.div`
	&{
		display: flex;
		align-items: center;
		color: ${props => props.theme.color.white};
		font-family: ${props => props.theme.font.neometric};
		font-size: .75rem;
		font-weight: 900;
	}

	span {
		margin-right: .67em
	}
`

const StakeGridAreaBody = styled.div`
	background-color: ${props => props.theme.color.white};
	display: flex;
	flex-direction: column;
	padding: 1.5em 2em 2em;
	flex: 1 0 auto;
`

const DataColumns = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 1.5em;
`

const DataColumn = styled.div`
	flex: 1 0 auto;
`

const StyledButton = styled(Button)`
	background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${props => props.theme.color.purple[600]});
	box-shadow: 0 4px 10px 0 rgba(121, 121, 121, 0.5);
`

const StyledInput = styled.input`
	border: none;
	font-size: 1rem;
	flex: 1 0 auto;

	&:focus-within {
		outline : none;
	}
`

export default Stake;
