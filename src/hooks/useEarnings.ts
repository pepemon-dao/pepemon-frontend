import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
// import { useWallet } from 'use-wallet'

import { getEarned, getPpdexContract } from '../pepemon/utils'
import usePepemon from './usePepemon';

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
  }: { account: string } = usePepemon()
  const pepemon = usePepemon()
  const ppdexContract = getPpdexContract(pepemon)

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(ppdexContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, ppdexContract, pepemon])

  useEffect(() => {
    if (account && ppdexContract && pepemon) {
      fetchBalance()
    }
  }, [account, ppdexContract, setBalance, pepemon])

  return balance
}

export default useEarnings
