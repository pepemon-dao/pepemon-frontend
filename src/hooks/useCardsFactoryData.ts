import {useCallback, useEffect, useState} from 'react'

import { getBalanceOfBatch, getMaxSupply, getTotalSupply, correctChainIsLoaded } from '../utils';
import usePepemon from './usePepemon';
import {getPepemonFactoryContract} from '../pepemon/utils';
import {contractAddresses} from '../pepemon/lib/constants';

export interface CardBalances {
    tokenId: number,
    userBalance: string,
    maxSupply: string,
    totalSupply: string,
}

const setIntervalAsync = (fn: any, ms: any) => {
    fn().then(() => {
        setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
};

const useCardsFactoryData = (tokenIds: number[], transactions: number) => {
    const [cardsBalance, setCardsBalance] = useState([])
    const {
        account,
        provider,
        chainId,
    }: { account: string; provider: any, chainId: number } = usePepemon()
    const pepemon = usePepemon();


    const fetchCardBalances = useCallback(async (factoryContract) => {
        const batches = tokenIds.reduce((resultArray:  Array<any>, item, index) => {
            const chunkIndex = Math.floor(index / 10)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        let runBatch = 0;
        let userBalances: any = []

        await new Promise((resolve: any) => {
            setIntervalAsync(async () => {
                if (runBatch >= batches.length) {
                    return resolve()
                }

                const batchBalances = await getBalanceOfBatch(factoryContract, account, batches[runBatch]);
                userBalances = [...userBalances, ...batchBalances];

                runBatch += 1
            }, 100);
        });

        // const userBalances = await getBalanceOfBatch(factoryContract, account, tokenIds);
        return Promise.all(tokenIds.map(async (tokenId, index) => {
            return {
                tokenId,
                userBalance: userBalances && userBalances[index],
                maxSupply: await getMaxSupply(factoryContract, tokenId),
                totalSupply: await getTotalSupply(factoryContract, tokenId),
            }
        }))
    }, [provider, pepemon, tokenIds])

    useEffect(() => {
        if (provider && tokenIds.length) {
            correctChainIsLoaded(pepemon).then((correct) => {
                if (correct) {
                    const factoryContract = getPepemonFactoryContract(pepemon);
                    fetchCardBalances(factoryContract).then((balances: any) => setCardsBalance(balances))
                }
            })
        }
    }, [provider, pepemon, tokenIds, transactions, chainId])

    return cardsBalance
}

export default useCardsFactoryData
