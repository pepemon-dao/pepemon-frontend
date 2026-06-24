import { useState, useCallback } from 'react';
import { Contract } from '@ethersproject/contracts';
import usePepemon from './usePepemon';
import FaucetAbi from '../contracts/src/abis/boosterPackFaucet.json';
import { OnchainBoosterpackConfig } from '../constants/boosterpacks';

export interface ReceivedCard {
  id: number;
  amount: number;
}

export type ClaimPhase = 'idle' | 'wallet-pending' | 'video-playing' | 'revealing';

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
      return { id: parseInt(hex.slice(0, 64), 16), amount: parseInt(hex.slice(64, 128), 16) };
    });
}

// Merge duplicate card IDs by summing amounts
function mergeCards(cards: ReceivedCard[]): ReceivedCard[] {
  const map = new Map<number, number>();
  cards.forEach(c => map.set(c.id, (map.get(c.id) ?? 0) + c.amount));
  return Array.from(map.entries()).map(([id, amount]) => ({ id, amount }));
}

const useClaimBoosterPack = (config: OnchainBoosterpackConfig) => {
  const pepemon = usePepemon();
  const [phase, setPhase]                = useState<ClaimPhase>('idle');
  const [receivedCards, setReceivedCards] = useState<ReceivedCard[]>([]);
  const [claimError, setClaimError]      = useState<string | null>(null);
  const [packCount, setPackCount]        = useState(0); // how many packs are being opened

  const onClaim = useCallback(async (quantity: number = 1) => {
    if (!pepemon.provider) { setClaimError('No wallet connected'); return; }
    if (pepemon.chainId !== config.chainId) { setClaimError(`Switch to chainId ${config.chainId}`); return; }

    setClaimError(null);
    setReceivedCards([]);
    setPackCount(quantity);
    setPhase('wallet-pending');

    try {
      const signer  = pepemon.provider.getSigner();
      const faucet  = new Contract(config.faucetAddress, FaucetAbi, signer);
      const userAddress = await signer.getAddress();

      // Submit all N transactions (N wallet popups in sequence), collect tx objects
      const txs: any[] = [];
      for (let i = 0; i < quantity; i++) {
        const tx = await faucet.claimAndReveal(config.packId, config.cardIds);
        txs.push(tx);
        // Start the video as soon as the first tx is submitted
        if (i === 0) setPhase('video-playing');
      }

      // Wait for all to confirm concurrently (video plays during this)
      const receipts = await Promise.all(txs.map((tx: any) => tx.wait()));

      // Parse all cards from all receipts, merge amounts
      const all = receipts.flatMap((receipt: any) =>
        parseCards(receipt, userAddress, config.faucetAddress, config.factoryAddress)
      );
      setReceivedCards(mergeCards(all));
      setPhase('revealing');
    } catch (e: any) {
      setPhase('idle');
      setClaimError(e?.reason || e?.message || 'Transaction failed');
    }
  }, [pepemon.provider, pepemon.chainId, config]);

  const onDismiss = useCallback(() => {
    setPhase('idle');
    setReceivedCards([]);
    setPackCount(0);
  }, []);

  return { onClaim, phase, packCount, receivedCards, claimError, onDismiss };
};

export default useClaimBoosterPack;
