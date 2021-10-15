import { useEffect, useState } from 'react'
import usePepemon from './usePepemon';

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const { provider }: { web3: any, provider: any } = usePepemon()

  useEffect(() => {
    let interval: any;
    if (!provider) return

    const setBlockNumber = async () => {
      const latestBlockNumber = await provider.getBlockNumber();
      if (block !== latestBlockNumber)
      setBlock(latestBlockNumber);
    }
    setBlockNumber().then(() => {
      interval = setInterval(async () => {
        await setBlockNumber()
      }, 10000)
    })
    return () => clearInterval(interval)

  }, [provider, block])

  return block
}

export default useBlock
