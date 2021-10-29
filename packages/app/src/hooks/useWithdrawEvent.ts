import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'


import {getPepemonStakeContract, withdrawEvent} from '../pepemon/utils'

const useWithdrawEvent = (eventId: number) => {
    const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false)
    const pepemon = usePepemon()

    const handleWithdrawEvent = useCallback(
        async () => {
            try {
                setIsWithdrawing(true);
                await withdrawEvent(
                    pepemon.provider,
                    getPepemonStakeContract(pepemon),
                    eventId,
                )
                setIsWithdrawing(false);
            } catch(err) {
                console.error(err);
                setIsWithdrawing(false);
            }

        },
        [eventId, pepemon],
    )

    return { onWithdrawEvent: handleWithdrawEvent, isWithdrawing }
}

export default useWithdrawEvent
