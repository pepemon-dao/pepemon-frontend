import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, getStakingDeadline} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryStakingDeadline = () => {
    const [stakingDeadline, setStakingDeadline] = useState(null)
    const pepemon = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchStakingDeadline = useCallback(async () => {
        return getStakingDeadline(lotteryContract)
    }, [lotteryContract])

    useEffect(() => {
        if (pepemon) {
            fetchStakingDeadline().then(result => setStakingDeadline(result));
        }
    }, [pepemon, fetchStakingDeadline])

    return stakingDeadline
}

export default useLotteryStakingDeadline
