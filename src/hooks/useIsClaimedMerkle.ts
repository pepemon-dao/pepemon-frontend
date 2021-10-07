import {useCallback, useEffect, useState} from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {
    getMerkleContract,
    getMerklePpblzContract,
    getMerklePpdexContract,
    getMerkleUniV2Contract,
    merkleIsClaimed
} from '../pepemon/utils'

const useIsClaimedMerkle = (index: number, merkleType?: 'ppblz' | 'ppdex' | 'univ2') => {
    const [isClaimed, setIsClaimed] = useState(null);
    const { account } = usePepemon()
    const pepemon = usePepemon()
    const contract = merkleType ? (merkleType === 'ppblz' ? getMerklePpblzContract(pepemon) :
        (merkleType === 'ppdex' ? getMerklePpdexContract(pepemon) :
            getMerkleUniV2Contract(pepemon))) :
        getMerkleContract(pepemon);

    const handleClaimedMerkle = useCallback(
        async () => {
            try {
                return merkleIsClaimed(
                    contract,
                    index,
                )
            } catch(err) {
                console.error(err);
            }
        },
        [account, index, pepemon],
    )

    useEffect(() => {
        if (index) {
            handleClaimedMerkle().then((claimed) => {
                setIsClaimed(claimed);
            })
        }
    }, [account, index])

    return isClaimed;
}

export default useIsClaimedMerkle
