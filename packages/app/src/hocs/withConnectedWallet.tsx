import React from "react";

import useWalletProvider from "../hooks/useWalletProvider";
import WalletButton from "../components/WalletButton/WalletButton";

function withConnectedWallet(WrappedComponent: React.FC) {
  return function WithConnectedWalletComponent({ ...props }) {
    const { wallet } = useWalletProvider();

    if (!wallet.account) {
      return (
        <div>
          <div>No WALLET connected</div>
          <WalletButton />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export default withConnectedWallet;
