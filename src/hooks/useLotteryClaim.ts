import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {getPepemonLotteryContract, mintNFTLottery} from '../pepemon/utils'

const useLotteryClaim = () => {
    const [isClaiming, setIsClaiming] = useState<boolean>(false)
    const { account } = usePepemon()
    const pepemon = usePepemon()

    const handleClaim = useCallback(
        async () => {
            try {
                setIsClaiming(true);
                await mintNFTLottery(
                    pepemon.provider,
                    getPepemonLotteryContract(pepemon),
                )
                setIsClaiming(false);
            } catch(err) {
                console.error(err);
                setIsClaiming(false);
            }
        },
        [account, pepemon],
    )

    return { onLotteryClaim: handleClaim, isClaiming }
}

export default useLotteryClaim
