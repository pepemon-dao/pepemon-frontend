import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { useWeb3Modal, useTokenBalance } from "../../hooks";
import { getBalanceNumber, formatAddress } from "../../utils";
import { Button, NetworkSwitch, Text } from "../../components";
import { PepemonProviderContext } from "../../contexts";
import { theme } from "../../theme";

type TopBarProps = {
	setChainId: any;
};

const TopBar: React.FC<TopBarProps> = ({setChainId}) => {
	const [, loadWeb3Modal] = useWeb3Modal();
	const pepemonContext = useContext(PepemonProviderContext);
	const { account, chainId, ppblzAddress, ppdexAddress } = pepemonContext[0];
	const ppblzBalance = useTokenBalance(ppblzAddress);
	const ppdexBalance = useTokenBalance(ppdexAddress);
	console.log(pepemonContext[0]);

	const handleUnlockClick = useCallback(() => {
		loadWeb3Modal();
	}, [loadWeb3Modal]);

	return (
		<StyledTopBar {...(account && {border: true})}>
			<StyledTopBarInner>
				{ account &&
					<StyledTopBarInfo>
						<TextInfo as="div" font={theme.font.spaceMace} color={theme.color.purple[800]} style={{ borderRight: "1px solid currentColor" }}>
							<NetworkSwitch {...{appChainId: chainId, providerChainId: chainId, setChainId: setChainId}}/>
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
	position: relative;
`

export default TopBar;
