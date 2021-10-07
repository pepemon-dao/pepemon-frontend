import { useCallback } from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import { unstake, getPpdexContract } from '../pepemon/utils'

const useUnstake = (pid: number) => {
  const { account } = usePepemon()
  const pepemon = usePepemon()
  const ppdexContract = getPpdexContract(pepemon)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(ppdexContract, pid, amount, account)
    },
    [account, pid, pepemon],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
