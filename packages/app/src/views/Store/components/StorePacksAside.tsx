import React, { useContext, useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { StyledStoreBody } from './index';
import { Button, Title, Text, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreAside } from '../components';
import { theme } from '../../../theme';
import { useClaimBoosterPack } from '../../../hooks';
import type { ReceivedCard } from '../../../hooks/useClaimBoosterPack';
import chains from '../../../constants/chains';

const BASE_SEPOLIA_CHAIN_ID = 84532;
// Video plays a minimum of this long before card reveal starts, even if the chain confirms faster
const VIDEO_MIN_MS = 6000;

// ─── Animations ──────────────────────────────────────────────────────────────

const popIn = keyframes`
  0%   { transform: scale(0.4) translateY(60px); opacity: 0; }
  70%  { transform: scale(1.08) translateY(-6px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 18px 4px rgba(168, 85, 247, 0.5); }
  50%       { box-shadow: 0 0 38px 12px rgba(168, 85, 247, 0.9), 0 0 60px 20px rgba(99,102,241,0.4); }
`;

// ─── Styled components ────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FullVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RevealLayer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
`;

const CardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const CardSlot = styled.div<{ delay: number; visible: boolean }>`
  width: 120px;
  opacity: ${p => (p.visible ? 1 : 0)};
  animation: ${p => (p.visible ? popIn : 'none')} 0.6s cubic-bezier(0.34,1.56,0.64,1) ${p => p.delay}ms both;
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: 12px;
  animation: ${glow} 2s ease-in-out infinite;
`;

const CardBack = styled.div`
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const CardName = styled.p`
  color: #fff;
  font-size: 11px;
  text-align: center;
  margin: 6px 0 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const RevealTitle = styled.h2`
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  text-shadow: 0 0 20px rgba(168,85,247,0.8);
  margin: 0;
`;

// ─── Card metadata ────────────────────────────────────────────────────────────

interface CardMeta { image: string; name: string; }

function useCardMeta(ids: number[]): Record<number, CardMeta> {
  const [meta, setMeta] = useState<Record<number, CardMeta>>({});
  useEffect(() => {
    if (!ids.length) return;
    const unique = Array.from(new Set(ids));
    Promise.all(
      unique.map(id =>
        fetch(`/metadata/cards/${id}`)
          .then(r => r.json())
          .then(d => ({
            id,
            image: (d.image || '').replace('https://pepemon.world/', '/'),
            name: d.name || `Card #${id}`,
          }))
          .catch(() => ({ id, image: '', name: `Card #${id}` }))
      )
    ).then(results => {
      const m: Record<number, CardMeta> = {};
      results.forEach(r => { m[r.id] = { image: r.image, name: r.name }; });
      setMeta(m);
    });
  }, [ids.join(',')]);
  return meta;
}

// ─── Reveal overlay ───────────────────────────────────────────────────────────

interface RevealOverlayProps {
  phase: 'idle' | 'wallet-pending' | 'video-playing' | 'revealing' | 'done';
  receivedCards: ReceivedCard[];
  packImageUrl: string;
  onDismiss: () => void;
}

