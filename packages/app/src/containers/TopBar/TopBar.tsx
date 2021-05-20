import React from "react";

import { Header } from "../../components";
import WalletButton from "../../components/WalletButton/WalletButton";
import useWalletProvider from "../../hooks/useWalletProvider";

const TopBar: React.FC<any> = () => {
  const { wallet } = useWalletProvider();
  return (
    <Header>
      {!wallet.account && <WalletButton />}
      <div style={{ marginRight: "2rem" }}>
        {wallet.account ? wallet.account : "No WALLET connected"}
      </div>
    </Header>
  );
};

export default TopBar;
