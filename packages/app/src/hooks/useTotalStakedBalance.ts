import {useCallback, useEffect, useState} from 'react';
import BigNumber from 'bignumber.js';
import usePepemon from './usePepemon';
import {getPpdexContract, getTotalStaked} from '../pepemon/utils';

const useTotalStakedBalance = (pid: number) => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const ppdexContract = getPpdexContract(pepemon)

    const fetchBalance = useCallback(async () => {
        const balance = await getTotalStaked(ppdexContract)
        setBalance(new BigNumber(balance))
    }, [ppdexContract])

    useEffect(() => {
        if (account && pepemon) {
            fetchBalance()
        }
    }, [account, pepemon, fetchBalance])

    return balance
}

export default useTotalStakedBalance
