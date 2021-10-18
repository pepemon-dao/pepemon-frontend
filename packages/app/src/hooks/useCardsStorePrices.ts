import {useCallback, useEffect, useState} from 'react'
import BigNumber from 'bignumber.js';
import { getCardPrice, getPepemonPromoStoreContract, getPepemonStoreContract } from '../pepemon/utils';
import usePepemon from './usePepemon';
import { correctChainIsLoaded } from '../utils/network';

export interface CardPrice {
    tokenId: number,
    price: BigNumber,
}

const useCardsStorePrices = (tokenIds: number[], promo = false) => {
    const [cardsPrices, setCardsPrices] = useState([])
    const { provider }: { provider: any } = usePepemon()
    const pepemon = usePepemon();

    const fetchCardsPrices = useCallback(async (storeContract: any) => {
        return await Promise.all(tokenIds.map(async (tokenId, index) => {
            return {
                tokenId,
                price: await getCardPrice(storeContract, tokenId)
            }
        }))
    }, [tokenIds])

    useEffect(() => {

        if (pepemon && provider && tokenIds.length) {
            correctChainIsLoaded(pepemon).then((correct) => {
                if (correct) {
                    const storeContract = promo ? getPepemonPromoStoreContract(pepemon) : getPepemonStoreContract(pepemon)
                    fetchCardsPrices(storeContract).then((prices) => setCardsPrices(prices))
                }
            });
        }
    }, [pepemon, provider, tokenIds, fetchCardsPrices, promo])

    return cardsPrices
}

export const useCardStorePrices = (tokenId: number, promo = false) => {
    const { provider }: { provider: any } = usePepemon();
    const pepemon = usePepemon();
	let cardPrices;

    const fetchCardsPrices = async (storeContract: any) => {
        return await new Promise(tokenId => {
            return {
                tokenId,
                price: getCardPrice(storeContract, tokenId)
            }
        });
    };

    if (pepemon && provider && tokenId) {
        correctChainIsLoaded(pepemon).then((correct) => {
            if (correct) {
                const storeContract = promo ? getPepemonPromoStoreContract(pepemon) : getPepemonStoreContract(pepemon)
                fetchCardsPrices(storeContract).then(prices => cardPrices = prices)
            }
        });
    }

    return cardPrices
}

export default useCardsStorePrices
