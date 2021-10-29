import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
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
  }, [account, ppdexContract, pid])

  useEffect(() => {
    if (account && ppdexContract && pepemon) {
      fetchBalance()
    }
  }, [account, ppdexContract, setBalance, pepemon, fetchBalance])

  return balance
}

export default useEarnings