const RevealOverlay: React.FC<RevealOverlayProps> = ({ phase, receivedCards, packImageUrl, onDismiss }) => {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [videoMinElapsed, setVideoMinElapsed] = useState(false);
  const [revealedCount,   setRevealedCount]   = useState(0);

  const showOverlay   = phase === 'video-playing' || phase === 'revealing';
  const showReveal    = phase === 'revealing' && videoMinElapsed;
  const showVideo     = showOverlay && !showReveal;

  // Expand cards to individual items (2× card 2 → [2, 2])
  const cardList = receivedCards.flatMap(c => Array(c.amount).fill(c.id));
  const cardIds  = cardList.filter((v, i, a) => a.indexOf(v) === i);
  const meta     = useCardMeta(showReveal ? cardIds : []);

  // Start min-play timer when video phase begins
  useEffect(() => {
    if (phase === 'video-playing' && !videoMinElapsed) {
      timerRef.current = setTimeout(() => setVideoMinElapsed(true), VIDEO_MIN_MS);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Play / pause video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (showVideo) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [showVideo]);

  // Reveal cards one by one once showReveal is true
  useEffect(() => {
    if (!showReveal || cardList.length === 0) return;
    setRevealedCount(0);
    cardList.forEach((_, i) => {
      setTimeout(() => setRevealedCount(n => n + 1), 400 + i * 900);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReveal]);

  // Reset on close
  useEffect(() => {
    if (!showOverlay) {
      setVideoMinElapsed(false);
      setRevealedCount(0);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [showOverlay]);

  if (!showOverlay) return null;

  const allRevealed = revealedCount >= cardList.length && cardList.length > 0;

  return (
    <Overlay>
      {/* Video is always rendered so browser can buffer it; visibility controlled via opacity */}
      <FullVideo
        ref={videoRef}
        src="/videos/claim-reveal.mp4"
        loop
        muted
        playsInline
        style={{ opacity: showVideo ? 1 : 0, transition: 'opacity 0.8s' }}
      />

      {showReveal && (
        <RevealLayer>
          <RevealTitle>You got {cardList.length} {cardList.length === 1 ? 'card' : 'cards'}!</RevealTitle>
          <CardRow>
            {cardList.map((id, i) => {
              const revealed = i < revealedCount;
              const cardMeta = meta[id];
              return (
                <CardSlot key={i} delay={0} visible={revealed}>
                  {revealed && cardMeta?.image
                    ? <CardImg src={cardMeta.image} alt={cardMeta?.name || `Card #${id}`} />
                    : <CardBack>✦</CardBack>
                  }
                  <CardName>{revealed ? (meta[id]?.name || `#${id}`) : '???'}</CardName>
                </CardSlot>
              );
            })}
          </CardRow>
          {allRevealed && (
            <Button styling="purple" width="100%" onClick={onDismiss}>
              Claim another pack
            </Button>
          )}
        </RevealLayer>
      )}
    </Overlay>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const StorePacksAside: React.FC<any> = ({ setSelectedPack, selectedPack }) => {
  const [pepemon] = useContext(PepemonProviderContext);
  const { chainId, account } = pepemon;

  const onchainConfig = selectedPack?.onchainConfig ?? null;
  const isLivePack    = onchainConfig !== null;
  const isOnRightChain = isLivePack && chainId === onchainConfig.chainId;

  const { onClaim, phase, receivedCards, claimError, onDismiss } = useClaimBoosterPack(
    onchainConfig ?? { chainId: 0, faucetAddress: '', factoryAddress: '', packId: 0, cardIds: [] }
  );

  const switchToBaseSepolia = async () => {
    const chain = chains.find(c => parseInt(c.chainId, 16) === BASE_SEPOLIA_CHAIN_ID);
    if (!chain || !window.ethereum) return;
    try {
      await (window.ethereum as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain.chainId }],
      });
    } catch (err: any) {
      if (err.code === 4902) {
        await (window.ethereum as any).request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chain.chainId,
            chainName: chain.chainName,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls: chain.blockExplorerUrls,
          }],
        });
      }
    }
  };

  const isClaiming = phase === 'wallet-pending' || phase === 'video-playing' || phase === 'revealing';

  const renderButton = () => {
    if (!isLivePack) {
      return <Button disabled styling="purple" width="100%">Not available (yet)</Button>;
    }
    if (!account) {
      return <Button disabled styling="purple" width="100%">Connect wallet to claim</Button>;
    }
    if (!isOnRightChain) {
      return <Button styling="purple" width="100%" onClick={switchToBaseSepolia}>Switch to Base Sepolia</Button>;
    }
    if (phase === 'done') {
      return <Button disabled styling="purple" width="100%">✓ Cards sent to your wallet!</Button>;
    }
    return (
      <Button styling="purple" width="100%" disabled={isClaiming} onClick={onClaim}>
        {phase === 'wallet-pending' ? 'Confirm in wallet…'
          : phase === 'video-playing' ? 'Opening pack…'
          : phase === 'revealing' ? 'Revealing…'
          : 'Claim 3 cards'}
      </Button>
    );
  };

  return (
    <>
      <RevealOverlay
        phase={phase}
        receivedCards={receivedCards}
        packImageUrl={selectedPack.url}
        onDismiss={onDismiss}
      />
      <StoreAside close={() => setSelectedPack(null)} title="Selected Pack">
        <StyledStoreBody>
          <Title as="h2" font={theme.font.neometric} size='m'>{selectedPack.name}</Title>
          <Spacer size="sm"/>
          <Text as="p" font={theme.font.inter} size='s' lineHeight={1.3} color={theme.color.gray[600]}>
            When claiming this booster pack you will recieve {selectedPack.cardsPerPack} random cards.
          </Text>
          <Spacer size="sm"/>
          <img loading="lazy" src={selectedPack.url} alt={selectedPack.name} style={{ width: '100%' }}/>
          <Spacer size='md'/>
          {renderButton()}
          {claimError && (
            <>
              <Spacer size="sm"/>
              <Text as="p" font={theme.font.inter} size='xs' color="red">{claimError}</Text>
            </>
          )}
        </StyledStoreBody>
      </StoreAside>
    </>
  );
};

export default StorePacksAside;
