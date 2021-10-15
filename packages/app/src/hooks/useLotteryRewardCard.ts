import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, getRewardCardId} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryRewardCard = () => {
    const [rewardCard, setRewardCard] = useState(null)
    const pepemon = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchRewardCard = useCallback(async () => {
        return getRewardCardId(lotteryContract)
    }, [lotteryContract])

    useEffect(() => {
        if (pepemon) {
            fetchRewardCard().then(result => setRewardCard(result));
        }
    }, [pepemon, fetchRewardCard])

    return rewardCard
}

export default useLotteryRewardCard
