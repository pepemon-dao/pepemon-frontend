import React, { useReducer } from "react";

const initial = {
  id: null,
  error: null,
} as any;
export const TransactionContext = React.createContext(null);

export const TransactionProvider: React.FC = ({ children }) => {
  const transactionReducer = (state: any, action: any) => {
    switch (action.type) {
      case "transactionPending":
        return {
          id: action.id,
          state: "pending",
        };
      case "transactionCompleted":
        return {
          ...state.transaction,
          state: "completed",
        };
      case "transactionError":
        return {
          ...state.transaction,
          error: action.error,
          state: "failed",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(transactionReducer, initial);

  return (
    <TransactionContext.Provider value={[state, dispatch]}>
      {children}
    </TransactionContext.Provider>
  );
};
