import { useState, useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import usePepemon from './usePepemon';
import FaucetAbi from '../contracts/src/abis/boosterPackFaucet.json';
import { OnchainBoosterpackConfig } from '../constants/boosterpacks';

export interface ReceivedCard {
  id: number;
  amount: number;
}

export type ClaimPhase = 'idle' | 'wallet-pending' | 'video-playing' | 'revealing' | 'done';

const TRANSFER_SINGLE = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62';

function parseCards(receipt: any, userAddress: string, faucet: string, factory: string): ReceivedCard[] {
  return receipt.logs
    .filter((log: any) => {
      if (log.address.toLowerCase() !== factory.toLowerCase()) return false;
      if (log.topics[0] !== TRANSFER_SINGLE) return false;
      const from = '0x' + log.topics[2].slice(-40);
      const to   = '0x' + log.topics[3].slice(-40);
      return from.toLowerCase() === faucet.toLowerCase()
          && to.toLowerCase()   === userAddress.toLowerCase();
    })
    .map((log: any) => {
      const hex = log.data.slice(2);
      return {
        id:     parseInt(hex.slice(0, 64), 16),
        amount: parseInt(hex.slice(64, 128), 16),
      };
    });
}

const useClaimBoosterPack = (config: OnchainBoosterpackConfig) => {
  const pepemon = usePepemon();
  const [phase, setPhase]                = useState<ClaimPhase>('idle');
  const [receivedCards, setReceivedCards] = useState<ReceivedCard[]>([]);
  const [claimError, setClaimError]      = useState<string | null>(null);

  const onClaim = useCallback(async () => {
    if (!pepemon.provider) { setClaimError('No wallet connected'); return; }
    if (pepemon.chainId !== config.chainId) { setClaimError(`Switch to chainId ${config.chainId}`); return; }

    setClaimError(null);
    setReceivedCards([]);
    setPhase('wallet-pending');

    try {
      const signer = pepemon.provider.getSigner();
      const faucet = new Contract(config.faucetAddress, FaucetAbi, signer);
      const tx = await faucet.claimAndReveal(config.packId, config.cardIds);

      // Wallet confirmed — start showing the reveal video
      setPhase('video-playing');

      const receipt = await tx.wait();
      const userAddress = await signer.getAddress();
      const cards = parseCards(receipt, userAddress, config.faucetAddress, config.factoryAddress);
      setReceivedCards(cards);
      // Signal: tx done, cards parsed — overlay transitions when video min-time is up
      setPhase('revealing');
    } catch (e: any) {
      setPhase('idle');
      setClaimError(e?.reason || e?.message || 'Transaction failed');
    }
  }, [pepemon.provider, pepemon.chainId, config]);

  const onDismiss = useCallback(() => {
    setPhase('idle');
    setReceivedCards([]);
  }, []);

  return { onClaim, phase, receivedCards, claimError, onDismiss };
};

export default useClaimBoosterPack;
