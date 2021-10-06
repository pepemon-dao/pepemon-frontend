import {useCallback, useEffect, useState} from 'react'

// import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalanceOfBatch, getMaxSupply, getTotalSupply, correctChainIsLoaded} from '../utils';
import {
    getCardPrice,
    getPepemonFactoryContract,
    getPepemonPromoStoreContract,
    getPepemonStoreContract
} from '../pepemon/utils';
import usePepemon from './usePepemon';
import BigNumber from 'bignumber.js';
import {contractAddresses} from '../pepemon/lib/constants';

export interface CardPrice {
    tokenId: number,
    price: BigNumber,
}

const useCardsStorePrices = (tokenIds: number[], promo = false) => {
    const [cardsPrices, setCardsPrices] = useState([])
    const {
        account,
        provider,
    }: { account: string; provider: any } = usePepemon()
    const pepemon = usePepemon();

    const fetchCardsPrices = useCallback(async (storeContract: any) => {
        return await Promise.all(tokenIds.map(async (tokenId, index) => {
            return {
                tokenId,
                price: await getCardPrice(storeContract, tokenId)
            }
        }))
    }, [pepemon, account, provider, tokenIds])

    useEffect(() => {

        if (pepemon && provider && tokenIds.length) {
            correctChainIsLoaded(pepemon).then((correct) => {
                if (correct) {
                    const storeContract = promo ? getPepemonPromoStoreContract(pepemon) : getPepemonStoreContract(pepemon)
                    fetchCardsPrices(storeContract).then((prices: any) => setCardsPrices(prices))
                }
            });
        }
    }, [pepemon, account, provider, tokenIds])

    return cardsPrices
}

export default useCardsStorePrices
