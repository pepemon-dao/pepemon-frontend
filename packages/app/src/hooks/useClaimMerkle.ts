import {useCallback, useState} from 'react'
import usePepemon from './usePepemon'
import { claimMerkle, getMerkleContract, getMerkleDegoContract, getMerklePpblzContract, getMerklePpdexContract } from '../pepemon/utils'
import {Contract} from '@ethersproject/contracts';

export interface Merkle {
    account: string,
    index: number,
    amount: string,
    proof: string[],
}

const useClaimMerkle = (merkle: Merkle, merkleType?: 'ppblz' | 'ppdex' | 'univ2' | 'dego') => {
    const [isClaiming, setIsClaiming] = useState<boolean>(false)
    const { provider } = usePepemon()
    const pepemon = usePepemon()
    let contract: Contract;

    switch (merkleType) {
        case 'ppblz':
            contract = getMerklePpblzContract(pepemon);
            break;
        case 'ppdex':
            contract = getMerklePpdexContract(pepemon);
            break;
        case 'dego':
            contract = getMerkleDegoContract(pepemon);
            break;
        default:
            contract = getMerkleContract(pepemon);
    }

    const handleClaimMerkle = useCallback(
        async () => {
            if (!merkle) {
                console.error('[useClaimMerkle] no merkle data');
                return;
            }
            try {
                setIsClaiming(true);
                await claimMerkle(
                    provider,
                    contract,
                    merkle.index,
                    merkle.account,
                    merkle.amount,
                    merkle.proof,
                )
                setIsClaiming(false);
            } catch(err) {
                console.error(err);
                setIsClaiming(false);
            }
        },
        [merkle, contract, provider],
    )

    return { onClaimMerkle: handleClaimMerkle, isClaiming }
}

export default useClaimMerkle
