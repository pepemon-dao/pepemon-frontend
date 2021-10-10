import React from "react";
import { Button } from "../index";
import { useWeb3Modal } from "../../hooks";

const WalletButton: React.FC<any> = ({setConnecting}) => {
  const [provider, loadWeb3Modal, logoutWeb3Modal] = useWeb3Modal();

  return (
    <Button styling="purple"
      onClick={async () => {
		setConnecting();
        if (!provider) {
          await loadWeb3Modal();
        } else {
          await logoutWeb3Modal();
        }
      }}
	  {...(provider && {disabled: true})}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
};

export default WalletButton;
