import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, getRewardCardId, getStakingDeadline} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryStakingDeadline = () => {
    const [stakingDeadline, setStakingDeadline] = useState(null)
    const pepemon = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchStakingDeadline = useCallback(async () => {
        return getStakingDeadline(lotteryContract)
    }, [pepemon])

    useEffect(() => {
        if (pepemon) {
            fetchStakingDeadline().then(result => setStakingDeadline(result));
        }
    }, [pepemon])

    return stakingDeadline
}

export default useLotteryStakingDeadline
