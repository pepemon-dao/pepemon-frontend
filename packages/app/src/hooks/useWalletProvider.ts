import { useContext } from "react";
import { WalletContext } from "../context/WalletProvider";

const useWalletProvider = () => {
  const [wallet, dispatchWp] = useContext(WalletContext);
  return { wallet, dispatchWp };
};

export default useWalletProvider;
