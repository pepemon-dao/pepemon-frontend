import { useCallback } from 'react'

import usePepemon from './usePepemon'


import { unstake, getPpdexContract } from '../pepemon/utils'

const useUnstake = (pid: number) => {
  const { account } = usePepemon()
  const pepemon = usePepemon()
  const ppdexContract = getPpdexContract(pepemon)

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstake(ppdexContract, pid, amount, account)
    },
    [ppdexContract, pid, account],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
