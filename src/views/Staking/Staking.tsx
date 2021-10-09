import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Popover } from "reactstrap";
import { ContentCentered, StyledPageWrapperMain, StyledPageWrapperMainInner, Button, Text, Title, StyledPageTitle, IbuttonPopover, Spacer } from "../../components";
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
								<Title as="h2" size={1.125} color={theme.color.white} font={theme.font.neometric} weight={900}>Stake PPBLZ</Title>
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
									<Text as="p" font={theme.font.inter}>PPBLZ balance</Text>
									<Spacer size="sm"/>
									<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(ppblzBalance.toString()).toFixed(2)}</Text>
								</DataColumn>
								<DataColumn>
									<Text as="p" font={theme.font.inter}>PPBLZ staked</Text>
									<Spacer size="sm"/>
									<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(ppblzStakedAmount.toString()).toFixed(2)}</Text>
								</DataColumn>
							</DataColumns>
							<div style={{ marginTop: "auto" }}>
								{(!isApprovedPpblz && !isApprovingPpblz) &&
									<Button styling="purple" onClick={approvePpblz} width="100%">Enable</Button>
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
											}} width="20%">-</Button>
										) : (
											<Button disabled width="20%">-</Button>
										)}
										<Spacer size="sm"/>
										{ppblzBalance !== 0 ? (
											<Button styling="purple" onClick={() => {
												setPpblzStakeSub(false);
												setPpblzStakeAdd(true);
											}} width="80%">+</Button>
										) : (
											<Button disabled width="80%">+</Button>
										)}
									</ContentCentered>
								) : null}
								{isApprovingPpblz && !ppblzStakeAdd && !ppblzStakeSub ? (
									<Button styling="purple" width="100%">ENABLING...</Button>
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
										<Button styling="link" onClick={setMaxPpblz}>Max</Button>
										<Button styling="purple" onClick={stakePpblz}>Stake</Button>
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
										<Button styling="link" onClick={setMaxPpblz}>Max</Button>
										<Button styling="purple" onClick={withdrawPpblz}>Withdraw</Button>
									</ContentCentered>
								) : null}
								{ (isStakingPpblz || isWithdrawingPpblz) &&
									<Button styling="purple" onClick={approvePpblz} width="100%" {...(isStakingPpblz && {disabled: true})}>
										{isStakingPpblz && "Staking"}
										{isWithdrawingPpblz &&  "Withdrawing"}
									...</Button>
								}
							</div>
						</StakeGridAreaBody>
					</StakeGridArea>
					<StakeGridArea area="pplbzEthLp">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img loading="lazy" src={pokeball} alt="Pokeball"/>
								<Spacer size="sm"/>
								<Title as="h2" size={1.125} color={theme.color.white} font={theme.font.neometric} weight={900}>Stake PPBLZ-ETH LP</Title>
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
									<Text as="p" font={theme.font.inter}>PPBLZ-ETH balance</Text>
									<Spacer size="sm"/>
									<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(uniV2PpblzBalance.toString()).toFixed(2)}</Text>
								</DataColumn>
								<DataColumn>
									<Text as="p" font={theme.font.inter}>PPBLZ-ETH staked</Text>
									<Spacer size="sm"/>
									<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(uniV2PpblzStakedAmount.toString()).toFixed(2)}</Text>
								</DataColumn>
							</DataColumns>
							<div style={{ marginTop: "auto" }}>
								{(!isApprovedUniV2Ppblz || uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount)) &&
									<Button styling="purple" onClick={approveUniV2Ppblz} width="100%">{!isApprovingUniV2Ppblz ? "Enable" : "Enabling..."}</Button>
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
										<Button styling="link" onClick={setMaxUniV2Ppblz} >Max</Button>
										<Button styling="purple" onClick={stakeUniV2Ppblz}>Stake</Button>
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
								<Title as="h2" size={1.125} color={theme.color.white} font={theme.font.neometric} weight={900}>PPDEX Earned</Title>
							</StakeGridAreaHeaderTitle>
						</StakeGridAreaHeader>
						<StakeGridAreaBody>
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
								<Text as="p" font={theme.font.neometric} weight={900} size={2}>
									{parseFloat(ppdexBalance.toString()).toFixed(2)} PPDEX
								</Text>

								<div style={{ display: "flex" }}>
									<Text as="p" font={theme.font.inter}>
										Total value: $
										{parseFloat((ppdexRewards * 0.9).toString()).toFixed(4)}
									</Text>
									<Spacer size="md"/>
									<Text as="p" font={theme.font.inter} color={theme.color.purple[600]} underline>
										{isUpdatingRewards ? "UPDATING..." : "UPDATE"}
									</Text>
								</div>

								<Spacer size="md"/>

								<>
									{ppblzStakedAmount > 0 ? (
										<div>
											{ppdexRewards > 0.001 ? (
												<Button onClick={claimRewards} width="50%">{isClaiming ? "CLAIMING..." : "CLAIM"}</Button>
											) : (
												<Button disabled width="50%">CLAIM</Button>
											)}
										</div>
									) : (
										<Button disabled width="50%">STAKE FIRST</Button>
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

const StyledInput = styled.input`
	border: none;
	font-size: 1rem;
	flex: 1 0 auto;

	&:focus-within {
		outline : none;
	}
`

export default Stake;
