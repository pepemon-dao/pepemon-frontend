import { useCallback, useEffect, useState } from 'react'
import {getPepemonLotteryContract, isUserStaking} from '../pepemon/utils'
import usePepemon from './usePepemon'


const useLotteryIsStaking = (transaction: number) => {
    const [isStaking, setIsStaking] = useState(null)
    const pepemon = usePepemon()
    const { account, provider }: { account: string; provider: any;  } = usePepemon()
    const lotteryContract = getPepemonLotteryContract(pepemon)

    const fetchIsStaking = useCallback(async () => {
        return isUserStaking(lotteryContract, account)
    }, [pepemon, account, provider])

    useEffect(() => {
        if (pepemon && account) {
            fetchIsStaking().then(result => setIsStaking(result));
        }
    }, [pepemon, account, provider, transaction])

    return isStaking
}

export default useLotteryIsStaking
