import BigNumber from 'bignumber.js'

export { default as formatAddress } from './formatAddress'
export { getBalanceNumber } from "./formatBalance";
export { correctChainIsLoaded } from './network';
export { getBalanceOfBatch, getMaxSupply, getTotalSupply } from './erc1155';
export { getBalance, getAllowance, getNativeBalance } from './erc20'

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}
