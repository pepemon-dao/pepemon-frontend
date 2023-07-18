import { useCallback, useEffect, useState } from 'react'
import {getPepemonLotteryContract, hasUserMinted} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryHasClaimed = (cardId: number, transaction: number) => {
    const [hasClaimed, setHasClaimed] = useState(null)
    const pepemon = usePepemon()
    const { account }: { account: string } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchHasMinted = useCallback(async (account:any, cardId:any) => {
        return hasUserMinted(lotteryContract, account, cardId)
    }, [lotteryContract])

    useEffect(() => {
        if (account && cardId) {
            fetchHasMinted(account, cardId).then(result => setHasClaimed(result));
        }
    }, [fetchHasMinted, account, cardId])

    return hasClaimed
}

export default useLotteryHasClaimed
