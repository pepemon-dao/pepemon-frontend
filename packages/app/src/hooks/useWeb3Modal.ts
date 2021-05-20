import { useCallback, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { Contract } from "@ethersproject/contracts";
// @ts-ignore
import { abis, addresses } from "@pepemon/contracts";
import useWalletProvider from "./useWalletProvider";

const INFURA_ID = "";
const NETWORK_NAME = "mainnet";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState(null);
  const { dispatchWp } = useWalletProvider();
  // const [autoLoaded, setAutoLoaded] = useState(false);
  const {
    // autoLoad = true,
    infuraId = INFURA_ID,
    NETWORK = NETWORK_NAME,
  }: any = config;

  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: false,
    providerOptions: {},
    theme: "dark",
  });

  const resetApp = async () => {
    provider && (await provider.close());
    setProvider(null);

    await web3Modal.clearCachedProvider();
    await dispatchWp({
      type: "reset",
    });
    window.location.reload();
  };

  const setPepemon = async (
    web3Provider: Web3Provider,
    updatedChainId: number = null
  ) => {
    if (!web3Provider) {
      return;
    }
    setProvider(web3Provider);

    let chainId = updatedChainId;
    if (!chainId) {
      const network = await web3Provider.getNetwork();
      chainId = network.chainId;
    }
    const accounts = await web3Provider.listAccounts();

    // SET CONTRACTS MOVE TO FUNCTION
    const contracts = new Map([
      [
        "PPDEX",
        new Contract(
          addresses[chainId]?.contracts["PPDEX"],
          abis.ppdex,
          web3Provider.getSigner()
        ),
      ],
    ]);

    return dispatchWp({
      type: "set",
      contracts,
      chainId,
      account: accounts[0],
      provider: web3Provider,
    });
  };

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    await subscribeProvider(newProvider);

    const web3Provider = new Web3Provider(newProvider, "any");
    setProvider(web3Provider);
    setPepemon(web3Provider).then(() => console.log("Contracts LOADED"));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await resetApp();
    },
    [web3Modal]
  );

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }

    provider.removeAllListeners();
    provider.on("chainChanged", async (chainId: string) => {
      console.info("[PROVIDER] chain changed to ", chainId);

      const web3Provider = new Web3Provider(provider, "any");
      setPepemon(web3Provider, parseInt(chainId)).then(() =>
        console.log("Contracts LOADED")
      );
    });

    provider.on("accountsChanged", async (account: string) => {
      console.info("[PROVIDER] account changed to ", account);

      const web3Provider = new Web3Provider(provider, "any");
      setPepemon(web3Provider).then(() => console.log("Contracts LOADED"));
    });
  };

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
