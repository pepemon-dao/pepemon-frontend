import ERC20ABI from '../constants/abi/ERC20.json'
import {Contract} from '@ethersproject/contracts';

export const getContract = (provider: any, address: string) => {
  const contract = new Contract(
    address,
    ERC20ABI.abi,
    provider,
  )
  return contract
}

export const getAllowance = async (
  allowContract: any,
  fromContract: any,
  account: string,
): Promise<string> => {
  try {
    if (!allowContract) {
      console.log('[getAllowance] no contract found')
      // check
      return "err";
    }
    const allowance: string = await allowContract.allowance(account, fromContract.address)
    return allowance.toString()
  } catch (e) {
    return '0'
  }
}

export const getNativeBalance = async (
    provider: any,
    account: string,
) => {
  try {
    const balance = await provider.getBalance(account);
    return balance.toString();
  } catch (e) {
    console.error('[getNativeBalance] error', e)
    return '0'
  }
}

export const getBalance = async (
  provider: any,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  try {
    const contract = new Contract(tokenAddress, ERC20ABI.abi, provider);
    if (!contract) {
      console.log('[getBalance] no contract found')
      // check
      return "err";
    }
    const balance: string = await contract.balanceOf(userAddress);
    return balance.toString()
  } catch (e) {
    console.error('[getBalance] error', e)
    return '0'
  }
}
