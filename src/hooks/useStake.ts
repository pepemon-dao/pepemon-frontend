import { useCallback } from 'react'

import usePepemon from './usePepemon'
// import { useWallet } from 'use-wallet'

import { stake, getPpdexContract } from '../pepemon/utils'

const useStake = (pid: number) => {
  const { account } = usePepemon()
  const pepemon = usePepemon()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getPpdexContract(pepemon),
        pid,
        amount,
        account,
      )
    },
    [account, pid, pepemon],
  )

  return { onStake: handleStake }
}

export default useStake
