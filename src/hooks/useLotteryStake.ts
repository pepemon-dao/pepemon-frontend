import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'

import {getPepemonLotteryContract, stakeLottery} from '../pepemon/utils'

const useLotteryStake = () => {
    const [isJoining, setIsJoining] = useState<boolean>(false)
    const { account } = usePepemon()
    const pepemon = usePepemon()

    const handleStake = useCallback(
        async () => {
            try {
                setIsJoining(true);
                await stakeLottery(
                    pepemon.provider,
                    getPepemonLotteryContract(pepemon),
                )
                setIsJoining(false);
            } catch(err) {
                console.error(err);
                setIsJoining(false);
            }
        },
        [account, pepemon],
    )

    return { onLotteryStake: handleStake, isJoining }
}

export default useLotteryStake
