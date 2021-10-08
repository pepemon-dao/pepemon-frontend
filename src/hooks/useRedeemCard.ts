import {useCallback, useState} from 'react'
import {redeemCard, redeemCardNative} from '../pepemon/utils'
import usePepemon from './usePepemon';

const useRedeemCard = (storeContract: any) => {
    //check
    const [isRedeeming, setIsRedeeming] = useState<[number, boolean]>([0,false])
    const pepemon = usePepemon();
    const { account } = usePepemon()

    const handleRedeem = useCallback(async (tokenId, amount = null) => {
        try {
            setIsRedeeming([tokenId, true]);
            if (amount) {
                await redeemCardNative(pepemon.provider, storeContract, tokenId, amount)
            } else {
                await redeemCard(pepemon.provider, storeContract, tokenId)
            }

            setIsRedeeming([tokenId, false]);
        } catch (error) {
            console.log(error);
            setIsRedeeming([tokenId, false]);
        }
    }, [account, pepemon, isRedeeming])

    return {
        onRedeemCard: (tokenId: number, amount?: string) => handleRedeem(tokenId, amount),
        isRedeemingCard: isRedeeming,
    }
}

export default useRedeemCard
