import React, { createContext, useReducer } from "react";
import { contractAddresses } from "../../pepemon/lib/constants";

declare global {
  interface Window {
    pepesauce: any;
  }
}

const initial: any = {
  account: null,
  chainId: null,
  contracts: new Map([]),
  provider: null,
  // web3: null,
};
export const Context = createContext<any>({
  pepemon: undefined,
});

export const PepemonProvider: React.FC<any> = ({ children }) => {
  const setContractAddresses = (networkId: any): any =>
    ({
      ppblzAddress: contractAddresses.ppblz[networkId],
      ppdexAddress: contractAddresses.ppdex[networkId],
      wethAddress: contractAddresses.weth[networkId],
      uniV2Address: contractAddresses.uniV2_ppblz[networkId],
      pepemonFactoryAddress: contractAddresses.pepemonFactory[networkId],
      pepemonStoreAddress: contractAddresses.pepemonStore[networkId],
      pepemonStakeAddress: contractAddresses.pepemonStake[networkId],
      merkleAddress: contractAddresses.merkle[networkId],
      merkleAddressPpblz: contractAddresses.merklePpblz[networkId],
      merkleAddressPpdex: contractAddresses.merklePpdex[networkId],
      merkleAddressUniV2: contractAddresses.merkleUniV2[networkId],
      merkleDistributor: contractAddresses.merkleDistributor[networkId],
      pepemonLottery: contractAddresses.pepemonLottery[networkId],
      uniV2PpdexAddress: contractAddresses.uniV2_ppdex[networkId],
      pepemonPromoStoreAddress: contractAddresses.pepemonPromoStore[networkId],
      pepemonPromoTokenAddress: contractAddresses.pepemonPromoToken[networkId],
    } as any);

  const pepemonReducer = (state: any, action: any) => {
    switch (action.type) {
      case "all":
        const allState = {
          account: action.account,
          chainId: action.chainId,
          contracts: action.contracts,
          provider: action.provider,
          // web3: new Web3(action.provider),
          ...setContractAddresses(action.chainId),
        };
        // @ts-expect-error -- web3/ethers type mismatch
        window.pepemon = allState;
        return { ...allState };
      case "chainChanged":
        const chainChangedState = {
          ...state,
          chainId: action.chainId,
          contracts: action.contracts,
          provider: action.provider,
          // web3: new Web3(action.provider),
          ...setContractAddresses(action.chainId),
        };
        // @ts-expect-error -- web3/ethers type mismatch
        window.pepemon = chainChangedState;
        return { ...chainChangedState };
      case "accountChanged":
        const accountChangedState = {
          ...state,
          account: action.account,
          contracts: action.contracts,
          provider: action.provider,
          // web3: new Web3(action.provider),
          ...setContractAddresses(action.chainId),
        };
        // @ts-expect-error -- web3/ethers type mismatch
        window.pepemon = chainChangedState;
        return { ...accountChangedState };
      case "reset":
        return { ...initial };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(pepemonReducer, initial);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default PepemonProvider;
