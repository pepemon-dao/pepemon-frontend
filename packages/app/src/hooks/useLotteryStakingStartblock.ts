import { useCallback, useEffect, useState } from 'react'
import {getPepemonLotteryContract, getStakingStart} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryStakingStartblock = (transaction: number) => {
    const [stakingStartBlock, setStakingStartBlock] = useState(null)
    const pepemon = usePepemon()
    const { account }: { account: string } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchStakingStartBlock = useCallback(async () => {
        return getStakingStart(lotteryContract, account)
    }, [account, lotteryContract])

    useEffect(() => {
        if (pepemon) {
            fetchStakingStartBlock().then(result => setStakingStartBlock(result));
        }
    }, [pepemon, fetchStakingStartBlock])

    return stakingStartBlock
}

export default useLotteryStakingStartblock
