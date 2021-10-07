import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, getRewardCardId, getStakingDeadline, getStakingStart} from '../pepemon/utils'
import usePepemon from './usePepemon'
// import {useWallet} from "use-wallet";
import {provider} from 'web3-core';

const useLotteryStakingStartBlock = (transaction: number) => {
    const [stakingStartBlock, setStakingStartBlock] = useState(null)
    const pepemon = usePepemon()
    const { account, ethereum }: { account: string; ethereum: provider;  } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchStakingStartBlock = useCallback(async () => {
        return getStakingStart(lotteryContract, account)
    }, [account, ethereum, pepemon])

    useEffect(() => {
        if (pepemon) {
            fetchStakingStartBlock().then(result => setStakingStartBlock(result));
        }
    }, [pepemon, account, ethereum, transaction])

    return stakingStartBlock
}

export default useLotteryStakingStartBlock
