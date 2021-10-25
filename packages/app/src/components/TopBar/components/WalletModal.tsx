import React, { useState, useContext } from 'react';
import { Button, ExternalLink, Modal, ModalTitle, ModalContent, ModalActions, ModalProps, Spacer, Text } from "../../../components";
import { PepemonProviderContext } from "../../../contexts";
import { useWeb3Modal } from "../../../hooks";
import { theme } from "../../../theme";
import { chains } from "../../../constants";
import { copyText } from "../../../utils";

interface WalletModal extends ModalProps {
	account: string
}

const WalletModal: React.FC<WalletModal> = ({onDismiss, account}) => {
	const [copied, setCopied] = useState(false);
	const [{chainId}] = useContext(PepemonProviderContext);
	const [,,logoutOfWeb3Modal] = useWeb3Modal();

	const handleCopy = () => {
		copyText(account);
		setCopied(true);
	}

	const handleLogout = async () => {
		await logoutOfWeb3Modal();
		onDismiss();
	}

	const currentChain = chains.filter(chain => (parseInt(chain.chainId) === chainId) && chain.chainName);

    return (
        <Modal onDismiss={onDismiss}>
            <ModalTitle text="Your wallet" />
			<ModalContent>
				<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
					View your account on <ExternalLink href={`${currentChain[0]?.blockExplorerUrls}/address/${account}`}>{currentChain[0]?.blockExplorerTitle}</ExternalLink>
				</Text>
			</ModalContent>
			<Spacer size="md"/>
            <ModalActions>
				<Button styling="purple" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy address'}</Button>
				<Button styling="white" onClick={handleLogout}>{'Log out'}</Button>
            </ModalActions>
        </Modal>
    )
}

export default WalletModal
