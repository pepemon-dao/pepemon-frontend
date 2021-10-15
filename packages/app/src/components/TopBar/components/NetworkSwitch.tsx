import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useModal, usePepemon, useDetectMobileScreen } from '../../../hooks';
import { Button, DropdownMenu, Loader, Modal, ModalContent, ModalTitle, ModalActions, Spacer } from '../../../components';
import styled from 'styled-components';

interface NetworkSwitchProps {
    ethChainId: number;
    setEthChainId: (chainId: number) => void;
}

export const chainTitle = (id: number) => {
    switch (id) {
        case 1: return 'ETH';
        case 4: return 'RINKEBY';
        case 56: return 'BSC';
        case 137: return 'MATIC';
        default: return 'UNSUPPORTED';
    }
}

export const NetworkModal: React.FC<any> = ({ onDismiss, options, chainId, setEthChainId, providerChainId }) => {
    return (
        <Modal>
            <ModalTitle text="Wrong network" />
            <ModalContent>
                <Spacer />
                <Loader />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {`Please change your wallet providers network to ${chainTitle(chainId)}`}
                </div>
            </ModalContent>
            <ModalActions>
                {options.includes(chainTitle(providerChainId)) ?
                    <Button onClick={() => {
                        setEthChainId(parseInt(providerChainId));
                    }} text={`USE ${chainTitle(providerChainId)}`}/>:
                    <Button onClick={() => {
                        setEthChainId(providerChainId)
                        onDismiss();
                    }} text="Cancel"/>
                }
            </ModalActions>
        </Modal>
    )
}

const NetworkSwitch: React.FC<NetworkSwitchProps> = ({ ethChainId, setEthChainId }) => {
	const location = useLocation();
	const pepemon = usePepemon();
	const isMobileResolution = useDetectMobileScreen();
	const [options, setOptions] = useState([]);


    // @ts-ignore
    const [providerChainId, setProviderChainId] = useState((window.ethereum && parseInt(window.ethereum.chainId)) || 1);
    const [onPresentNetworkModal, onDismissNetworkModal] = useModal(
        <>{ options.length > 1 && <NetworkModal
            chainId={ethChainId}
            setEthChainId={setEthChainId}
            providerChainId={providerChainId}
            location={location}
            options={options.map(option => option.title)}
        />}</>,
        'wrong-network-modal'
    )

    // useEffect(() => {
    //     // @ts-ignore
    //     window.ethereum && window.ethereum.on('chainChanged', (changedChainId: string) => {
    //         setProviderChainId(parseInt(changedChainId));
    //     })
    // }, []);

    useEffect(() => {
        pepemon.provider && pepemon.provider.getNetwork().then((network: any) => {
            setProviderChainId(parseInt(network.chainId));
        })
    }, [pepemon.provider])

    useEffect(() => {
		const handleSetChainId = (id: number) => {
			setEthChainId(id);
		}

		const networkOptions = () => {
	        const options = [
	            {title: 'ETH', onClick: () => handleSetChainId(1)},
	            // {title: 'RINKEBY', onClick: () => handleSetChainId(4)},
	        ]
	        if (location.pathname === '/store' || location.pathname === '/pepemon-dego-promo') {
	            // options.push({title: 'MATIC', onClick: () => handleSetChainId(137)});
	            options.push({title: 'BSC', onClick: () => handleSetChainId(56)});
	        }
	        return options;
	    }

        setOptions(networkOptions());
    }, [location.pathname, setEthChainId])

    useEffect(() => {
        if (providerChainId !== ethChainId) {
            return onPresentNetworkModal();
        }
        if (providerChainId === ethChainId && options.map(option => option.title).includes(chainTitle(providerChainId))) {
            return onDismissNetworkModal()
        }
    }, [options, ethChainId, providerChainId, onPresentNetworkModal, onDismissNetworkModal])

    return (
        <StyledWrapper>
            <DropdownMenu
                title={chainTitle(ethChainId)}
                options={options}
                style={{
                    width: isMobileResolution ? '80px' : '120px',
                    fontFamily: 'original',
                    fontSize: '22px',
                    bgColor: 'off',
                    color: '#1D3557',
                }}
            >
            </DropdownMenu>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  padding-right: ${(props) => props.theme.spacing[4]}px;
  @media (max-width: 400px) {
    padding-right: ${(props) => props.theme.spacing[1]}px;
  }
`
export default NetworkSwitch
