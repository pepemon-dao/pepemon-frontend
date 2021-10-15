import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'


import {getPepemonStakeContract, claimEvent} from '../pepemon/utils'

const useClaimEvent = (eventId: number) => {
    const [isClaiming, setIsClaiming] = useState<boolean>(false)
    const pepemon = usePepemon()

    const handleClaimEvent = useCallback(
        async () => {
            try {
                setIsClaiming(true);
                await claimEvent(
                    pepemon.provider,
                    getPepemonStakeContract(pepemon),
                    eventId,
                )
                setIsClaiming(false);
            } catch(err) {
                console.error(err);
                setIsClaiming(false);
            }
        },
        [eventId, pepemon],
    )

    return { onClaimEvent: handleClaimEvent, isClaiming }
}

export default useClaimEvent
