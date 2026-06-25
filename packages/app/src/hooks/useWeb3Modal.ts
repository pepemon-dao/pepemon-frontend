import { useCallback, useContext, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Contracts } from "../pepemon/lib/contracts";
import { PepemonProviderContext } from "../contexts";

const INFURA_ID = "7a9c4ff3188d481f9143904079638424";

// Singleton — one instance shared across all hook calls so concurrent
// connect() calls from re-renders on data-heavy pages don't stomp each other.
const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: { infuraId: INFURA_ID },
    },
  },
  theme: "light",
});

function useWeb3Modal() {
  const [provider, setProvider] = useState(null);
  const [, dispatch] = useContext(PepemonProviderContext);

  const loadWeb3Modal = useCallback(async () => {
    const setPepemon = async (newProvider: any, newChainId: any = null) => {
      if (!newProvider) return;
      const { chainId } = await newProvider.getNetwork();
      const accounts = await newProvider.listAccounts();
      const contracts = new Contracts(
        newProvider,
        newChainId ? parseInt(newChainId, 16) : chainId
      );
      return await dispatch({
        type: "all",
        contracts,
        chainId: newChainId ? parseInt(newChainId, 16) : chainId,
        account: accounts[0],
        provider: newProvider,
      });
    };

    const subscribeProvider = async (rawProvider: any) => {
      if (!rawProvider.on) return;
      rawProvider.on("chainChanged", async (chainId: string) => {
        const web3Provider = new Web3Provider(rawProvider, "any");
        setPepemon(web3Provider, chainId).then(() =>
          console.log("Contracts LOADED")
        );
      });
      rawProvider.on("accountsChanged", async () => {
        const web3Provider = new Web3Provider(rawProvider, "any");
        setPepemon(web3Provider).then(() => console.log("Contracts LOADED"));
      });
    };

    const rawProvider = await web3Modal.connect();
    await subscribeProvider(rawProvider);
    const web3Provider = new Web3Provider(rawProvider, "any");
    setProvider(web3Provider);
    setPepemon(web3Provider).then(() => console.log("Contracts LOADED"));
  }, [dispatch]);

  const logoutOfWeb3Modal = useCallback(async () => {
    if (provider && typeof (provider as any).close === "function") {
      await (provider as any).close();
    }
    setProvider(null);
    await web3Modal.clearCachedProvider();
    await dispatch({ type: "reset" });
  }, [dispatch, provider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
