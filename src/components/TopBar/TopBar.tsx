import React, { useCallback } from "react";
import styled from "styled-components";
import { useWeb3Modal, usePepemon, useTokenBalance } from "../../hooks";
import { up_down_arrows_light, up_down_arrows_dark } from "../../assets";
import { getPpblzContract, getPpdexContract } from "../../pepemon/utils";
import { getBalanceNumber, formatAddress } from "../../utils";
import { Button, StyledText } from "../../components";
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
						<StyledTextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]} style={{ borderRight: "1px solid currentColor" }}>
							Ether
							<img alt="change network" src={up_down_arrows_dark} style={{ width: ".5em", marginLeft: ".8em" }}/>
						</StyledTextInfo>
						{ppblzBalance && (
							<StyledTextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>
							{getBalanceNumber(ppblzBalance).toFixed(2)}$PPBLZ
							</StyledTextInfo>
						)}
						{ppblzBalance && (
							<StyledTextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>
							{getBalanceNumber(ppdexBalance).toFixed(2)}$PPDEX
							</StyledTextInfo>
						)}
						<StyledTextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>3 unique cards</StyledTextInfo>
					</StyledTopBarInfo>
				}
				<GreenButton onClick={handleUnlockClick}>{!account ? 'Connect wallet' : formatAddress(account)}</GreenButton>
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

const StyledTextInfo = styled(StyledText)`
	padding: .4em 1em;
`

const GreenButton = styled(Button)`
	color: ${theme.color.purple[800]};
	background-color: transparent;
	background-image: linear-gradient(to bottom, ${theme.color.green[100]}, ${theme.color.green[200]});
	border: none;
	text-transform: uppercase;

	&:hover {
		background-image: linear-gradient(to bottom, ${theme.color.purple[600]}, ${theme.color.purple[800]});
		color: ${theme.color.white};
	}
`

/*...(!staking
? { className: "top-menu-bar" }
: { className: "top-menu-bar-alt" })*/

export default TopBar;
