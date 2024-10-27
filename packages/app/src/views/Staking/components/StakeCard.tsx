import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import styled from "styled-components";
import { ethers } from 'ethers';
import { Spacer, Button, Title, IButtonPopover, Text, ContentCentered } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { useTokenPrices, useHorizontalScroll } from '../../../hooks';
import { calculatePpblzApy, calculatePpblzEthLpApy, correctChainIsLoaded } from '../../../utils';
import { pepeball, uniswap, ppdexLogo } from '../../../assets';
import { theme } from '../../../theme';
import { sendTransaction } from '../../../pepemon/utils';

const StakeCard: React.FC<any> = () => {
    const [ppblzStakeAmount, setPpblzStakeAmount] = useState(null);
    const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0);
    const [uniV2PpblzStakeAmount, setUniV2PpblzStakeAmount] = useState(null);
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
    const [ppblzAllowance, setPpblzAllowance] = useState(0);
    const [uniV2PpblAllowance, setUniV2PpblzAllowance] = useState(0);
    const [ppblzBalance, setPpblzBalance] = useState(0);
    const [uniV2PpblzBalance, setUniV2PpblzBalance] = useState(0);
    const [ppdexBalance, setPpdexBalance] = useState(0);
    const [transactionFinished, setTransactionFinished] = useState(0);
    const [ppblzStakeAdd, setPpblzStakeAdd] = useState(false);
    const [ppblzStakeSub, setPpblzStakeSub] = useState(false);
    const [uniV2PpblzStakeAdd, setUniV2PpblzStakeAdd] = useState(false);
    const [uniV2PpblzStakeSub, setUniV2PpblzStakeSub] = useState(false);

    const [pepemon] = useContext(PepemonProviderContext);
    const { account, contracts, provider } = pepemon;

    const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);
    const ppblzEthLpApy = calculatePpblzEthLpApy(ppblzPrice, ppdexPrice);

    let timer: any = useRef(null);
    let horzScroll: any = useRef(null);
    useHorizontalScroll(horzScroll);

    useEffect(() => {
        return () => timer && clearTimeout(timer);
    }, [timer]);

    const resetToInitialStateOnReject = async () => {
        setIsStakingPpblz(false);
        setIsApprovingPpblz(false);
        setIsWithdrawingPpblz(false);
        setIsStakingUniV2Ppblz(false);
        setIsApprovingUniV2Ppblz(false);
        setIsWithdrawingUniV2Ppblz(false);
        setIsClaiming(false);
    };

    const safeFromWei = (value: ethers.BigNumber | string) => {
        try {
            if (typeof value !== 'string') {
                value = value.toString();
            }
            return parseFloat(ethers.utils.formatUnits(value, 'ether'));
        } catch (error) {
            console.error('Error in safeFromWei:', error);
            return 0;
        }
    };

    const getPpblzAllowance = useCallback(async () => {
        try {
            const _ppblzAllowance = await contracts.ppblz.allowance(account, contracts.ppdex.address);
            setPpblzAllowance(safeFromWei(_ppblzAllowance));
            setIsApprovedPpblz(_ppblzAllowance.gt(ethers.BigNumber.from('0')));
        } catch (error) {
            console.error('Error in getPpblzAllowance:', error);
        }
    }, [setPpblzAllowance, account, contracts.ppblz, contracts.ppdex.address]);

    const getUniV2PpblzAllowance = useCallback(async () => {
        try {
            const _uniV2PpblzAllowance = await contracts.uniV2_ppblz.allowance(account, contracts.ppdex.address);
            setUniV2PpblzAllowance(safeFromWei(_uniV2PpblzAllowance));
            setIsApprovedUniV2Ppblz(_uniV2PpblzAllowance.gt(ethers.BigNumber.from('0')));
        } catch (error) {
            console.error('Error in getUniV2PpblzAllowance:', error);
        }
    }, [contracts.uniV2_ppblz, contracts.ppdex.address, setUniV2PpblzAllowance, account]);

    const getPpblzBalance = useCallback(async () => {
        try {
            const _ppblzBalance = await contracts.ppblz.balanceOf(account);
            setPpblzBalance(safeFromWei(_ppblzBalance));
        } catch (error) {
            console.error('Error in getPpblzBalance:', error);
        }
    }, [contracts.ppblz, setPpblzBalance, account]);

    const getUniV2PpblzBalance = useCallback(async () => {
        try {
            const _uniV2PpblzBalance = await contracts.uniV2_ppblz.balanceOf(account);
            setUniV2PpblzBalance(safeFromWei(_uniV2PpblzBalance));
        } catch (error) {
            console.error('Error in getUniV2PpblzBalance:', error);
        }
    }, [contracts.uniV2_ppblz, setUniV2PpblzBalance, account]);

    const getPpdexBalance = useCallback(async () => {
        try {
            const _ppdexBalance = await contracts.ppdex.balanceOf(account);
            setPpdexBalance(safeFromWei(_ppdexBalance));
        } catch (error) {
            console.error('Error in getPpdexBalance:', error);
        }
    }, [contracts.ppdex, setPpdexBalance, account]);

    const getPpblzSupply = useCallback(async () => {
        try {
            const _ppblzSupply = await contracts.ppblz.totalSupply();
            setTotalPpblzSupply(safeFromWei(_ppblzSupply));
        } catch (error) {
            console.error('Error in getPpblzSupply:', error);
        }
    }, [contracts.ppblz, setTotalPpblzSupply]);

    const getUniV2PpblzSupply = useCallback(async () => {
        try {
            const _ppblzSupply = await contracts.uniV2_ppblz.totalSupply();
            setTotalUniV2PpblzSupply(safeFromWei(_ppblzSupply));
        } catch (error) {
            console.error('Error in getUniV2PpblzSupply:', error);
        }
    }, [contracts.uniV2_ppblz, setTotalUniV2PpblzSupply]);

    const getMyPpblzStakeAmount = useCallback(async () => {
        try {
            const stakeA = await contracts.ppdex.getAddressPpblzStakeAmount(account);
            setPpblzStakedAmount(safeFromWei(stakeA));
        } catch (error) {
            console.error('Error in getMyPpblzStakeAmount:', error);
        }
    }, [contracts.ppdex, setPpblzStakedAmount, account]);

    const getMyUniV2PpblzStakeAmount = useCallback(async () => {
        try {
            const stakeA = await contracts.ppdex.getAddressUniV2StakeAmount(account);
            setUniV2PpblzStakedAmount(safeFromWei(stakeA));
        } catch (error) {
            console.error('Error in getMyUniV2PpblzStakeAmount:', error);
        }
    }, [contracts.ppdex, setUniV2PpblzStakedAmount, account]);

    const getPpdexRewards = useCallback(async () => {
        setIsUpdatingRewards(true);
        try {
            const cRewards = await contracts.ppdex.myRewardsBalance(account);
            const ppblzStaked = await contracts.ppdex.getAddressPpblzStakeAmount(account);
            const uniV2Staked = await contracts.ppdex.getAddressUniV2StakeAmount(account);

            let rewardsToSet = cRewards;

            if (ppblzStaked.gt(ethers.BigNumber.from('0')) && uniV2Staked.gt(ethers.BigNumber.from('0'))) {
                const lastRewardBlock = await contracts.ppdex.getLastBlockCheckedNum(account);
                const currentBlock = await contracts.ppdex.getBlockNum();
                const liquidityMultiplier = await contracts.ppdex.getLiquidityMultiplier();
                const rewardsVar = ethers.BigNumber.from('100000');

                const blockDiff = currentBlock.sub(lastRewardBlock);
                const ppblzRewardBalance = ppblzStaked.mul(blockDiff).div(rewardsVar);
                const uniV2RewardsBalance = uniV2Staked.mul(blockDiff).mul(liquidityMultiplier).div(rewardsVar);

                const totalRewards = ppblzRewardBalance.add(uniV2RewardsBalance);

                if (cRewards.gt(ethers.BigNumber.from('10000'))) {
                    const originalReward = cRewards.sub(totalRewards);
                    rewardsToSet = originalReward.div(ethers.BigNumber.from('2')).add(totalRewards);
                }
            }

            setPpdexRewards(safeFromWei(rewardsToSet));
        } catch (error) {
            console.error('Error in getPpdexRewards:', error);
        } finally {
            setTimeout(() => {
                setIsUpdatingRewards(false);
                if (timer.current) {
                    clearTimeout(timer.current);
                }
            }, 2000);
        }
    }, [account, contracts.ppdex]);

    const stakePpblz = async () => {
        if ((isStakingPpblz || !ppblzStakeAmount || parseFloat(ppblzStakeAmount) === 0) || (parseFloat(ppblzStakeAmount) > ppblzBalance)) {
            return;
        }

        setIsStakingPpblz(true);
        try {
            const amount = ethers.utils.parseUnits(ppblzStakeAmount.toString(), 'ether');
            const stakeRes = await sendTransaction(provider,
                async () => await contracts.ppdex.stakePpblz(amount, { gasLimit: 200000 })
            );

            if (stakeRes) {
                setIsStakingPpblz(false);
                setPpblzStakeAmount(null);
                await getMyPpblzStakeAmount();
                await getPpblzBalance();
                await getPpblzAllowance();
                await getPpdexRewards();
            }
            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.error('Error in stakePpblz:', error);
            await resetToInitialStateOnReject();
        }
    };

    const stakeUniV2Ppblz = async () => {
        if ((isStakingUniV2Ppblz || !uniV2PpblzStakeAmount || parseFloat(uniV2PpblzStakeAmount) === 0) || (parseFloat(uniV2PpblzStakeAmount) > uniV2PpblzBalance)) {
            return;
        }

        setIsStakingUniV2Ppblz(true);
        try {
            const amount = ethers.utils.parseUnits(uniV2PpblzStakeAmount.toString(), 'ether');
            let stakeRes = await sendTransaction(provider, async () => await contracts.ppdex.stakeUniV2(amount, { gasLimit: 200000 }));
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
            const amount = ethers.utils.parseUnits(ppblzStakeAmount.toString(), 'ether');
            let unstakeRes = await sendTransaction(provider, async () => await contracts.ppdex.withdrawPpblz(amount, { gasLimit: 200000 }));

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
            const amount = ethers.utils.parseUnits(uniV2PpblzStakeAmount.toString(), 'ether');
            let unstakeRes = await sendTransaction(provider, async () => await contracts.ppdex.withdrawUniV2(amount, { gasLimit: 200000 }));

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
            const amount = ethers.utils.parseUnits(totalPpblzSupply.toString(), 'ether');
            let approveStaking = await sendTransaction(provider, async () => await contracts.ppblz.approve(
                contracts.ppdex.address,
                amount
            ));

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
            const amount = ethers.utils.parseUnits(totalUniV2PpblzSupply.toString(), 'ether');
            let approveStaking = await sendTransaction(provider, async () => await contracts.uniV2_ppblz.approve(
                contracts.ppdex.address,
                amount
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
    };

    const cleanNumberInput = (value: string, maxDecimals: number) => {
        if (value[0] === '0' && (value[1] && value[1] !== '.')) {
            return value[1];
        }
        if (value.slice(-2) === '..') {
            return value.slice(0, -1);
        }
        if (value.split('.').length > 1 && value.split('.')[1].length > maxDecimals) {
            return `${value.split('.')[0]}.${value.split('.')[1].slice(0, maxDecimals)}`;
        }
        return value;
    };

    const isInvalidInput = (value: string) =>
        !Number(value) &&
        value !== '' &&
        parseFloat(value) !== 0 &&
        value.slice(-1) !== '.' &&
        value.slice(-2) !== '.0';

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
            return '';
        }
    };

    const setUniV2PpblzInputField = () => {
        if (uniV2PpblzStakeAmount !== null) {
            return uniV2PpblzStakeAmount;
        } else {
            return '';
        }
    };

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
                await sendTransaction(provider, async () => await contracts.ppdex.getReward());

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
        if (!pepemon || !contracts) {
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
                setIsApprovedPpblz(false);
                setIsApprovedUniV2Ppblz(false);
            } catch (error) {
                alert(`Failed to load web3, accounts, or contract. Check console for details.`);
                console.error(error);
            }
        });
    }, [
        account,
        pepemon,
        contracts,
        provider,
        transactionFinished,
        getMyPpblzStakeAmount,
        getMyUniV2PpblzStakeAmount,
        getPpblzAllowance,
        getPpblzBalance,
        getPpblzSupply,
        getPpdexBalance,
        getPpdexRewards,
        getUniV2PpblzAllowance,
        getUniV2PpblzBalance,
        getUniV2PpblzSupply,
    ]);

    // The rest of your component code remains unchanged (JSX and styled components)
    // ...
};

export default StakeCard;
