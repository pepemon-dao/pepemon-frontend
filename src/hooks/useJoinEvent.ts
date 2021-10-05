import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {joinEvent, getPepemonStakeContract} from '../pepemon/utils'

const useJoinEvent = (eventId: number) => {
    const [isJoining, setIsJoining] = useState<boolean>(false)
    const { account } = usePepemon()
    const pepemon = usePepemon()

    const handleJoinEvent = useCallback(
        async () => {
            try {
                setIsJoining(true);
                await joinEvent(
                    pepemon.provider,
                    getPepemonStakeContract(pepemon),
                    eventId,
                )
                setIsJoining(false);
            } catch(err) {
                console.error(err);
                setIsJoining(false);
            }
        },
        [account, eventId, pepemon],
    )

    return { onJoinEvent: handleJoinEvent, isJoining }
}

export default useJoinEvent
