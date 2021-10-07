import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, getLPBalance} from '../pepemon/utils'
import usePepemon from './usePepemon'
import BigNumber from 'bignumber.js';
import {provider} from 'web3-core';
// import {useWallet} from "use-wallet";

const useLotteryLPBalance = (transaction: number) => {
    const [lpBalance, setLpBalance] = useState(new BigNumber(0))
    const pepemon = usePepemon()
    const { account, ethereum }: { account: string; ethereum: provider;  } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchStakedBalance = useCallback(async () => {
        return getLPBalance(lotteryContract, account)
    }, [pepemon, account, ethereum])

    useEffect(() => {
        if (pepemon) {
            fetchStakedBalance().then(result => setLpBalance(new BigNumber(result)));
        }
    }, [pepemon, account, ethereum, transaction])

    return lpBalance
}

export default useLotteryLPBalance
