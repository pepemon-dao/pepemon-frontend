import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import {getPepemonFactoryContract, setApprovalForAll, getPepemonStakeAddress} from '../pepemon/utils'

const useSetApprovalForAll = () => {
    const [isApproving, setIsApproving] = useState<boolean>(false)
    const { account } = usePepemon()
    const pepemon = usePepemon()

    const handleSetApprovalForAll = useCallback(
        async () => {
            try {
                setIsApproving(true);
                await setApprovalForAll(
                    pepemon.provider,
                    getPepemonFactoryContract(pepemon),
                    getPepemonStakeAddress(pepemon),
                )
                setIsApproving(false);
            } catch(err) {
                console.error(err);
                setIsApproving(false);
            }
        },
        [account, pepemon],
    )

    return { onSetApprovalForAll: handleSetApprovalForAll, isApproving }
}

export default useSetApprovalForAll
