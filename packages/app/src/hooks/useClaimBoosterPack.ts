import { useState, useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import usePepemon from './usePepemon';
import FaucetAbi from '../contracts/src/abis/boosterPackFaucet.json';
import { OnchainBoosterpackConfig } from '../constants/boosterpacks';

const useClaimBoosterPack = (config: OnchainBoosterpackConfig) => {
  const pepemon = usePepemon();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const onClaim = useCallback(async () => {
    setClaimError(null);
    setClaimSuccess(false);

    if (!pepemon.provider) {
      setClaimError('No wallet connected');
      return false;
    }
    if (pepemon.chainId !== config.chainId) {
      setClaimError(`Switch to chainId ${config.chainId}`);
      return false;
    }

    setIsClaiming(true);
    try {
      const signer = pepemon.provider.getSigner();
      const faucet = new Contract(config.faucetAddress, FaucetAbi, signer);
      const tx = await faucet.claimAndReveal(config.packId, config.cardIds);
      await tx.wait();
      setClaimSuccess(true);
      return true;
    } catch (e: any) {
      const msg = e?.reason || e?.message || 'Transaction failed';
      setClaimError(msg);
      return false;
    } finally {
      setIsClaiming(false);
    }
  }, [pepemon.provider, pepemon.chainId, config]);

  return { onClaim, isClaiming, claimError, claimSuccess };
};

export default useClaimBoosterPack;
