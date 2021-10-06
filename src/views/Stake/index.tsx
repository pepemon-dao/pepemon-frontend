import React, { useState, useEffect } from "react";
import { Popover } from "reactstrap";
import enable from "../../assets/enable.png";
import ibutton from "../../assets/i.svg";

import pokeball from "../../assets/pokeball-temp.png";
import minus from "../../assets/minus.png";
import plus from "../../assets/plus.png";

import provideliquiditybutton from "../../assets/provideliquiditybutton.png";
import { IbuttonPopover, TopBar } from "../../components";
import ppdexIcon from "../../assets/ppdex-icon.png";
import useTokenPrices from "../../hooks/useTokenPrices";
import { getBalanceNumber } from "../../utils/formatBalance";
import BigNumber from "bignumber.js";
import usePepemon from "../../hooks/usePepemon";
import { sendTransaction } from "../../pepemon/utils";
import { correctChainIsLoaded } from "../../utils/network";
import "./Stake.css";
import Web3 from "web3";
import useWeb3Modal from "../../hooks/useWeb3Modal";

interface Stake {
  pepemon: any;
  web3: any;
}

const Stake: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverOpen2, setPopoverOpen2] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const toggle2 = () => setPopoverOpen2(!popoverOpen2);
  const pepemon = usePepemon();
  const [provider, onPresentWalletProviderModal, logoutOfWeb3Modal] =
    useWeb3Modal();
  const [providerChainId, setProviderChainId] = useState(
    (window.ethereum && parseInt(window.ethereum.chainId)) || 1
  );

  const web3: any = new Web3(provider);
  //TODO: implement proper state / context management
  const [loaded, setLoaded] = useState(false);
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
  const [isWithdrawingUniV2Ppblz, setIsWithdrawingUniV2Ppblz] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isUpdatingRewards, setIsUpdatingRewards] = useState(false);
  const [ppdexRewards, setPpdexRewards] = useState(0);
  const [totalPpblzSupply, setTotalPpblzSupply] = useState(0);
  const [totalUniV2PpblzSupply, setTotalUniV2PpblzSupply] = useState(0);
  const [ppblzAllowance, setPpblzAllowance] = useState();
  const [uniV2PpblAllowance, setUniV2PpblzAllowance] = useState(0);
  const [ppblzBalance, setPpblzBalance] = useState(0);
  const [uniV2PpblzBalance, setUniV2PpblzBalance] = useState(0);
  const [ppdexBalance, setPpdexBalance] = useState(0);
  const [transactionFinished, setTransactionFinished] = useState(0);

  const { account } = usePepemon();
  const getAccount = () => {
    return account;
  };

  const { ppblzPrice, ppdexPrice } = useTokenPrices();
  const calculateApy = () => {
    const rewardedPerYear = ppdexPrice * 20;
    return (rewardedPerYear * 100) / ppblzPrice;
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
    setIsWithdrawingUniV2Ppblz(false);
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
    setPpblzAllowance(web3.utils.fromWei(_ppblzAllowance.toString()));
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

  const withdrawUniV2Ppblz = async () => {
    if (isWithdrawingUniV2Ppblz || uniV2PpblzStakeAmount === 0) {
      return;
    }
    setIsWithdrawingUniV2Ppblz(true);
    try {
      let unstakeRes = await sendTransaction(
        provider,
        async () =>
          await pepemon.contracts.ppdex.withdrawUniV2(
            web3.utils.toWei(uniV2PpblzStakeAmount.toString()),
            { gasLimit: 200000 }
          )
      );

      if (unstakeRes) {
        setIsWithdrawingUniV2Ppblz(false);
        setUniV2PpblzStakeAmount(null);
        await getMyUniV2PpblzStakeAmount();
        await getUniV2PpblzBalance();
        await getUniV2PpblzAllowance();
        await getPpdexRewards();
      } else {
        setIsWithdrawingUniV2Ppblz(false);
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

  const shouldClaimFirst = (asset: string) => {
    if (asset === "UNIV2") {
      return (
        parseFloat(uniV2PpblzStakedAmount.toString()) === 0 &&
        parseFloat(ppblzStakedAmount.toString()) > 0 &&
        parseFloat(ppdexRewards.toString()) > 0.1
      );
    }
    if (asset === "PPBLZ") {
      return (
        parseFloat(ppblzStakedAmount.toString()) === 0 &&
        parseFloat(uniV2PpblzBalance.toString()) > 0 &&
        parseFloat(ppdexRewards.toString()) > 0.1
      );
    }
    return false;
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

          setLoaded(true);
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
    <div className="main-container">

      <div className="container-wrap">
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <div className="main-container">
            <div className="stake-cont">
              <div style={{ marginTop: "59px",marginLeft:"20px" }}>
                <span className="Title">Staking</span>
              </div>
              <div className="row-box">
                <div className="stake-box-sm">
                  <div className="stake-box-sm-header">
                    <img src={pokeball} alt="logo" style={{ width: "10%" }} />

                    <span className="header-text">Stake PPBLZ</span>
                    <span className="header-number">
                      {parseFloat(ppdexBalance.toString()).toFixed(2)}% APY
                    </span>
                    <img
                      id="Popover1"
                      //  type="button"
                      src={ibutton}
                      alt="logo"
                    />
                    <Popover
                      placement="bottom"
                      isOpen={popoverOpen}
                      target="Popover1"
                      toggle={toggle}
                    >
                      <IbuttonPopover onHide={toggle} button={"Buy PPBLZ"} />
                    </Popover>
                  </div>
                  <div className="stake-box-sm-body">
                    <div className="stake-box-sm-body-row">
                      <div className="data-div">
                        <span className="data-div-bold-text">
                          PPBLZ balance
                        </span>
                        <span className="text-number">
                          {parseFloat(ppblzBalance.toString()).toFixed(2)}
                        </span>
                      </div>
                      <div className="data-div">
                        <span className="data-div-bold-text">PPBLZ staked</span>
                        <span className="text-number">
                          {parseFloat(ppblzStakedAmount.toString()).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginTop: "32px" }}>
                      {!isApprovedPpblz && (
                        <div onClick={approvePpblz}>
                          {!isApprovingPpblz ? (
                            <div>
                              <div
                                className="blue-button-enable"
                                onClick={approvePpblz}
                              >
                                <p className="bluebutton-text">ENABLE</p>
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

                      {isWithdrawingPpblz ? (
                        <div
                          className="blue-button-enable"
                          onClick={approvePpblz}
                        >
                          <p className="bluebutton-text">WITHDRAWING...</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="stake-box-sm">
                  <div className="stake-box-sm-header">
                    <img src={pokeball} alt="logo" style={{ width: "10%" }} />
                    <span className="header-text">Stake PPBLZ-ETH LP</span>
                    <span className="header-number">87% APY</span>
                    <img
                      id="Popover2"
                      //  type="button"

                      src={ibutton}
                      alt="logo"
                    />
                    <Popover
                      placement="bottom"
                      isOpen={popoverOpen2}
                      target="Popover2"
                      toggle={toggle2}
                    >
                      <IbuttonPopover
                        onHide={toggle2}
                        button={"Buy PPBLZ-ETH"}
                      />
                    </Popover>
                  </div>
                  <div className="stake-box-sm-body">
                    <div className="stake-box-sm-body-row">
                      <div className="data-div">
                        <span className="data-div-bold-text">
                          PPBLZ-ETH balance
                        </span>
                        <span className="text-number">
                          {parseFloat(uniV2PpblzBalance.toString()).toFixed(2)}
                        </span>
                      </div>
                      <div className="data-div">
                        <span className="data-div-bold-text">
                          PPBLZ-ETH staked
                        </span>
                        <span className="text-number">
                          {parseFloat(
                            uniV2PpblzStakedAmount.toString()
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginTop: "32px" }}>
                      {!isApprovedUniV2Ppblz ||
                      uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount) ? (
                        <div
                          className="blue-button-enable"
                          onClick={approveUniV2Ppblz}
                        >
                          {!isApprovingUniV2Ppblz ? (
                            <p className="bluebutton-text">ENABLE</p>
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
                  </div>
                </div>
              </div>
              <div className="stake-box-big">
                <div className="stake-box-big-header">
                  <img src={pokeball} alt="logo" style={{ width: "5%" }} />

                  <span className="header-text">PPDEX Earned</span>
                </div>
                <div className="stake-box-big-body">
                  <div style={{ marginTop: "40px" }}>
                    <span className="text-number" style={{ marginLeft: "0" }}>
                      {parseFloat(ppdexBalance.toString()).toFixed(2)} PPDEX
                    </span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p className="data-div-bold-text-big">
                      Total value: $
                      {parseFloat((ppdexRewards * 0.9).toString()).toFixed(4)}
                    </p>
                    <p className="Update" onClick={getPpdexRewards}>
                      {isUpdatingRewards ? "UPDATING..." : "UPDATE"}
                    </p>
                  </div>

                  <div style={{ marginTop: "20px" }}>
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
                      <div className="disable-blue-btn">
                        <p className="disable-blue-btn-txt">STAKE FIRST</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ height: "200px" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
