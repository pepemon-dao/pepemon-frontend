import React from 'react';
import Modal from '../Modal';
import ModalTitle from '../ModalTitle';
import ModalContent from '../ModalContent';
import {chainTitle} from '../TopBar/components/NetworkSwitch';
import Button from '../Button';
import ModalActions from '../ModalActions';

const NotSupportedModal: React.FC<any> = ({ onDismiss, setChainId, chainId, page }) => {

    return (
        <Modal>
            <ModalTitle text="Not (yet) supported" />
            <ModalContent>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexGrow: 0 }}>
                    {`${chainTitle(chainId)} network is currently not supported on the ${page} page.`}
                    <div style={{maxWidth: '20rem', paddingTop: '1rem'}}>

                    </div>
                </div>
            </ModalContent>
            <ModalActions>
                <Button onClick={() => {
                    setChainId(1);
                }} text="SWITCH TO ETH"/>
            </ModalActions>
        </Modal>
    )
}

export default NotSupportedModal
