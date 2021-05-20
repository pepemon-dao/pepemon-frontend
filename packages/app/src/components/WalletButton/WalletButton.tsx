import React from "react";
import { Button } from "../index";
import useWeb3Modal from "../../hooks/useWeb3Modal";

const WalletButton: React.FC<any> = () => {
  const [provider, loadWeb3Modal, logoutWeb3Modal] = useWeb3Modal();

  return (
    <Button
      onClick={async () => {
        if (!provider) {
          await loadWeb3Modal();
        } else {
          await logoutWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
};

export default WalletButton;
