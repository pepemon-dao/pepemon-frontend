import { useContext } from "react";
import { TransactionContext } from "../context/TransactionProvider";

const useTransaction = () => {
  const [transaction, dispatchTx] = useContext(TransactionContext);
  return { transaction, dispatchTx };
};

export default useTransaction;
