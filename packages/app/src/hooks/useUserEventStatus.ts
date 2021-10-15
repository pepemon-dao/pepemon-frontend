import { useCallback, useEffect, useState } from 'react'
import usePepemon from './usePepemon'
import { getPepemonStakeContract, getUserEventStatus } from '../pepemon/utils'
import { correctChainIsLoaded } from '../utils/network';

const useUserEventStatus = (eventId: number, transactions: number) => {
    const [userEventStatus, setUserEventStatus] = useState(null)
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const stakeContract = getPepemonStakeContract(pepemon)

    const fetchUserEventStatus = useCallback(async () => {
        const userEventStatus = await getUserEventStatus( stakeContract, eventId, account )
        setUserEventStatus({...userEventStatus})
    }, [account, stakeContract, eventId])

    useEffect(() => {
        correctChainIsLoaded(pepemon).then(correct => {
            if (account && stakeContract && correct) {
                fetchUserEventStatus()
            }
        })
    }, [account, stakeContract, pepemon, fetchUserEventStatus])

    return userEventStatus;
}

export default useUserEventStatus;
