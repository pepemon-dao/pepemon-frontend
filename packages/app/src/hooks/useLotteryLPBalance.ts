import { useCallback, useEffect, useState } from 'react'
import {getPepemonLotteryContract, getLPBalance} from '../pepemon/utils'
import usePepemon from './usePepemon'
import BigNumber from 'bignumber.js';

const useLotteryLPBalance = (transaction: number) => {
    const [lpBalance, setLpBalance] = useState(new BigNumber(0))
    const pepemon = usePepemon()
    const { account }: { account: string } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchStakedBalance = useCallback(async () => {
        return getLPBalance(lotteryContract, account)
    }, [account, lotteryContract])

    useEffect(() => {
        if (pepemon) {
            fetchStakedBalance().then(result => setLpBalance(new BigNumber(result)));
        }
    }, [pepemon, fetchStakedBalance])

    return lpBalance
}

export default useLotteryLPBalance
