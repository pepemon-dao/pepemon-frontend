import React from 'react';
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from "../../components";
import { theme } from "../../theme";

const NotSupportedModal: React.FC<{page: string}> = ({ page }) => {

    return (
        <Modal>
            <ModalTitle text="Not (yet) supported" />
            <ModalContent>
				<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
                	{`Your chosen network is currently not supported on the ${page} page.`}
				</Text>
				<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
					Please change your wallet provider's network to ETH.
				</Text>
            </ModalContent>
			<Spacer size="md"/>
            <ModalActions>
                <Button styling="purple" disabled>Switch to ETH</Button>
            </ModalActions>
        </Modal>
    )
}

export default NotSupportedModal
