import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, getRewardCardId} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryRewardCard = () => {
    const [rewardCard, setRewardCard] = useState(null)
    const pepemon = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchRewardCard = useCallback(async () => {
        return getRewardCardId(lotteryContract)
    }, [pepemon])

    useEffect(() => {
        if (pepemon) {
            fetchRewardCard().then(result => setRewardCard(result));
        }
    }, [pepemon])

    return rewardCard
}

export default useLotteryRewardCard
