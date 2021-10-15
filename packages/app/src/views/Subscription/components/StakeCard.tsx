import React, {useCallback, useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import { Card, CardContent, CardIcon, Spacer, Button } from '../../../components';
import { useTokenPrices, usePepemon } from '../../../hooks';
import { correctChainIsLoaded } from '../../../utils';
import StakeLotteryCard from './StakeLottery';
import {sendTransaction} from '../../../pepemon/utils';

interface StakeCardProps {
    pepemon: any,
    web3: any,
}

const StakeCard: React.FC<StakeCardProps> = ({ pepemon, web3 }) => {
    //TODO: implement proper state / context management
    const [ppblzStakeAmount, setPpblzStakeAmount] = useState(null)
    const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0)
    const [uniV2PpblzStakeAmount, setUniV2PpblzStakeAmount] = useState(null)
    const [uniV2PpblzStakedAmount, setUniV2PpblzStakedAmount] = useState(0)
    const [isApprovedPpblz, setIsApprovedPpblz] = useState(false)
    const [isApprovingPpblz, setIsApprovingPpblz] = useState(false)
    const [isApprovedUniV2Ppblz, setIsApprovedUniV2Ppblz] = useState(false)
    const [isApprovingUniV2Ppblz, setIsApprovingUniV2Ppblz] = useState(false)
    const [isStakingPpblz, setIsStakingPpblz] = useState(false)
    const [isWithdrawingPpblz, setIsWithdrawingPpblz] = useState(false)
    const [isStakingUniV2Ppblz, setIsStakingUniV2Ppblz] = useState(false)
    const [isWithdrawingUniV2Ppblz, setIsWithdrawingUniV2Ppblz] = useState(false)
    const [isClaiming, setIsClaiming] = useState(false)
    const [isUpdatingRewards, setIsUpdatingRewards] = useState(false)
    const [ppdexRewards, setPpdexRewards] = useState(0)
    const [totalPpblzSupply, setTotalPpblzSupply] = useState(0)
    const [totalUniV2PpblzSupply, setTotalUniV2PpblzSupply] = useState(0)
    const [ppblzAllowance, setPpblzAllowance] = useState(0)
    const [uniV2PpblAllowance, setUniV2PpblzAllowance] = useState(0)
    const [ppblzBalance, setPpblzBalance] = useState(0)
    const [uniV2PpblzBalance, setUniV2PpblzBalance] = useState(0)
    const [ppdexBalance, setPpdexBalance] = useState(0)
    const [transactionFinished, setTransactionFinished] = useState(0);

    const { provider, account } = usePepemon()
    const getAccount = useCallback(() => {
        return account
    }, [account])

    const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const calculateApy = () => {
        const rewardedPerYear = ppdexPrice * 20;
        return (rewardedPerYear * 100) / ppblzPrice;
    }

    let timer: any = useRef(null);

    useEffect(() => {
        return () => timer && clearTimeout(timer);
    }, [timer])

    const resetToInitialStateOnReject = async () => {
        setIsStakingPpblz(false);
        setIsApprovingPpblz(false);
        setIsWithdrawingPpblz(false);
        setIsStakingUniV2Ppblz(false);
        setIsApprovingUniV2Ppblz(false);
        setIsWithdrawingUniV2Ppblz(false);
        setIsClaiming(false);
    }

    //TODO: move to generic contract service
    /** getters */
    const getPpblzAllowance = useCallback(async () => {
        // @ts-ignore
        let _ppblzAllowance = await pepemon.contracts.ppblz.allowance(getAccount(), pepemon.contracts.ppdex.address);
        setPpblzAllowance(web3.utils.fromWei(_ppblzAllowance.toString()));
        if (_ppblzAllowance > 0 ) {
            setIsApprovedPpblz(true)
        }
    }, [setPpblzAllowance, getAccount, pepemon.contracts.ppblz, pepemon.contracts.ppdex.address, web3.utils])

    const getUniV2PpblzAllowance = useCallback( async () => {
        // @ts-ignore
        let _uniV2PpblzAllowance = await pepemon.contracts.uniV2_ppblz.allowance(getAccount(), pepemon.contracts.ppdex.address);
        setUniV2PpblzAllowance(web3.utils.fromWei(_uniV2PpblzAllowance.toString()));
        if (_uniV2PpblzAllowance > 0 ) {
            setIsApprovedUniV2Ppblz(true)
        }
    }, [pepemon.contracts.uniV2_ppblz, pepemon.contracts.ppdex.address, setUniV2PpblzAllowance, setIsApprovedUniV2Ppblz, getAccount, web3.utils])

    const getPpblzBalance = useCallback( async () => {
        let _ppblzBalance = await pepemon.contracts.ppblz.balanceOf(getAccount());
        setPpblzBalance(web3.utils.fromWei(_ppblzBalance.toString()));
    }, [pepemon.contracts.ppblz, setPpblzBalance, web3.utils, getAccount])

    const getUniV2PpblzBalance = useCallback( async () => {
        let _uniV2PpblzBalance = await pepemon.contracts.uniV2_ppblz.balanceOf(getAccount());
        setUniV2PpblzBalance(web3.utils.fromWei(_uniV2PpblzBalance.toString()));
    }, [pepemon.contracts.uniV2_ppblz, setUniV2PpblzBalance, getAccount, web3.utils])

    const getPpdexBalance = useCallback( async () => {
        let _ppdexBalance = await pepemon.contracts.ppdex.balanceOf(getAccount());
        setPpdexBalance(web3.utils.fromWei(_ppdexBalance.toString()));
    }, [pepemon.contracts.ppdex, setPpdexBalance, getAccount, web3.utils])

    const getPpblzSupply = useCallback( async () => {
        let _ppblzSupply = await pepemon.contracts.ppblz.totalSupply();
        setTotalPpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
    }, [pepemon.contracts.ppblz, setTotalPpblzSupply, web3.utils])

    const getUniV2PpblzSupply = useCallback( async () => {
        let _ppblzSupply = await pepemon.contracts.uniV2_ppblz.totalSupply();
        setTotalUniV2PpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
    }, [pepemon.contracts.uniV2_ppblz, setTotalUniV2PpblzSupply, web3.utils])

    const getMyPpblzStakeAmount = useCallback( async () => {
        let stakeA = await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount());
        setPpblzStakedAmount((web3.utils.fromWei(stakeA.toString())));
    }, [pepemon.contracts.ppdex, setPpblzStakedAmount, getAccount, web3.utils])

    const getMyUniV2PpblzStakeAmount = useCallback( async () => {
        let stakeA = await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount());
        setUniV2PpblzStakedAmount((web3.utils.fromWei(stakeA.toString())));
    }, [pepemon.contracts.ppdex, setUniV2PpblzStakedAmount, getAccount, web3.utils])

    const getPpdexRewards = useCallback( async () => {
        setIsUpdatingRewards(true);
        let cRewards = (await pepemon.contracts.ppdex.myRewardsBalance(getAccount())).toString();
        const ppblzStaked = (await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount())).toString();
        const uniV2Staked = (await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount())).toString();

        // Faulty myRewardsBalance edge case.. dont use view but recalculate!
        if (ppblzStaked > 0 && uniV2Staked > 0) {
            const lastRewardBlock = await pepemon.contracts.ppdex.getLastBlockCheckedNum(getAccount());
            const currentBlock = await pepemon.contracts.ppdex.getBlockNum();
            const liquidityMultiplier = await pepemon.contracts.ppdex.getLiquidityMultiplier();
            const rewardsVar = 100000;

            const ppblzRewardBalance = ppblzStaked * (currentBlock - lastRewardBlock) / rewardsVar;
            const uniV2RewardsBalance = uniV2Staked * ((currentBlock - lastRewardBlock) * liquidityMultiplier) / rewardsVar;
            const originalReward = cRewards - (ppblzRewardBalance + uniV2RewardsBalance);

            if (originalReward > 10000) {
                const realReward = ((cRewards - (ppblzRewardBalance + uniV2RewardsBalance)) / 2) + (ppblzRewardBalance + uniV2RewardsBalance);
                cRewards = realReward.toString();
            }
        }
        setPpdexRewards(web3.utils.fromWei(cRewards));

        setTimeout(() => {
            setIsUpdatingRewards(false);
            clearTimeout(timer);
        }, 2000);
    }, [getAccount, pepemon.contracts.ppdex, web3.utils])

    const stakePpblz = async () => {
        if ((isStakingPpblz || parseFloat(ppblzStakeAmount) === 0) || (parseFloat(ppblzStakeAmount) > ppblzBalance)) {
            return;
        }

        setIsStakingPpblz(true);
        try {
            let stakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.stakePpblz(web3.utils.toWei(ppblzStakeAmount.toString()), { gasLimit: 200000 }));
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
    }

    const stakeUniV2Ppblz = async () => {
        if ((isStakingUniV2Ppblz || parseFloat(uniV2PpblzStakeAmount) === 0) || (parseFloat(uniV2PpblzStakeAmount) > uniV2PpblzBalance)) {
            return;
        }

        setIsStakingUniV2Ppblz(true);
        try {
            let stakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.stakeUniV2(web3.utils.toWei(uniV2PpblzStakeAmount.toString()), { gasLimit: 200000 }))
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
    }

    const withdrawPpblz = async () => {
        if (isWithdrawingPpblz || ppblzStakeAmount === 0) {
            return;
        }
        setIsWithdrawingPpblz(true);
        try {
            let unstakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.withdrawPpblz(web3.utils.toWei(ppblzStakeAmount.toString()), { gasLimit: 200000 }))

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
    }

    const withdrawUniV2Ppblz = async () => {
        if (isWithdrawingUniV2Ppblz || uniV2PpblzStakeAmount === 0) {
            return;
        }
        setIsWithdrawingUniV2Ppblz(true);
        try {
            let unstakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.withdrawUniV2(web3.utils.toWei(uniV2PpblzStakeAmount.toString()), { gasLimit: 200000 }))

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
    }

    const approvePpblz = async () => {
        if (isApprovingPpblz) {
            return;
        }
        setIsApprovingPpblz(true);

        try {
            let approveStaking = await sendTransaction(provider, async () => await pepemon.contracts.ppblz.approve(
                pepemon.contracts.ppdex.address,
                web3.utils.toWei(totalPpblzSupply.toString())
            ))

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
    }

    const approveUniV2Ppblz = async () => {
        if (isApprovingUniV2Ppblz) {
            return;
        }
        setIsApprovingUniV2Ppblz(true);

        try {
            let approveStaking = await sendTransaction(provider, async () => await pepemon.contracts.uniV2_ppblz.approve(
                pepemon.contracts.ppdex.address,
                web3.utils.toWei(totalUniV2PpblzSupply.toString())
            ));
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
    }

    const cleanNumberInput = (value: string, maxDecimals: number) => {
        if (value[0] === '0' && (value[1] && value[1] !== '.')) {
            return value[1]
        }
        if (value.slice(-2) === '..') {
            return value.slice(0, -1);
        }
        if (value.split('.').length > 1 && value.split('.')[1].length > maxDecimals) {
            return `${value.split('.')[0]}.${value.split('.')[1].slice(0, maxDecimals)}`
        }
        return value;
    }

    const isInvalidInput = (value: string) =>
        !Number(value) &&
        value !== '' &&
        parseFloat(value) !== 0 &&
        value.slice(-1) !== '.' &&
        (value.slice(-2) !== '.0')
    ;

    /** setters & modifiers */
    const updatePpblzStakingInput = (e: any) => {
        if (isInvalidInput(e.target.value)) {
            return;
        }
        setPpblzStakeAmount(cleanNumberInput(e.target.value, 18));
    }

    const updateUniV2PpblzStakingInput = (e: any) => {
        if (isInvalidInput(e.target.value)) {
            return;
        }
        setUniV2PpblzStakeAmount(cleanNumberInput(e.target.value, 18));
    }

    const setPpblzInputField = () => {
        if (ppblzStakeAmount !== null) {
            return ppblzStakeAmount;
        } else {
            return '';
        }
    }

    const setUniV2PpblzInputField = () => {
        if (uniV2PpblzStakeAmount !== null) {
            return uniV2PpblzStakeAmount;
        } else {
            return '';
        }
    }

    const setMaxPpblz = () => {
        if (parseFloat(ppblzBalance.toString()) === 0) {
            return setPpblzStakeAmount(ppblzStakedAmount);
        }
        if (parseFloat(ppblzStakedAmount.toString()) === 0) {
            return setPpblzStakeAmount(ppblzBalance);
        }
        if (ppblzBalance === ppblzStakeAmount) {
            return setPpblzStakeAmount(ppblzStakedAmount);
        }
        return setPpblzStakeAmount(ppblzBalance);
    }

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
    }

    const claimRewards = async () => {
        if(isClaiming) {
            return;
        }

        if(ppdexRewards > 0) {
            setIsClaiming(true);
            try {
                await sendTransaction(provider, async () => await pepemon.contracts.ppdex.getReward());

                await getPpdexRewards();
                setTransactionFinished(transactionFinished + 1);
            } catch (error) {
                console.log(error);
                await resetToInitialStateOnReject();
            }
        }
        setIsClaiming(false);
    }

    const shouldClaimFirst = (asset: string) => {
        if (asset === 'UNIV2') {
            return (parseFloat(uniV2PpblzStakedAmount.toString()) === 0 && parseFloat(ppblzStakedAmount.toString()) > 0) &&
                parseFloat(ppdexRewards.toString()) > 0.1
        }
        if (asset === 'PPBLZ') {
            return (parseFloat(ppblzStakedAmount.toString()) === 0 && parseFloat(uniV2PpblzBalance.toString()) > 0) &&
                parseFloat(ppdexRewards.toString()) > 0.1;
        }
        return false;
    }

    useEffect(() => {
        if (!pepemon || !pepemon.contracts) {
            return;
        }
        correctChainIsLoaded(pepemon).then(correct => {
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
                    `Failed to load web3, accounts, or contract. Check console for details.`,
                );
                console.error(error);
            }
        })
    }, [account, pepemon, provider, transactionFinished,
		getMyPpblzStakeAmount, getMyUniV2PpblzStakeAmount, getPpblzAllowance, getPpblzBalance, getPpblzSupply, getPpdexBalance, getPpdexRewards, getUniV2PpblzAllowance, getUniV2PpblzBalance, getUniV2PpblzSupply
	]);

    //TODO: simplify validation
    return (
        <StyledCardWrapper>
            <StyledCards>
                <Card>
                    <CardContent>
                        <StyledSticker variant="apy">
                            <span>APY</span><br/>
                            <span style={{fontSize: '25px'}}>{calculateApy().toFixed(0)} %</span><br/>
                        </StyledSticker>
                        <CardIcon><img alt="placeholder" src={'ppblzIcon'} style={{ height: 42 }}/></CardIcon>
                        <StyledTitle>STAKE PPBLZ</StyledTitle>
                        <StyledDetails>
                            <StyledDetail>PPBLZ balance = {parseFloat(ppblzBalance.toString()).toFixed(4)}</StyledDetail>
                            <StyledDetail>Amount staked = {parseFloat(ppblzStakedAmount.toString()).toFixed(4)}</StyledDetail>
                        </StyledDetails>
                        <Spacer />
                        <StyledButtonsWrapper>
                            <Button size="sm" variant="tertiary" onClick={setMaxPpblz}>SET MAX</Button>
                        </StyledButtonsWrapper>
                        <StyledInputWrapper>
                            <StyledInput
                                placeholder="amount..."
                                value={setPpblzInputField() || ''}
                                onChange={(event) => updatePpblzStakingInput(event)}
                                min="0.00"
                                step="1"
                                autoFocus={true}>
                            </StyledInput>
                        </StyledInputWrapper>
                        <br />
                        <br />
                        <StyledButtonsWrapper>
                            {(!isApprovedPpblz || ppblzAllowance < parseFloat(ppblzStakeAmount)) ? <Button disabled={!(parseFloat(ppblzStakeAmount) <= ppblzBalance)} size="sm" variant="secondary" onClick={approvePpblz}>
                                {!isApprovingPpblz ? <div>{shouldClaimFirst('PPBLZ') ? 'STEP 1/3: APPROVE' : 'STEP 1/2: APPROVE'}</div> : null}
                                {isApprovingPpblz ? <div>APPROVING...</div> : null}
                            </Button> : null}
                            {(isApprovedPpblz && shouldClaimFirst('PPBLZ')) ? <Button size="sm" variant="secondary" onClick={claimRewards}>
                                <div>{isClaiming ? 'CLAIMING...' : 'STEP 2/3: CLAIM FIRST'}</div>
                            </Button>: null}
                            {(isApprovedPpblz && !shouldClaimFirst('PPBLZ')) && (!parseFloat(ppblzStakeAmount) || ppblzAllowance >= parseFloat(ppblzStakeAmount)) ? <Button size="sm" variant="secondary" disabled={!(parseFloat(ppblzStakeAmount) > 0 && parseFloat(ppblzStakeAmount) <= ppblzBalance)} onClick={stakePpblz}>
                                {!isStakingPpblz ? <div>FINAL STEP: STAKE</div> : null}
                                {isStakingPpblz ? <div>STAKING...</div> : null}
                            </Button> : null}
                            <div style={{textAlign: 'center'}}>OR</div>
                            <Button size="sm" variant="secondary" disabled={!(parseFloat(ppblzStakeAmount) > 0 && parseFloat(ppblzStakeAmount) <= ppblzStakedAmount)} onClick={withdrawPpblz}>
                                {!isWithdrawingPpblz ? <div>WITHDRAW & CLAIM</div> : null}
                                {isWithdrawingPpblz ? <div>WITHDRAWING...</div> : null}
                            </Button>
                        </StyledButtonsWrapper>
                    </CardContent>
                </Card>
                <Spacer />
                <Card boosted>
                    <CardContent>
                        <StyledSticker variant="boost">
                            <span>BOOSTED</span><br/>
                            <span style={{fontSize: '25px'}}>X2</span><br/>
                            <span style={{fontSize: '12px'}}>on PPBLZ value</span>
                        </StyledSticker>
                        <CardIcon><img alt="placeholder" src={'uniV2PpblzIcon'} style={{ height: 50, mixBlendMode: 'multiply' }}/></CardIcon>
                        <StyledTitle>STAKE <a href="https://app.uniswap.org/#/add/0x4D2eE5DAe46C86DA2FF521F7657dad98834f97b8/ETH">PPBLZ-ETH LP</a></StyledTitle>
                        <StyledDetails>
                            <StyledDetail>UNI-V2 PPBLZ balance = {parseFloat(uniV2PpblzBalance.toString()).toFixed(4)}</StyledDetail>
                            <StyledDetail>Amount staked = {parseFloat(uniV2PpblzStakedAmount.toString()).toFixed(4)}</StyledDetail>
                        </StyledDetails>
                        <Spacer />
                        <StyledButtonsWrapper>
                            <Button size="sm" variant="tertiary" onClick={setMaxUniV2Ppblz}>SET MAX</Button>
                        </StyledButtonsWrapper>
                        <StyledInputWrapper>
                            <StyledInput
                                placeholder="amount..."
                                value={setUniV2PpblzInputField() || ''}
                                onChange={(event) => updateUniV2PpblzStakingInput(event)}
                                min="0.00"
                                step="0.1"
                                autoFocus={true}>
                            </StyledInput>
                        </StyledInputWrapper>
                        <br />
                        <br />
                        <StyledButtonsWrapper>
                            {(!isApprovedUniV2Ppblz || uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount)) ? <Button disabled={!(parseFloat(uniV2PpblzStakeAmount) <= uniV2PpblzBalance)} size="sm" variant="secondary" onClick={approveUniV2Ppblz}>
                                {!isApprovingUniV2Ppblz ? <div>{shouldClaimFirst('UNIV2') ? 'STEP 1/3: APPROVE' : 'STEP 1/2: APPROVE'}</div> : null}
                                {isApprovingUniV2Ppblz ? <div>APPROVING...</div> : null}
                            </Button> : null}
                            {(isApprovedUniV2Ppblz && shouldClaimFirst('UNIV2')) ? <Button size="sm" variant="secondary" onClick={claimRewards}>
                                <div>{isClaiming ? 'CLAIMING...' : 'STEP 2/3: CLAIM FIRST'}</div>
                            </Button>: null}
                            {(isApprovedUniV2Ppblz && !shouldClaimFirst('UNIV2')) && (!parseFloat(uniV2PpblzStakeAmount) || uniV2PpblAllowance >= parseFloat(uniV2PpblzStakeAmount)) ? <Button size="sm" variant="secondary" disabled={!(parseFloat(uniV2PpblzStakeAmount) > 0 && parseFloat(uniV2PpblzStakeAmount) <= uniV2PpblzBalance)} onClick={stakeUniV2Ppblz}>
                                {!isStakingUniV2Ppblz ? <div>FINAL STEP: STAKE</div> : null}
                                {isStakingUniV2Ppblz ? <div>STAKING...</div> : null}
                            </Button> : null}
                            <div style={{textAlign: 'center'}}>OR</div>
                            <Button size="sm" variant="secondary" disabled={!(parseFloat(uniV2PpblzStakeAmount) > 0 && parseFloat(uniV2PpblzStakeAmount) <= uniV2PpblzStakedAmount)} onClick={withdrawUniV2Ppblz}>
                                {!isWithdrawingUniV2Ppblz ? <div>WITHDRAW & CLAIM</div> : null}
                                {isWithdrawingUniV2Ppblz ? <div>WITHDRAWING...</div> : null}
                            </Button>
                        </StyledButtonsWrapper>
                    </CardContent>
                </Card>
                <Spacer />
                <Card>
                    <CardContent>
                        <CardIcon><img alt="placeholder" src={'ppdexIcon'} style={{ height: 42, mixBlendMode: 'multiply' }} /></CardIcon>
                        <StyledTitle>GET PPDEX</StyledTitle>
                        <StyledDetails>
                            <StyledDetail>PPDEX balance = {parseFloat(ppdexBalance.toString()).toFixed(4)}</StyledDetail>
                        </StyledDetails>
                        <Spacer />
                        <Spacer />
                        <StyledButtonsWrapper>
                            <Button size="sm" variant="tertiary" disabled={isUpdatingRewards} onClick={getPpdexRewards}>{isUpdatingRewards ? 'UPDATING...' : 'UPDATE'}</Button>
                        </StyledButtonsWrapper>
                        <StyledInputWrapper>
                            <StyledInput
                                disabled
                                value={parseFloat((ppdexRewards * 0.9).toString()).toFixed(4)}
                                placeholder={ppdexRewards.toString()} type="number"
                            />
                        </StyledInputWrapper>
                        {ppdexRewards > 0.1 &&
                            <div style={{textAlign: 'center', padding: '.5rem 0 0 0'}}>
                                Total value: ${(ppdexRewards * ppdexPrice).toFixed(0)}
                            </div>
                        }
                        <StyledButtonsWrapper style={{marginTop: 'auto'}}>
                            <Button size="sm" variant="secondary" disabled={!(ppdexRewards > 0.1) || isClaiming} onClick={claimRewards}>{isClaiming ? 'CLAIMING...' : 'CLAIM'}</Button>
                        </StyledButtonsWrapper>
                    </CardContent>
                </Card>
            </StyledCards>
            <Spacer />
            <StakeLotteryCard
                account={account}
                pepemon={pepemon}
            />
            <Spacer />
        </StyledCardWrapper>
    );
}

interface StyledStickerProps {
    variant: 'boost' | 'apy';
}

const StyledButtonsWrapper = styled.div`
    margin: 0 2rem;
`

const StyledCards = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  @media (max-width: 868px) {
    align-items: center;
    flex-direction: column;
  }
`
const StyledSticker = styled.div<StyledStickerProps>`
    position: absolute;
    width: 6rem;
    transform: rotate(20deg);
    text-align: center;
    background: linear-gradient(45deg, #0B6673, #E63946);
    border-radius: 10px;
    margin: -.5rem 0 0 10.2rem;
    padding: .7rem .3rem;

    font-weight: 600;
    font-size: 18px;
    @media (max-width: 868px) {
      margin-left: -1rem;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledTitle = styled.h4`

  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
  text-align: center;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`

`

const StyledInput = styled.input`
  background: none;
  border: 0;

  font-size: 16px;
  flex: 1;
  height: 35px;
  margin: 0;
  padding: 0;
  outline: none;
  width: 70%;
  text-align: center;
`

const StyledInputWrapper = styled.div`
  align-items: center;

  border-radius: 0;


  display: flex;
  height: 40px;
  margin: 0 2rem;
  padding: 0 ${props => props.theme.spacing[3]}px;
`

export default StakeCard
