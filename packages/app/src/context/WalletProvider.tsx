import React, { useReducer } from "react";

const initial = {
  account: null,
  chainId: null,
  contracts: new Map([]),
  provider: null,
} as any;
export const WalletContext = React.createContext(null);

export const WalletProvider: React.FC = ({ children }) => {
  const walletReducer = (state: any, action: any) => {
    switch (action.type) {
      case "set":
        const newState = {
          provider: action.provider,
          account: action.account,
          chainId: action.chainId,
          contracts: action.contracts,
        };
        // @ts-ignore
        window.pepemon = newState;
        return newState;
      case "reset":
        const initialState = {
          ...initial,
        };
        // @ts-ignore
        window.pepemon = initialState;
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(walletReducer, initial);

  return (
    <WalletContext.Provider value={[state, dispatch]}>
      {children}
    </WalletContext.Provider>
  );
};
