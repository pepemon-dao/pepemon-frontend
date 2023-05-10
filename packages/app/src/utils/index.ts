import BigNumber from 'bignumber.js'

export { calculatePpblzApy, calculatePpblzEthLpApy } from './calculateApy';
export { default as copyText } from './copyText';
export { getBalanceOfBatch, getTotalSupply, getMaxSupply } from './erc1155';
export { getContract, getAllowance, getNativeToken, getNativeBalance, getBalance } from './erc20';
export { default as formatAddress } from './formatAddress';
export { getBalanceNumber, getDisplayBalance, getFullDisplayBalance } from './formatBalance';
export { default as isSupportedChain } from './isSupportedChain';
export { correctChainIsLoaded } from './network';
export { getCardInfo } from './nftCards';

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export const oneEther = new BigNumber(10).pow(18)
