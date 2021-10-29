import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'


import {joinEvent, getPepemonStakeContract} from '../pepemon/utils'

const useJoinEvent = (eventId: number) => {
    const [isJoining, setIsJoining] = useState<boolean>(false)
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
        [eventId, pepemon],
    )

    return { onJoinEvent: handleJoinEvent, isJoining }
}

export default useJoinEvent
