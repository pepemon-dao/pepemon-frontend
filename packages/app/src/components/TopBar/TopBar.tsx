import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Web3 from "web3";
import { useWeb3Modal, useTokenBalance } from "../../hooks";
import { getBalanceNumber, formatAddress, copyText } from "../../utils";
import { Button, Text } from "../../components";
import { NetworkSwitch } from "./components";
import { PepemonProviderContext } from "../../contexts";
import { theme } from "../../theme";

const TopBar: React.FC<any> = ({setChainId}) => {
	const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0);
	const [ppdexRewards, setPpdexRewards] = useState(0);
	const [, loadWeb3Modal] = useWeb3Modal();
	const pepemonContext = useContext(PepemonProviderContext);
	const { account, chainId, ppblzAddress, ppdexAddress, contracts, provider } = pepemonContext[0];
	const web3 = new Web3(provider);
	const ppblzBalance = useTokenBalance(ppblzAddress);
	const ppdexBalance = useTokenBalance(ppdexAddress);

	useEffect(() => {
		(async () => {
			if(!contracts.ppdex) return;
			// Get staked PPBLZ
	        const stakeA = await contracts.ppdex.getAddressPpblzStakeAmount(account);
	        setPpblzStakedAmount(parseInt(web3.utils.fromWei(stakeA.toString())));
			// Get PPDEX rewards
			const cRewards = (await contracts.ppdex.myRewardsBalance(account)).toString();
			setPpdexRewards(parseInt(web3.utils.fromWei(cRewards)));
	    })()
	}, [contracts.ppdex, setPpblzStakedAmount, account, web3.utils]);

	const totalPpblz = getBalanceNumber(ppblzBalance) + ppblzStakedAmount;
	const totalPpdex = getBalanceNumber(ppdexBalance) + ppdexRewards;

	const handleUnlockClick = () => {
		if (account) {
			copyText(account);
		} else {
			loadWeb3Modal();
		}
	}

	return (
		<StyledTopBar {...(account && {border: true})}>
			<StyledTopBarInner>
				{ account &&
					<StyledTopBarInfo>
						<TextInfo as="div" font={theme.font.spaceMace} color={theme.color.purple[800]} style={{ borderRight: "1px solid currentColor" }}>
							<NetworkSwitch {...{appChainId: chainId, providerChainId: chainId, setChainId: setChainId}}/>
						</TextInfo>
						{ppblzBalance && (
							<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]} title="In Wallet + Staked PPBLZ">
								{totalPpblz.toFixed(2)} $PPBLZ
							</TextInfo>
						)}
						{ppblzBalance && (
							<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]} title="In Wallet + Not Claimed PPDEX">
								{totalPpdex.toFixed(2)} $PPDEX
							</TextInfo>
						)}
						<TextInfo as="p" font={theme.font.spaceMace} color={theme.color.purple[800]}>XX unique cards</TextInfo>
					</StyledTopBarInfo>
				}
				<Button styling="green" title={account ? 'Copy address' : 'Connect wallet'} onClick={handleUnlockClick}>{!account ? 'Connect wallet' : formatAddress(account)}</Button>
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
	z-index: 1;
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
