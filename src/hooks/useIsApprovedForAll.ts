import { useCallback, useEffect, useState } from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {
    getIsApprovedForAll,
    getPepemonFactoryContract,
    getPepemonStakeAddress,
} from '../pepemon/utils'
import {correctChainIsLoaded} from '../utils/network';

const useIsApprovedForAll = () => {
    const [isApprovedForAll, setIsApprovedForAll] = useState(false)
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const factoryContract = getPepemonFactoryContract(pepemon)

    const fetchIsApprovedForAll = useCallback(async () => {
        const isApproved = await getIsApprovedForAll(
            factoryContract,
            getPepemonStakeAddress(pepemon),
            account,
        )
        setIsApprovedForAll(isApproved)
    }, [account, factoryContract])

    useEffect(() => {
        correctChainIsLoaded(pepemon).then(correct => {
            if (account && factoryContract && correct) {
                fetchIsApprovedForAll()
            }
        })
        // let refreshInterval = setInterval(fetchIsApprovedForAll, 10000)
        // return () => clearInterval(refreshInterval)
    }, [account, factoryContract])

    return isApprovedForAll;
}

export default useIsApprovedForAll;
