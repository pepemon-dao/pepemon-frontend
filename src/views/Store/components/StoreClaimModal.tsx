import React from 'react';
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Text, Spacer } from '../../../components';
import { theme } from '../../../theme';

const StoreClaimModal: React.FC<any> = ({dismiss, claimButtonText}) => {
	return (
		<Modal onDismiss={() => dismiss()} maxWidth={theme.page.maxWidth}>
		    <ModalTitle text="Claim ice pack" />
			<ModalContent>
				<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
		  			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				</Text>
			</ModalContent>
			<Spacer size="md"/>
			<ModalActions>
				<Button styling="white" onClick={() => dismiss()}>Cancel</Button>
				<Button styling="purple">{claimButtonText}</Button>
			</ModalActions>
		</Modal>
	)
}

export default StoreClaimModal;
