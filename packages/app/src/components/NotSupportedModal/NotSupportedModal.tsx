import React from 'react';
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from "../../components";
import { chains } from "../../constants";
import { theme } from "../../theme";

const NotSupportedModal: React.FC<{page: string}> = ({ page }) => {

    const changeChain = async(chainIdHex,rpcUrl,chainName) =>{
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainIdHex}], 
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              try {

                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{ chainId: chainIdHex, rpcUrls: [rpcUrl] ,  chainName: chainName
                  
                }],

                });
              } catch (addError) {
                // handle "add" error
                console.log("err",addError)
              }
            }
            // handle other "switch" errors
          }
    }
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
                <Button styling="purple" onClick={() => changeChain("0x1","https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161","Ethereum Mainnet")}>Switch to ETH</Button>
            </ModalActions>
        </Modal>
    )
}

export default NotSupportedModal
