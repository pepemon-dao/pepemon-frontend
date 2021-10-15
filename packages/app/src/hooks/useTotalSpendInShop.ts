import {useCallback, useEffect, useState} from 'react';
import BigNumber from 'bignumber.js';
import usePepemon from './usePepemon';
import {getPepemonStoreContract, getTotalSpend, getTotalSpendBNB} from '../pepemon/utils';
import {correctChainIsLoaded} from '../utils/network';

const useTotalSpendInShop = () => {
    const [totalSpend, setTotalSpend] = useState(new BigNumber(0))
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const storeContract = getPepemonStoreContract(pepemon)

    const fetchTotalSpend = useCallback(async () => {
        const balance = parseInt(pepemon.chainId) === 56 ? await getTotalSpendBNB(storeContract) : await getTotalSpend(storeContract);
        setTotalSpend(new BigNumber(balance))
    }, [pepemon, storeContract])

    useEffect(() => {
        if (account && pepemon) {
            correctChainIsLoaded(pepemon).then((correct) => {
                if (correct) {
                    fetchTotalSpend()
                }
            })
        }
    }, [account, pepemon, fetchTotalSpend])

    return totalSpend
}

export default useTotalSpendInShop
