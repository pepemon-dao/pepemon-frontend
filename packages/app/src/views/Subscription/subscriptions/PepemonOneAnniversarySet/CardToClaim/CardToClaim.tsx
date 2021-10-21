import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Button, Spacer, Title, Text } from '../../../../../components';
import { PepemonProviderContext } from '../../../../../contexts';
import { theme } from '../../../../../theme';

interface CardToClaimProps {
	title: string,
	text: string,
	img: {
		url: string,
		title: string
	}
	tokenId: number
}

const CardToClaim: React.FC<CardToClaimProps> = ({title, text, tokenId, img}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isClaimed, setIsClaimed] = useState(false);
	const [canClaim, setCanClaim] = useState(false);
	const [claimArgs, setClaimArgs] = useState(null);
	const pepemonContext = useContext(PepemonProviderContext);
	const { account, contracts } = pepemonContext[0];

	useEffect(() => {
		if (!account) return;
		// const apiBaseUri = `https://pepemon.finance/api/merkle/${tokenId}/${account}`;
		const apiBaseUri = `https://pepemon.finance/api/merkle/${tokenId}/${account}`;

		(async () => {
			try {
				const response = await fetch(`${apiBaseUri}`).then(res => res.json());
				console.log(response.code);

				if (!response.message) {
					await setClaimArgs({...response})
					// check if card is already claimed
					// @dev for more info: https://etherscan.io/address/0x3f739128c99B111901d011903309151A26a43b6F#readContract
					if (await contracts.merkleDistributor.isClaimed(tokenId, response.index)) {
						setIsClaimed(true);
					} else {
						setCanClaim(true);
					}
				}
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		})()
	}, [account, tokenId, contracts.merkleDistributor]);

	// @dev for more info: https://etherscan.io/address/0x3f739128c99B111901d011903309151A26a43b6F#writeContract
	const claim = async () => {
		if (!claimArgs) return;
		const { index, amount, proof } = claimArgs;
		try {
			await contracts.merkleDistributor.claim(
				tokenId,
				index,
				account,
				parseInt(amount),
				proof);

			setCanClaim(false);
			setIsClaimed(true);
		} catch (error) {
			console.log(error);
		}
	}

	const isDisabled = !account || isLoading || isClaimed || !canClaim;

	return (
		<CardToClaimWrapper>
			<Title as="h3" size={1} weight={900} font={theme.font.neometric}>{title}</Title>
			<Spacer size="sm"/>
			<StyledFigure>
			  <img src={img.url} alt={img.title} title={img.title}/>
			  <figcaption><Text as="p" size={.875} lineHeight={1.125} align="center" color={theme.color.gray[300]}>{text}</Text></figcaption>
			</StyledFigure>
			<Spacer size="sm"/>
			<Button width="100%" styling="purple" disabled={isDisabled} onClick={claim} style={{marginTop: "auto"}}>{
				!account ? 'Connect wallet first'
				: isLoading ? 'Loading...'
				: isClaimed ? 'Claimed'
				: canClaim ? 'Claim' : "Can't claim"
			}</Button>
		</CardToClaimWrapper>
	)
}

const CardToClaimWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

const StyledFigure = styled.figure`
	margin: 0;
`

export default CardToClaim;
