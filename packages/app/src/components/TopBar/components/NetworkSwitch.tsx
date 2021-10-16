import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { up_down_arrows_dark } from "../../../assets";
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from "../../../components";
import { chains } from "../../../constants";
import { PepemonProviderContext } from "../../../contexts";
import { theme } from "../../../theme";
import { useOutsideClick } from "../../../hooks";

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

	return (
		<>
			<ChainsListButton onClick={() => setChainsListActive(!chainsListActive)}>{
				chains[currentChainId] ? chains[currentChainId] : 'Not connected'
			}</ChainsListButton>
			<img alt="change network" src={up_down_arrows_dark} style={{ width: ".5em", marginLeft: ".8em" }}/>
			<ChainsList isOpen={chainsListActive} ref={networkSwitchRef}>
				{ Object.keys(chains).map((chainId, key) => {
					const chainName = chains[chainId.toString() as keyof typeof chains];
					return (
						<li key={key}>
							<ChainsListButton disabled={parseInt(chainId) === currentChainId} aria-label={`change to ${chainName}`} onClick={() => {
								setCurrentChainId(parseInt(chainId)); setChainsListActive(false);
							}}>
								{chainName}
							</ChainsListButton>
						</li>
					)
				})}
			</ChainsList>
			{ chainId !== currentChainId &&
				<Modal>
					<ModalTitle text="Wrong network"/>
					<ModalContent>
						<Text as="p" font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
							Please change your wallet providers network to {chains[currentChainId.toString() as keyof typeof chains]}
						</Text>
					</ModalContent>
					<Spacer size="md"/>
					<ModalActions>
						<Button styling="white" onClick={() => setCurrentChainId(chainId)}>Cancel</Button>
					</ModalActions>
				</Modal>
			}
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
