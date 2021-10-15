import React, { useState, useRef } from "react";
import styled from "styled-components";
import { up_down_arrows_dark } from "../../assets";
import { chains } from "../../constants";
import { theme } from "../../theme";
import { useOutsideClick } from "../../hooks";

interface NetworkSwitchProps {
	appChainId: number,
	providerChainId: number;
	setChainId: any;
}

const NetworkSwitch: React.FC<NetworkSwitchProps> = ({appChainId, providerChainId, setChainId}) => {
	const [chainsListActive, setChainsListActive] = useState(false);
	const networkSwitchRef = useRef(null);
	useOutsideClick(networkSwitchRef, () => {
		if (chainsListActive) {
			setChainsListActive(false);
		}
	})

	return (
		<>
			<ChainsListButton disabled onClick={() => setChainsListActive(!chainsListActive)}>{chains[providerChainId]}</ChainsListButton>
			<img alt="change network" src={up_down_arrows_dark} style={{ width: ".5em", marginLeft: ".8em" }}/>
			<ChainsList isOpen={chainsListActive} ref={networkSwitchRef}>
				{ Object.keys(chains).map((chainId, key) => {
					const chainName = chains[chainId.toString() as keyof typeof chains];
					return (
						<li key={key}>
							<ChainsListButton aria-label={`change to ${chainName}`} onClick={() => {
								setChainId(chainId); setChainsListActive(false);
							}}>
								{chainName}
							</ChainsListButton>
						</li>
					)
				})}
			</ChainsList>
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
