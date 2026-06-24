import React, { useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { StyledStoreBody } from './index';
import { Button, Title, Text, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreAside } from '../components';
import { theme } from '../../../theme';
import { useClaimBoosterPack } from '../../../hooks';
import chains from '../../../constants/chains';

const BASE_SEPOLIA_CHAIN_ID = 84532;

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const OverlayVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ClaimRevealOverlay: React.FC<{ visible: boolean }> = ({ visible }) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (visible && videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.play().catch(() => {/* autoplay may be blocked */});
		} else if (!visible && videoRef.current) {
			videoRef.current.pause();
		}
	}, [visible]);

	if (!visible) return null;

	return (
		<FullScreenOverlay>
			<OverlayVideo
				ref={videoRef}
				src="/videos/claim-reveal.mp4"
				loop
				playsInline
			/>
		</FullScreenOverlay>
	);
};

const StorePacksAside: React.FC<any> = ({setSelectedPack, selectedPack}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId, account } = pepemon;

	const onchainConfig = selectedPack?.onchainConfig ?? null;
	const isLivePack = onchainConfig !== null;
	const isOnRightChain = isLivePack && chainId === onchainConfig.chainId;

	const { onClaim, isClaiming, isSubmitted, claimError, claimSuccess } = useClaimBoosterPack(
		onchainConfig ?? { chainId: 0, faucetAddress: '', packId: 0, cardIds: [] }
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

	const renderButton = () => {
		if (!isLivePack) {
			return (
				<Button disabled styling="purple" width="100%">
					Not available (yet)
				</Button>
			);
		}

		if (!account) {
			return (
				<Button disabled styling="purple" width="100%">
					Connect wallet to claim
				</Button>
			);
		}

		if (!isOnRightChain) {
			return (
				<Button styling="purple" width="100%" onClick={switchToBaseSepolia}>
					Switch to Base Sepolia
				</Button>
			);
		}

		if (claimSuccess) {
			return (
				<Button disabled styling="purple" width="100%">
					✓ Cards sent to your wallet!
				</Button>
			);
		}

		return (
			<Button
				styling="purple"
				width="100%"
				disabled={isClaiming}
				onClick={onClaim}
			>
				{isClaiming && !isSubmitted ? 'Confirm in wallet…' : isClaiming ? 'Confirming on chain…' : 'Claim 3 cards'}
			</Button>
		);
	};

	return (
		<>
			<ClaimRevealOverlay visible={isSubmitted} />
			<StoreAside close={() => setSelectedPack(null)} title="Selected Pack">
				<StyledStoreBody>
					<Title as="h2" font={theme.font.neometric} size='m'>{selectedPack.name}</Title>
					<Spacer size="sm"/>
					<Text as="p" font={theme.font.inter} size='s' lineHeight={1.3} color={theme.color.gray[600]}>
						When claiming this booster pack you will recieve {selectedPack.cardsPerPack} random cards.
					</Text>
					<Spacer size="sm"/>
					<img loading="lazy" src={selectedPack.url} alt={selectedPack.name} style={{width: "100%"}}/>
					<Spacer size='md'/>
					{renderButton()}
					{claimError && (
						<>
							<Spacer size="sm"/>
							<Text as="p" font={theme.font.inter} size='xs' color="red">
								{claimError}
							</Text>
						</>
					)}
				</StyledStoreBody>
			</StoreAside>
		</>
	);
};

export default StorePacksAside;
