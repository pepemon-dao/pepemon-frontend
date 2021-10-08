import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {
    claimMerkle,
    getMerkleContract,
    getMerklePpblzContract, getMerklePpdexContract, getMerkleUniV2Contract
} from '../pepemon/utils'

export interface Merkle {
    account: string,
    index: number,
    amount: string,
    proof: string[],
}

const useClaimMerkle = (merkle: Merkle, merkleType?: 'ppblz' | 'ppdex' | 'univ2') => {
    const [isClaiming, setIsClaiming] = useState<boolean>(false)
    const { account } = usePepemon()
    const pepemon = usePepemon()
    const contract = merkleType ? (merkleType === 'ppblz' ? getMerklePpblzContract(pepemon) :
        (merkleType === 'ppdex' ? getMerklePpdexContract(pepemon) :
            getMerkleUniV2Contract(pepemon))) :
        getMerkleContract(pepemon);

    const handleClaimMerkle = useCallback(
        async () => {
            if (!merkle) {
                console.error('[useClaimMerkle] no merkle data');
                return;
            }
            try {
                setIsClaiming(true);
                await claimMerkle(
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
        [account, merkle, pepemon],
    )

    return { onClaimMerkle: handleClaimMerkle, isClaiming }
}

export default useClaimMerkle
