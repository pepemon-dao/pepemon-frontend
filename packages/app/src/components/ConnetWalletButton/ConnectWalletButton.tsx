import React from 'react';
import Button from '../Button/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatAddress } from '../../utils';

function ConnectWalletButton() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
			}) => {
				return (
					<>
						<Button
							styling='green'
							title={account ? 'Your wallet' : 'Connect wallet'}
							onClick={() =>
								!account ? openConnectModal() : openAccountModal()
							}>
							{!account ? 'Connect Wallet' : formatAddress(account?.address)}
						</Button>
					</>
				);
			}}
		</ConnectButton.Custom>
	);
}

export default ConnectWalletButton;
