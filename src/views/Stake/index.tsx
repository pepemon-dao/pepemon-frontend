import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Popover } from "reactstrap";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, Button, StyledText, StyledTitle, StyledPageTitle, IbuttonPopover, Spacer } from "../../components";
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
	const getAccount = () => {
	return account;
	};

	let timer: any = null;

	useEffect(() => {
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
	const getPpblzAllowance = async () => {
	// @ts-ignore
	let _ppblzAllowance = await pepemon.contracts.ppblz.allowance(
		getAccount(),
		pepemon.contracts.ppdex.address
	);
	if (_ppblzAllowance > 0) {
		setIsApprovedPpblz(true);
	}
	};

	const getUniV2PpblzAllowance = async () => {
	// @ts-ignore
	let _uniV2PpblzAllowance = await pepemon.contracts.uniV2_ppblz.allowance(
		getAccount(),
		pepemon.contracts.ppdex.address
	);
	setUniV2PpblzAllowance(web3.utils.fromWei(_uniV2PpblzAllowance.toString()));
	if (_uniV2PpblzAllowance > 0) {
		setIsApprovedUniV2Ppblz(true);
	}
	};

	const getPpblzBalance = async () => {
	let _ppblzBalance = await pepemon.contracts.ppblz.balanceOf(getAccount());
	setPpblzBalance(web3.utils.fromWei(_ppblzBalance.toString()));
	};

	const getUniV2PpblzBalance = async () => {
	let _uniV2PpblzBalance = await pepemon.contracts.uniV2_ppblz.balanceOf(
		getAccount()
	);
	setUniV2PpblzBalance(web3.utils.fromWei(_uniV2PpblzBalance.toString()));
	};

	const getPpdexBalance = async () => {
	let _ppdexBalance = await pepemon.contracts.ppdex.balanceOf(getAccount());
	setPpdexBalance(web3.utils.fromWei(_ppdexBalance.toString()));
	};

	const getPpblzSupply = async () => {
	let _ppblzSupply = await pepemon.contracts.ppblz.totalSupply();
	setTotalPpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
	};

	const getUniV2PpblzSupply = async () => {
	let _ppblzSupply = await pepemon.contracts.uniV2_ppblz.totalSupply();
	setTotalUniV2PpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
	};

	const getMyPpblzStakeAmount = async () => {
	let stakeA = await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(
		getAccount()
	);
	setPpblzStakedAmount(web3.utils.fromWei(stakeA.toString()));
	};

	const getMyUniV2PpblzStakeAmount = async () => {
	let stakeA = await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(
		getAccount()
	);
	setUniV2PpblzStakedAmount(web3.utils.fromWei(stakeA.toString()));
	};

	const getPpdexRewards = async () => {
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

	timer = setTimeout(() => {
		setIsUpdatingRewards(false);
		clearTimeout(timer);
	}, 2000);
	};

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
	}, [account, pepemon, provider, transactionFinished]);

	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Staking</StyledPageTitle>

				<StakeGrid>
					<StakeGridArea area="ppblz">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img src={pokeball} alt="Pokeball"/>
								<Spacer size="sm"/>
								<StyledTitle as="h2" size="1.125rem" color={theme.color.white} font={theme.font.neometric}>Stake PPBLZ</StyledTitle>
							</StakeGridAreaHeaderTitle>
							<StakeGridAreaHeaderMeta>
								<span>{parseFloat(ppdexBalance.toString()).toFixed(2)}% APY</span>
								<img id="Popover1" src={ibutton} alt="logo"/>
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
								{!isApprovedPpblz && (
								<div onClick={approvePpblz}>
									{!isApprovingPpblz ? (
									<div>
										<div
										onClick={approvePpblz}
										>
										<StyledButton borderless width="100%">ENABLE</StyledButton>
										</div>
									</div>
									) : null}
								</div>
								)}

								{isApprovedPpblz && !ppblzStakeAdd && !ppblzStakeSub ? (
								<div
									className="enable"
									style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									}}
								>
									<div>
									{ppblzStakedAmount != 0 ? (
										<div
										onClick={() => {
											setPpblzStakeSub(true);
											setPpblzStakeAdd(false);
										}}
										className="minus-act"
										>
										<p className="minus-act-text">-</p>
										</div>
									) : (
										<div className="minus-passive">
										<p className="disable-blue-btn-txt">-</p>
										</div>
									)}
									</div>
									<div>
									{ppblzBalance != 0 ? (
										<div
										onClick={() => {
											setPpblzStakeSub(false);
											setPpblzStakeAdd(true);
										}}
										className="plus-act"
										>
										<p className="minus-act-text">+</p>
										</div>
									) : (
										<div className="plus-passive">
										<p className="disable-blue-btn-txt">+</p>
										</div>
									)}
									</div>
								</div>
								) : null}
								{isApprovingPpblz && !ppblzStakeAdd && !ppblzStakeSub ? (
								<div
									className="blue-button-enable"
									onClick={approvePpblz}
								>
									<p className="bluebutton-text">ENABLING...</p>
								</div>
								) : null}

								{isApprovedPpblz &&
								ppblzStakeAdd &&
								!ppblzStakeSub &&
								!isWithdrawingPpblz &&
								!isStakingPpblz ? (
								<div>
									<div
									className="enable"
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										width: "590px",
										height: "60px",
										borderRadius: "10px",
										border: "solid 1px #220245",
									}}
									>
									<div className="max-contianer">
										<input
										className="input-amount"
										placeholder="0.00"
										value={setPpblzInputField() || ""}
										onChange={(event) =>
											updatePpblzStakingInput(event)
										}
										min="0.00"
										step="1"
										autoFocus={true}
										/>
									</div>
									<div
										style={{
										display: "flex",
										flexDirection: "row",
										}}
									>
										<div className="max-contianer">
										<span className="MAX" onClick={setMaxPpblz}>
											MAX
										</span>
										</div>
										<div className="stake-button-conatiner">
										<div
											onClick={stakePpblz}
											className="blue-button"
										>
											<p className="bluebutton-text">Stake</p>
										</div>
										</div>
									</div>
									</div>
								</div>
								) : null}
								{isApprovedPpblz &&
								ppblzStakeSub &&
								!ppblzStakeAdd &&
								!isWithdrawingPpblz &&
								!isStakingPpblz ? (
								<div>
									<div
									className="enable"
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										width: "590px",
										height: "60px",
										borderRadius: "10px",
										border: "solid 1px #220245",
									}}
									>
									<div className="max-contianer">
										<input
										className="input-amount"
										placeholder="0.00"
										value={setPpblzInputField() || ""}
										onChange={(event) =>
											updatePpblzStakingInput(event)
										}
										min="0.00"
										step="1"
										autoFocus={true}
										/>
									</div>
									<div
										style={{
										display: "flex",
										flexDirection: "row",
										}}
									>
										<div className="max-contianer">
										<span className="MAX" onClick={setMaxPpblz}>
											MAX
										</span>
										</div>
										<div className="stake-button-conatiner">
										<div
											onClick={withdrawPpblz}
											className="blue-button"
										>
											<p className="bluebutton-text">Withdraw</p>
										</div>
										</div>
									</div>
									</div>
								</div>
								) : null}
								{isStakingPpblz ? (
								<div
									className="blue-button-enable"
									onClick={approvePpblz}
								>
									<p className="bluebutton-text">STAKING...</p>
								</div>
								) : null}

								{isWithdrawingPpblz && (
								<div
									className="blue-button-enable"
									onClick={approvePpblz}
								>
									<p className="bluebutton-text">WITHDRAWING...</p>
								</div>
								)}
							</div>
						</StakeGridAreaBody>
					</StakeGridArea>
					<StakeGridArea area="pplbzEthLp">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img src={pokeball} alt="Pokeball"/>
								<Spacer size="sm"/>
								<StyledTitle as="h2" size="1.125rem" color={theme.color.white} font={theme.font.neometric}>Stake PPBLZ-ETH LP</StyledTitle>
							</StakeGridAreaHeaderTitle>
							<StakeGridAreaHeaderMeta>
								<span className="StakeGridAreaHeader-number">87% APY</span>
								<img id="Popover2" src={ibutton} alt="logo"
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
								{!isApprovedUniV2Ppblz ||
								uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount) ? (
								<div
									onClick={approveUniV2Ppblz}
								>
									{!isApprovingUniV2Ppblz ? (
									<StyledButton borderless width="100%">ENABLE</StyledButton>
									) : null}

									{isApprovingUniV2Ppblz ? (
									<p className="bluebutton-text">ENABLING...</p>
									) : null}
								</div>
								) : null}
								{isApprovedUniV2Ppblz ? (
								<div>
									<div
									className="enable"
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										width: "590px",
										height: "60px",
										borderRadius: "10px",
										border: "solid 1px #220245",
									}}
									>
									<div className="max-contianer">
										<input
										className="input-amount"
										placeholder="0.00"
										value={setUniV2PpblzInputField() || ""}
										onChange={(event) =>
											updateUniV2PpblzStakingInput(event)
										}
										min="0.00"
										autoFocus={true}
										/>
									</div>
									<div
										style={{
										display: "flex",
										flexDirection: "row",
										}}
									>
										<div className="max-contianer">
										<span
											className="MAX"
											onClick={setMaxUniV2Ppblz}
										>
											MAX
										</span>
										</div>
										<div className="stake-button-conatiner">
										<div
											onClick={stakeUniV2Ppblz}
											className="blue-button"
										>
											<p className="bluebutton-text">Stake</p>
										</div>
										</div>
									</div>
									</div>
								</div>
								) : null}
							</div>
						</StakeGridAreaBody>
					</StakeGridArea>
					<StakeGridArea area="ppdexEarned">
						<StakeGridAreaHeader>
							<StakeGridAreaHeaderTitle>
								<img src={pokeball} alt="Pokeball"/>
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
											<div
											className="enable-blue-btn"
											onClick={claimRewards}
											>
											<p className="bluebutton-text">
												{isClaiming ? "CLAIMING..." : "CLAIM"}
											</p>
											</div>
										) : (
											<div className="disable-blue-btn">
											<p className="disable-blue-btn-txt">CLAIM</p>
											</div>
										)}
										</div>
									) : (
										<Button disabled bg={theme.color.purple[400]} color={theme.color.purple[500]} width="100%" borderless>STAKE FIRST</Button>
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

export default Stake;
