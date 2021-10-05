import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import usePepemon from './usePepemon'
import { Contract } from 'web3-eth-contract'

import {getAllowance} from '../utils/erc20'
import { getPpdexContract } from '../pepemon/utils'
import {correctChainIsLoaded} from '../utils/network';

const useAllowance = (lpContract: Contract, allowedContract?: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = usePepemon()
  const pepemon = usePepemon()
  const allowContract = allowedContract ? allowedContract : getPpdexContract(pepemon)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      allowContract,
      lpContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, allowContract, lpContract])

  useEffect(() => {
    correctChainIsLoaded(pepemon).then((correct) => {
      if (correct) {
        if (account && allowContract && lpContract) {
          fetchAllowance()
        }
        let refreshInterval = setInterval(fetchAllowance, 30000)
        return () => clearInterval(refreshInterval)
      }
    });
  }, [pepemon, account, allowContract, lpContract])

  return allowance
}

export default useAllowance
