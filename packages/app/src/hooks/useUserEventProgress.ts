import { useCallback, useEffect, useState } from 'react'
import usePepemon from './usePepemon'
import { getPepemonStakeContract, getUserProgress } from '../pepemon/utils'
import { correctChainIsLoaded } from '../utils/network';

const useUserEventProgress = (eventId: number, transactions: number,) => {
    const [userProgress, setUserProgress] = useState('0')
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const stakeContract = getPepemonStakeContract(pepemon)

    const fetchUserProgress = useCallback(async () => {
        const userProgress = await getUserProgress( stakeContract, eventId, account )
        setUserProgress(userProgress)
    }, [account, stakeContract, eventId])

    useEffect(() => {
        correctChainIsLoaded(pepemon).then(correct => {
            if (account && stakeContract && correct) {
                fetchUserProgress()
            }
        });
    }, [pepemon, account, stakeContract, fetchUserProgress])

    return userProgress;
}

export default useUserEventProgress;
