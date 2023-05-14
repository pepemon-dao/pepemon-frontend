import React from "react";
import { DefaultPage } from "../../components";
import BridgeCard from "./components/BridgeCard";

export const bridgeMeta = {
  title: "Bridge your coins to the Pepechain L2",
  description:
    "Bridge your $PPDEX and other pepemon tokens to the Pepemon L2 chain. You'll be able to use them in the game and earn rewards for doing so.",
};

const Bridge: React.FC<any> = () => {
  return (
    <DefaultPage title="Bridge and use Pepechain L2 Testnet dApps">
      <BridgeCard />
    </DefaultPage>
  );
};

export default Bridge;
