import React, { useContext, useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { StyledStoreBody } from './index';
import { Button, Title, Text, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreAside } from '../components';
import { theme } from '../../../theme';
import { useClaimBoosterPack, useWeb3Modal } from '../../../hooks';
import type { ReceivedCard } from '../../../hooks/useClaimBoosterPack';
import chains from '../../../constants/chains';

const BASE_SEPOLIA_CHAIN_ID = 84532;

// ─── Animations ──────────────────────────────────────────────────────────────

const popIn = keyframes`
  0%   { transform: scale(0.3) translateY(40px); opacity: 0; }
  65%  { transform: scale(1.1) translateY(-4px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 14px 3px rgba(168, 85, 247, 0.55); }
  50%       { box-shadow: 0 0 34px 10px rgba(168, 85, 247, 0.9), 0 0 54px 18px rgba(99,102,241,0.35); }
`;

// ─── Overlay styled components ────────────────────────────────────────────────

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

const CardOverlayLayer = styled.div<{ visible: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 24px;
  width: 100%;
  max-width: 560px;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 20px;
  backdrop-filter: blur(8px);
  opacity: ${p => (p.visible ? 1 : 0)};
  transform: ${p => (p.visible ? 'scale(1)' : 'scale(0.95)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: ${p => (p.visible ? 'auto' : 'none')};
`;

const CardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
`;

const CardSlot = styled.div<{ visible: boolean }>`
  width: 110px;
  opacity: ${p => (p.visible ? 1 : 0)};
  animation: ${p => (p.visible ? popIn : 'none')} 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: 10px;
  animation: ${glow} 2.4s ease-in-out infinite;
`;

const CardName = styled.p`
  color: #fff;
  font-size: 10px;
  text-align: center;
  margin: 5px 0 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const RevealTitle = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  text-shadow: 0 0 18px rgba(168,85,247,0.9);
  margin: 0;
`;

// ─── Aside layout ─────────────────────────────────────────────────────────────

const AsideContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.tabletL}) {
    height: 100%;
    overflow: hidden;
  }
`;

const ScrollableContent = styled.div`
  @media (min-width: ${theme.breakpoints.tabletL}) {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }
`;

const StickyBottom = styled.div`
  @media (min-width: ${theme.breakpoints.tabletL}) {
    flex-shrink: 0;
    background: #fff;
    padding-top: 12px;
    border-top: 1px solid ${theme.color.gray[100]};
  }
`;

const QuantityRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const QtyBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 6px 0;
  border-radius: 8px;
  border: 2px solid ${p => (p.active ? theme.color.purple[600] : theme.color.gray[200])};
  background: ${p => (p.active ? theme.color.purple[600] : 'transparent')};
  color: ${p => (p.active ? '#fff' : theme.color.gray[600])};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { border-color: ${theme.color.purple[600]}; }
`;

// ─── Card metadata ────────────────────────────────────────────────────────────

interface CardMeta { image: string; name: string; }

function useCardMeta(ids: number[]): Record<number, CardMeta> {
  const [meta, setMeta] = useState<Record<number, CardMeta>>({});
  const key = ids.join(',');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return meta;
}

// ─── Reveal overlay ───────────────────────────────────────────────────────────

interface RevealOverlayProps {
  phase: 'idle' | 'wallet-pending' | 'video-playing' | 'revealing';
  receivedCards: ReceivedCard[];
  onDismiss: () => void;
}

const RevealOverlay: React.FC<RevealOverlayProps> = ({ phase, receivedCards, onDismiss }) => {
  const videoRef      = useRef<HTMLVideoElement>(null);
  const [videoEnded,  setVideoEnded]  = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  const showOverlay = phase === 'video-playing' || phase === 'revealing';
  // Show cards when BOTH: tx confirmed AND video has played to the end
  const showCards   = phase === 'revealing' && videoEnded;

  // Expand receivedCards to individual card slots (2× card 2 → [2, 2])
  const cardList = receivedCards.flatMap(c => Array(c.amount).fill(c.id));
  const cardIds  = cardList.filter((v, i, a) => a.indexOf(v) === i);
  const meta     = useCardMeta(showCards ? cardIds : []);

  // Play video when overlay opens; it will stop at the end (no loop)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (showOverlay) {
      setVideoEnded(false);
      v.currentTime = 0;
      v.play().catch(() => {
        // Autoplay blocked — treat as immediately ended so cards can reveal
        setVideoEnded(true);
      });
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [showOverlay]);

  // If tx confirms before video ends: video keeps playing until onEnded.
  // If video ends before tx confirms: videoEnded = true, showCards waits for phase === 'revealing'.
  const handleVideoEnded = () => setVideoEnded(true);

  // Reveal cards one by one once showCards is true
  useEffect(() => {
    if (!showCards || cardList.length === 0) return;
    setRevealedCount(0);
    cardList.forEach((_, i) => {
      setTimeout(() => setRevealedCount(n => n + 1), 300 + i * 750);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCards]);

  // Reset counters when overlay closes
  useEffect(() => {
    if (!showOverlay) {
      setVideoEnded(false);
      setRevealedCount(0);
    }
  }, [showOverlay]);

  if (!showOverlay) return null;

  const allRevealed = cardList.length > 0 && revealedCount >= cardList.length;

  return (
    <Overlay>
      <FullVideo
        ref={videoRef}
        src="/videos/claim-reveal.mp4"
        muted
        playsInline
        onEnded={handleVideoEnded}
      />

      <CardOverlayLayer visible={showCards}>
        <RevealTitle>
          You pulled {cardList.length} {cardList.length === 1 ? 'card' : 'cards'}!
        </RevealTitle>
        <CardRow>
          {cardList.map((id, i) => {
            const revealed = i < revealedCount;
            return (
              <CardSlot key={i} visible={revealed}>
                {meta[id]?.image
                  ? <CardImg src={meta[id].image} alt={meta[id]?.name} />
                  : <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: 10, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✦</div>
                }
                <CardName>{meta[id]?.name || `#${id}`}</CardName>
              </CardSlot>
            );
          })}
        </CardRow>
        {allRevealed && (
          <Button styling="purple" width="100%" onClick={onDismiss}>
            Open another pack
          </Button>
        )}
      </CardOverlayLayer>
    </Overlay>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const QUANTITIES = [1, 3, 5];

const StorePacksAside: React.FC<any> = ({ setSelectedPack, selectedPack }) => {
  const [pepemon] = useContext(PepemonProviderContext);
  const { chainId, account } = pepemon;
  const [quantity, setQuantity] = useState(1);

  const onchainConfig  = selectedPack?.onchainConfig ?? null;
  const isLivePack     = onchainConfig !== null;
  const isOnRightChain = isLivePack && chainId === onchainConfig.chainId;

  const { onClaim, phase, receivedCards, claimError, onDismiss } = useClaimBoosterPack(
    onchainConfig ?? { chainId: 0, faucetAddress: '', factoryAddress: '', packId: 0, cardIds: [] }
  );

  const [, loadWeb3Modal] = useWeb3Modal() as any;

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

  const handleOpen = async () => {
    if (!account)      { await loadWeb3Modal(); return; }
    if (!isOnRightChain) { await switchToBaseSepolia(); return; }
    onClaim(quantity);
  };

  const buttonLabel = phase === 'wallet-pending'
    ? `Confirm in wallet… (${quantity > 1 ? `sign ${quantity}×` : 'signing'})`
    : isClaiming
    ? 'Opening pack…'
    : quantity > 1
    ? `Open ${quantity} Boosterpacks`
    : 'Open Boosterpack';

  const renderClaimArea = () => {
    if (!isLivePack) {
      return <Button disabled styling="purple" width="100%">Not available (yet)</Button>;
    }
    return (
      <>
        {!isClaiming && (
          <QuantityRow>
            {QUANTITIES.map(q => (
              <QtyBtn key={q} active={quantity === q} onClick={() => setQuantity(q)}>
                {q}×
              </QtyBtn>
            ))}
          </QuantityRow>
        )}
        <Button styling="purple" width="100%" disabled={isClaiming} onClick={handleOpen}>
          {buttonLabel}
        </Button>
        {claimError && (
          <>
            <Spacer size="sm"/>
            <Text as="p" font={theme.font.inter} size='xs' color="red">{claimError}</Text>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <RevealOverlay phase={phase} receivedCards={receivedCards} onDismiss={onDismiss} />
      <StoreAside close={() => setSelectedPack(null)} title="Selected Pack">
        <StyledStoreBody style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <AsideContent>
            <ScrollableContent style={{ padding: '1.1em' }}>
              <Title as="h2" font={theme.font.neometric} size='m'>{selectedPack.name}</Title>
              <Spacer size="sm"/>
              <Text as="p" font={theme.font.inter} size='s' lineHeight={1.3} color={theme.color.gray[600]}>
                When claiming this booster pack you will receive {selectedPack.cardsPerPack} random cards.
              </Text>
              <Spacer size="sm"/>
              <img loading="lazy" src={selectedPack.url} alt={selectedPack.name} style={{ width: '100%', display: 'block' }}/>
            </ScrollableContent>
            <StickyBottom style={{ padding: '0 1.1em 1.1em' }}>
              {renderClaimArea()}
            </StickyBottom>
          </AsideContent>
        </StyledStoreBody>
      </StoreAside>
    </>
  );
};

export default StorePacksAside;
