import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'


import {getPepemonLotteryContract, withdrawLottery} from '../pepemon/utils'

const useLotteryWithdraw = () => {
    const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false)
    const pepemon = usePepemon()

    const handleWithdraw = useCallback(
        async () => {
            try {
                setIsWithdrawing(true);
                await withdrawLottery(
                    pepemon.provider,
                    getPepemonLotteryContract(pepemon),
                )
                setIsWithdrawing(false);
            } catch(err) {
                console.error(err);
                setIsWithdrawing(false);
            }
        },
        [pepemon],
    )

    return { onLotteryWithdraw: handleWithdraw, isWithdrawing }
}

export default useLotteryWithdraw
