import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {getPepemonStakeContract, claimEvent} from '../pepemon/utils'

const useClaimEvent = (eventId: number) => {
    const [isClaiming, setIsClaiming] = useState<boolean>(false)
    const { account } = usePepemon()
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
        [account, eventId, pepemon],
    )

    return { onClaimEvent: handleClaimEvent, isClaiming }
}

export default useClaimEvent
