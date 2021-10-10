import React, { useState } from "react";
import { usePepemon } from "../hooks";
import { theme } from "../theme";
import { ContentCentered, Spacer, Title, WalletButton } from "../components";
import { LoadingPage } from "../views";

function withConnectedWallet(WrappedComponent: React.FC) {
  return function WithConnectedWalletComponent({ ...props }) {
	const [connecting, setConnecting] = useState(false);
    const { account } = usePepemon();

    if (!account && !connecting) {
      return (
        <LoadingPage>
			<ContentCentered>
      		<Title as="h1" size={2} font={theme.font.inter} weight="900">No WALLET connected</Title>
			<Spacer size="sm"/>
      		<WalletButton setConnecting={() => setConnecting(!connecting)}/>
			</ContentCentered>
        </LoadingPage>
      );
    }

	if (!account && connecting) {
		return <LoadingPage/>
	}

    return <WrappedComponent {...props} />;
  };
}

export default withConnectedWallet;
