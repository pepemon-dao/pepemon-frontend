import {useCallback, useState} from 'react'
import usePepemon from './usePepemon'
import { Contract } from 'web3-eth-contract'
import { approve, getPpdexContract } from '../pepemon/utils'

const useApprove = (spenderContract: Contract, approvalContract?: Contract) => {
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const pepemon = usePepemon()
  // @ts-ignore
  const approveContract = approvalContract ? approvalContract : getPpdexContract(pepemon)

  const handleApprove = useCallback(async () => {
    try {
      if (!approveContract) {
        return false;
      }

      setIsApproving(true);
      const tx = await approve(pepemon.provider, approveContract, spenderContract)

      setIsApproving(false)
      return tx
    } catch (e) {
      setIsApproving(false)
      return false
    }
}, [spenderContract, approveContract, pepemon.provider])

  return { onApprove: handleApprove, isApproving }
}

export default useApprove
