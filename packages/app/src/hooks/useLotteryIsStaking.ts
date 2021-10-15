import { useCallback, useEffect, useState } from 'react'
import {getPepemonLotteryContract, isUserStaking} from '../pepemon/utils'
import usePepemon from './usePepemon'

const useLotteryIsStaking = (transaction: number) => {
    const [isStaking, setIsStaking] = useState(null)
    const pepemon = usePepemon()
    const { account }: { account: string } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchIsStaking = useCallback(async () => {
        return isUserStaking(lotteryContract, account)
    }, [account, lotteryContract])

    useEffect(() => {
        if (pepemon && account) {
            fetchIsStaking().then(result => setIsStaking(result));
        }
    }, [pepemon, account, fetchIsStaking])

    return isStaking
}

export default useLotteryIsStaking
