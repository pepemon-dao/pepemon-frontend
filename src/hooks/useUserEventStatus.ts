import { useCallback, useEffect, useState } from 'react'

import usePepemon from './usePepemon'

import {
    getPepemonStakeContract, getUserEventStatus,
} from '../pepemon/utils'
import {correctChainIsLoaded} from '../utils';

const useUserEventStatus = (eventId: number, transactions: number) => {
    const [userEventStatus, setUserEventStatus] = useState(null)
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const stakeContract = getPepemonStakeContract(pepemon)

    const fetchUserEventStatus = useCallback(async () => {
        const userEventStatus = await getUserEventStatus(
            stakeContract,
            eventId,
            account,
        )
        setUserEventStatus({...userEventStatus})
    }, [account, stakeContract])

    useEffect(() => {
        correctChainIsLoaded(pepemon).then(correct => {
            if (account && stakeContract && correct) {
                fetchUserEventStatus()
            }
        })
        // let refreshInterval = setInterval(fetchUserEventStatus, 60000)
        // return () => clearInterval(refreshInterval)
    }, [account, stakeContract, transactions])

    return userEventStatus;
}

export default useUserEventStatus;
