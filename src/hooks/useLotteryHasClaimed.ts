import { useCallback, useEffect, useState } from 'react'

import {getPepemonLotteryContract, hasUserMinted} from '../pepemon/utils'
import usePepemon from './usePepemon'
// import {useWallet} from "use-wallet";
import {provider} from 'web3-core';

const useLotteryHasClaimed = (cardId: number, transaction: number) => {
    const [hasClaimed, setHasClaimed] = useState(null)
    const pepemon = usePepemon()
    const { account, ethereum }: { account: string; ethereum: provider;  } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchHasMinted = useCallback(async (account, cardId) => {
        return hasUserMinted(lotteryContract, account, cardId)
    }, [pepemon, account, ethereum, cardId])

    useEffect(() => {
        if (account && cardId) {
            fetchHasMinted(account, cardId).then(result => setHasClaimed(result));
        }
    }, [pepemon, account, ethereum, cardId, transaction])

    return hasClaimed
}

export default useLotteryHasClaimed
