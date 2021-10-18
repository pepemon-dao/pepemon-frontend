import React, { useState,useCallback, useRef, useContext } from "react";
import styled from "styled-components";
import { up_down_arrows_dark } from "../../../assets";
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from "../../../components";
import { chains } from "../../../constants";
import { PepemonProviderContext } from "../../../contexts";
import { theme } from "../../../theme";
import { useOutsideClick } from "../../../hooks";
import { useWeb3Modal,useTokenPrices, usePepemon, useTokenBalance } from "../../../hooks";

const NetworkSwitch: React.FC<any> = () => {
	const [chainsListActive, setChainsListActive] = useState(false);
	const networkSwitchRef = useRef(null);
	useOutsideClick(networkSwitchRef, () => {
		if (chainsListActive) {
			setChainsListActive(false);
		}
	})

	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];
	const [currentChainId, setCurrentChainId] = useState(chainId); // set currentChainId to handle chain switch
	const [provider, loadWeb3Modal] = useWeb3Modal();


	const chainSwitch = useCallback(async(chainId) =>{
		var chainIdHex ="";
		var rpcUrl ="";
		var chainName ="";
				switch(chainId) {
					case "1":
						chainIdHex = '0x1';
						rpcUrl= "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
						chainName= "Ethereum Mainnet"

						changeChain(chainIdHex,rpcUrl,chainName)
		 return changeChain(chainIdHex,rpcUrl,chainName)
					case "4":
						chainIdHex = '0x4';
						rpcUrl= "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
						chainName= "Rinkeby Test Network"
						 

						return changeChain(chainIdHex,rpcUrl,chainName)
						case "56":
						chainIdHex = '0x38';
						rpcUrl= "https://bsc-dataseed.binance.org/";
						chainName= "Smart Chain"
						changeChain(chainIdHex,rpcUrl,chainName)


						return ""
						case "137":
						chainIdHex = '0x89';
						rpcUrl= "https://rpc-mainnet.matic.network";
						chainName= "Matic Mainnet"
						

						return changeChain(chainIdHex,rpcUrl,chainName)
						default:
							changeChain(chainIdHex,rpcUrl,chainName)
						break;
		
				  }
		
			},[loadWeb3Modal]);


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
		<>
			<ChainsListButton onClick={() => setChainsListActive(!chainsListActive)}>{
				chains[chainId] ? chains[currentChainId] : 'Not connected'
			}</ChainsListButton>
			<img alt="change network" src={up_down_arrows_dark} style={{ width: ".5em", marginLeft: ".8em" }}/>
			<ChainsList isOpen={chainsListActive} ref={networkSwitchRef}>
				{ Object.keys(chains).map((chainId, key) => {
					const chainName = chains[chainId.toString() as keyof typeof chains];
					return (
						<li key={key}>
							<ChainsListButton disabled={parseInt(chainId) === currentChainId} aria-label={`change to ${chainName}`} onClick={() => {
							setCurrentChainId(chainId); 
							setChainsListActive(false);chainSwitch(chainId)
							}}>
								{chainName}
							</ChainsListButton>
						</li>
					)
				})}
			</ChainsList>
			{/* { chainId !== currentChainId &&
				<Modal >
					<ModalTitle text="Wrong network"/>
					<ModalContent>
						<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
							Please change your wallet providers network to {chains[currentChainId.toString() as keyof typeof chains]}
						</Text>
					</ModalContent>
					<Spacer size="md"/>
					<ModalActions>
						<Button styling="white" onClick={() => 	changeChain('0x4','https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161','Rinkeby Test Network')}>Change Network</Button>
					</ModalActions>
				</Modal>
			} */}
		</>
	)
}

const ChainsListButton = styled.button`
	background-color: transparent;
	border: none;
	color: currentColor;
	cursor: pointer;
	font-size: inherit;
	font-weight: inherit;

	&:focus-visible {
		outline: none;
		box-shadow: 0px 0px 10px 5px ${theme.color.purple[600]};
	}
`

const ChainsList = styled.ul<{isOpen?: boolean}>`
	background-color: rgba(255, 255, 255, .6);
	border-radius: 10px;
	border: 1px solid ${theme.color.purple[800]};
	display: ${props => !props.isOpen && "none"};
	left: 0;
	list-style-type: none;
	overflow: hidden;
	padding: .25em;
	position: absolute;

	li {
		&:not(:last-child) {
			margin-bottom: .1em;
		}
	}

	${ChainsListButton} {
		border-radius: 10px;
		padding: .4em .9em;
		text-align: left;
		transition: all .4s;
		width: 100%;

		&:hover {
			background-image: linear-gradient(to bottom,#aa6cd6 -100%,#713aac);
			color: ${theme.color.white};
		}
	}
`

export default NetworkSwitch;
