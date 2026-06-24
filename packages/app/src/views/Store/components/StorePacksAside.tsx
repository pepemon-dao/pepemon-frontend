import React, { useContext } from "react";
import { StyledStoreBody } from './index';
import { Button, Title, Text, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreAside } from '../components';
import { theme } from '../../../theme';
import { useClaimBoosterPack } from '../../../hooks';
import { chains } from '../../../constants';

const BASE_SEPOLIA_CHAIN_ID = 84532;

const StorePacksAside: React.FC<any> = ({setSelectedPack, selectedPack}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId, account } = pepemon;

	const onchainConfig = selectedPack?.onchainConfig ?? null;
	const isLivePack = onchainConfig !== null;
	const isOnRightChain = isLivePack && chainId === onchainConfig.chainId;

	const { onClaim, isClaiming, claimError, claimSuccess } = useClaimBoosterPack(
		onchainConfig ?? { chainId: 0, faucetAddress: '', packId: 0, cardIds: [] }
	);

	const switchToBaseSepolia = async () => {
		const chain = chains.find(c => parseInt(c.chainId) === BASE_SEPOLIA_CHAIN_ID);
		if (!chain || !window.ethereum) return;
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chain.chainId }],
			});
		} catch (err: any) {
			if (err.code === 4902) {
				await window.ethereum.request({
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
				{isClaiming ? 'Claiming…' : 'Claim 3 cards'}
			</Button>
		);
	};

	return (
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
	);
};

export default StorePacksAside;
