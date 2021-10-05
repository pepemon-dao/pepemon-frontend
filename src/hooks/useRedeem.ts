import { useCallback } from 'react'
// import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../pepemon/utils'
import usePepemon from './usePepemon';

const useRedeem = (contract: Contract) => {
  const { account } = usePepemon()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(contract, account)
    return txHash
  }, [account, contract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
