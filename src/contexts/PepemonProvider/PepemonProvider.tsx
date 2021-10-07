import React, {createContext, useReducer, useState} from 'react';
import {contractAddresses} from '../../pepemon/lib/constants';

declare global {
  interface Window {
    pepesauce: any
  }
}

const initial: any = ({
    account: null,
    chainId: null,
    contracts: new Map([]),
    provider: null,
    // web3: null,
})
export const Context = createContext<any>({
  pepemon: undefined,
})

export const PepemonProvider: React.FC<any> = ({ children }) => {

  const setContractAddresses = (networkId: any): any => ({
    // @ts-ignore
    ppblzAddress: contractAddresses.ppblz[networkId],
    // @ts-ignore
    ppdexAddress: contractAddresses.ppdex[networkId],
    // @ts-ignore
    wethAddress: contractAddresses.weth[networkId],
    // @ts-ignore
    uniV2Address: contractAddresses.uniV2_ppblz[networkId],
    // @ts-ignore
    pepemonFactoryAddress: contractAddresses.pepemonFactory[networkId],
    // @ts-ignore
    pepemonStoreAddress: contractAddresses.pepemonStore[networkId],
    // @ts-ignore
    pepemonStakeAddress: contractAddresses.pepemonStake[networkId],
    // @ts-ignore
    merkleAddress: contractAddresses.merkle[networkId],
    // @ts-ignore
    merkleAddressPpblz: contractAddresses.merklePpblz[networkId],
    // @ts-ignore
    merkleAddressPpdex: contractAddresses.merklePpdex[networkId],
    // @ts-ignore
    merkleAddressUniV2: contractAddresses.merkleUniV2[networkId],
    // @ts-ignore
    pepemonLottery: contractAddresses.pepemonLottery[networkId],
    // @ts-ignore
    uniV2PpdexAddress: contractAddresses.uniV2_ppdex[networkId],
    // @ts-ignore
    pepemonPromoStoreAddress: contractAddresses.pepemonPromoStore[networkId],
    // @ts-ignore
    pepemonPromoTokenAddress: contractAddresses.pepemonPromoToken[networkId],
  } as any)

  const pepemonReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'all':
        const allState = {
            account: action.account,
            chainId: action.chainId,
            contracts: action.contracts,
            provider: action.provider,
            // web3: new Web3(action.provider),
            ...setContractAddresses(action.chainId),
        }
        // @ts-ignore
        window.pepemon = allState
        return {...allState};
      case 'chainChanged':
        const chainChangedState = {
            ...state,
            chainId: action.chainId,
            contracts: action.contracts,
            provider: action.provider,
            // web3: new Web3(action.provider),
            ...setContractAddresses(action.chainId),
        }
        // @ts-ignore
        window.pepemon = chainChangedState;
        return {...chainChangedState};
      case 'accountChanged':
        const accountChangedState = {
            ...state,
            account: action.account,
            contracts: action.contracts,
            provider: action.provider,
            // web3: new Web3(action.provider),
            ...setContractAddresses(action.chainId),
        }
        // @ts-ignore
        window.pepemon = chainChangedState;
        return {...accountChangedState};
      case 'reset': return {...initial}
      default:
        return {...state};
    }
  }

  const [state, dispatch] = useReducer(pepemonReducer, initial)

  return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
  )
}

export default PepemonProvider;
