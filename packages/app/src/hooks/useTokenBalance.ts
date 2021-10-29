import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getBalance } from '../utils';
import usePepemon from './usePepemon';
import { correctChainIsLoaded } from '../utils/network';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const pepemon = usePepemon();
  const { account, provider }: { account: string; provider: any } = pepemon;

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(provider, tokenAddress, account);
    setBalance(new BigNumber(balance))
  }, [account, provider, tokenAddress])

  useEffect(() => {
    if (account) {
      correctChainIsLoaded(pepemon).then((correct) => {
        if (correct) {
          fetchBalance()
        }
      });
    }
  }, [account, fetchBalance, pepemon])

  return balance
}

export default useTokenBalance
