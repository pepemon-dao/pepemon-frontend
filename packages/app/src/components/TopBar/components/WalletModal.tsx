import React, { useState, useContext } from 'react';
import { Button, ExternalLink, Modal, ModalTitle, ModalContent, ModalActions, ModalProps, Spacer, Text } from "../../../components";
import { PepemonProviderContext } from "../../../contexts";
import { theme } from "../../../theme";
import { copyText } from "../../../utils";

interface WalletModal extends ModalProps {
	account: string
}

const WalletModal: React.FC<WalletModal> = ({onDismiss, account}) => {
	const [copied, setCopied] = useState(false);
	const [, dispatch] = useContext(PepemonProviderContext);

	const handleCopy = () => {
		copyText(account);
		setCopied(true);
	}

	const handleLogout = async () => {
		await dispatch({type: 'reset'});
		onDismiss();
	}

    return (
        <Modal onDismiss={onDismiss}>
            <ModalTitle text="Your wallet" />
			<ModalContent>
				<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
					View your account on <ExternalLink href={`https://etherscan.io/address/${account}`}>Etherscan</ExternalLink>
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