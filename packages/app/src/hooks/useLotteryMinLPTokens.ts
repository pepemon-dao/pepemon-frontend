import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import {getPepemonLotteryContract, getMinLPTokens} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryMinLPTokens = () => {
    const [minLPTokens, setMinLPTokens] = useState(null)
    const pepemon = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchMinLPTokens = useCallback(async () => {
        return getMinLPTokens(lotteryContract)
    }, [lotteryContract])

    useEffect(() => {
        if (pepemon) {
            fetchMinLPTokens().then(result => {
                setMinLPTokens(new BigNumber(result))
            });
        }
    }, [pepemon, fetchMinLPTokens])

    return minLPTokens
}

export default useLotteryMinLPTokens
