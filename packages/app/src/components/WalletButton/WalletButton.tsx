import React from "react";
import { Button } from "../index";
import { useWeb3Modal } from "../../hooks";

const WalletButton: React.FC<any> = ({setConnecting}) => {
	const [provider, loadWeb3Modal] = useWeb3Modal();

	const handleClick = async () => {
		if (!provider) {
			await loadWeb3Modal();
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
