import {useCallback, useState} from 'react'

import usePepemon from './usePepemon'


import {getPepemonFactoryContract, setApprovalForAll, getPepemonStakeAddress} from '../pepemon/utils'

const useSetApprovalForAll = () => {
    const [isApproving, setIsApproving] = useState<boolean>(false)
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
        [pepemon],
    )

    return { onSetApprovalForAll: handleSetApprovalForAll, isApproving }
}

export default useSetApprovalForAll
