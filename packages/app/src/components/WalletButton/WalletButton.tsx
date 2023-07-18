import React from "react";
import { Button } from "../index";
import { useWeb3Modals } from "../../hooks";

const WalletButton: React.FC<any> = ({setConnecting}) => {
	const [provider, loadWeb3Modal] = useWeb3Modals();

	const handleClick = async () => {
		if (!provider) {
      if (typeof loadWeb3Modal === "function") {
        await loadWeb3Modal();
      }
		}
	}

  return (
    <Button styling="purple"
      onClick={handleClick}
	  {...(provider && {disabled: true})}
    >
      {!provider ? "Connect wallet" : "Connecting wallet..."}
    </Button>
  );
};

export default WalletButton;
