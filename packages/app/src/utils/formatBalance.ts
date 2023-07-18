import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
	if (!balance.dividedBy) return;
	const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
	return displayBalance.toNumber()
}



export const getDisplayBalance = (balance: BigNumber | undefined, decimals = 18): string => {
  if (!balance || !balance.dividedBy) {
    return '';
  }
  const divisor = new BigNumber(10).pow(decimals);
  const displayBalance = balance.dividedBy(divisor);
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4);
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
