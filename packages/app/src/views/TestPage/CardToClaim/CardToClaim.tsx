import React, { useState, useContext, useEffect } from "react";
import { Button } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';

const CardToClaim: React.FC<any> = ({tokenId}) => {
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
			const response = await fetch(`${apiBaseUri}`).then(res => res.json());

			if (!response.message) {
				await setClaimArgs({...response})
				console.log(response);
				// check if card is already claimed
				// @dev for more info: https://etherscan.io/address/0x3f739128c99B111901d011903309151A26a43b6F#readContract
				if (await contracts.merkleDistributor.isClaimed(tokenId, response.index)) {
					setIsClaimed(true);
				} else {
					setCanClaim(true);
				}
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
		<Button styling="purple" disabled={isDisabled} onClick={claim}>{
			!account ? 'Connect wallet first'
			: isLoading ? 'Loading...'
			: isClaimed ? 'Claimed'
			: canClaim ? 'Claim' : "Can't claim"
		}</Button>
	)
}

export default CardToClaim;
