import React, { useCallback } from "react";
import styled from "styled-components";
import { useWeb3Modal, usePepemon, useTokenBalance } from "../../hooks";
import { up_down_arrows_dark } from "../../assets";
import { getPpblzContract, getPpdexContract } from "../../pepemon/utils";
import { getBalanceNumber, formatAddress } from "../../utils";
import { Button, Text } from "../../components";
import { theme } from "../../theme";

type props = {
	staking: boolean;
	ethChainId: number;
	setEthChainId: any;
};
const TopBar: React.FC<props> = ({ ethChainId, setEthChainId, staking }) => {
	const [, loadWeb3Modal] = useWeb3Modal();
	const { account } = usePepemon();
	const pepemon = usePepemon();
	const ppblzBalance = useTokenBalance(
	getPpblzContract(pepemon) ? getPpblzContract(pepemon).address : null
	);
	const ppdexBalance = useTokenBalance(
	getPpdexContract(pepemon) ? getPpdexContract(pepemon).address : null
	);

	const handleUnlockClick = useCallback(() => {
	loadWeb3Modal();
	}, [loadWeb3Modal]);

	return (
		<StyledTopBar {...(account && {border: true})}>
			<StyledTopBarInner>
				{ account &&
					<StyledTopBarInfo>
						<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]} style={{ borderRight: "1px solid currentColor" }}>
							Ether
							<img alt="change network" src={up_down_arrows_dark} style={{ width: ".5em", marginLeft: ".8em" }}/>
						</TextInfo>
						{ppblzBalance && (
							<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>
							{getBalanceNumber(ppblzBalance).toFixed(2)}$PPBLZ
							</TextInfo>
						)}
						{ppblzBalance && (
							<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>
							{getBalanceNumber(ppdexBalance).toFixed(2)}$PPDEX
							</TextInfo>
						)}
						<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>3 unique cards</TextInfo>
					</StyledTopBarInfo>
				}
				<Button styling="green" {...(!account && {onClick: handleUnlockClick} )}>{!account ? 'Connect wallet' : formatAddress(account)}</Button>
			</StyledTopBarInner>
		</StyledTopBar>
	);
};

const StyledTopBar = styled.div<{border?: boolean}>`
	background-color: ${props => props.border && "rgba(255, 255, 255, .6)"};
	border-radius: 10px;
	border: ${props => props.border && `1px solid ${theme.color.purple[800]}`};
	overflow: hidden;
	padding: .25em;
	position: absolute;
	right: 2.5em;
	top: 2em;
`

const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
`

const StyledTopBarInfo = styled.div`
	align-items: center;
	display: flex;
`

const TextInfo = styled(Text)`
	padding: .4em 1em;
`

/*...(!staking
? { className: "top-menu-bar" }
: { className: "top-menu-bar-alt" })*/

export default TopBar;
