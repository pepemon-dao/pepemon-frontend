/**
 * @method @dev: https://dune.xyz/queries/21790/44998
 * @return returns PPBLZ staking APY
 */
export const calculatePpblzApy = (ppblzPrice: number, ppdexPrice: number) => {
	const rewardedPerYear = ppdexPrice * 14.25;
	return rewardedPerYear / ppblzPrice * 100;
}

/**
 * @method @dev: https://dune.xyz/queries/21790/44998
 * @return returns PPBLZ-ETH LP staking APY
 */
export const calculatePpblzEthLpApy = (ppblzPrice: number, ppdexPrice: number) => {
	const rewardedPerYear = ppdexPrice * 30.5;
	return rewardedPerYear / ppblzPrice * 50;
}
