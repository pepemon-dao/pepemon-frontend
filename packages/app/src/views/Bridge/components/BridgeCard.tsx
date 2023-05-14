import React from "react";
import styled from "styled-components";
import { Badge, StyledLinkTitle, Title, Text, Spacer } from "../../../components";
import {
  StyledStoreBody,
  StyledStoreHeader,
  StyledStoreWrapper,
} from "../../Store/components";
import { Link, Redirect, useParams } from "react-router-dom";
import BridgeSubview from "./BridgeSubview";
import { theme } from "../../../theme";

const BridgeCard: React.FC<any> = () => {
  const routerParams: any = useParams();

  if (!routerParams.bridgeState) return <Redirect to="/bridge/testnet" />;

  return (
    <div>
      <StyledStoreWrapper>
        <StyledStoreHeader>
          <div style={{ display: "flex" }}>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "testnet"}
            >
              <Link to={`/bridge/testnet`}>Bridge</Link>
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "claim-ppblz"}
            >
              <Link to={`/bridge/claim-ppblz`}>Claim PPBLZ</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "mint-pepemon-avatars"}
            >
              <Link to={`/bridge/mint-pepemon-avatars`}>Mint</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "bid-on-pepesea"}
            >
              <Link to={`/bridge/bid-on-pepesea`}>Bid</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
          </div>
        </StyledStoreHeader>
        <StyledStoreBody>
          {routerParams.bridgeState === "testnet" && <BridgeSubview />}
          {routerParams.bridgeState === "claim-ppblz" && (
            <>
              <Title as="h1" font={theme.font.spaceMace} size="xl">
                Claim PPBLZ
              </Title>
              <Spacer size="md" />
              <Text as="p" font={theme.font.inter} size="m">
                Lorem ipsum.
              </Text>
              <Spacer size="md" />
              <iframe
                src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/erc20.html?contract=0xD5678bCB3652a118A0B7e93C5C457e42ce263640&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D"
                width="600px"
                height="600px"
                style={{ maxWidth: "100%" }}
                frameBorder="0"
              ></iframe>
            </>
          )}
          {routerParams.bridgeState === "mint-pepemon-avatars" && (
            <>
              <Title as="h1" font={theme.font.spaceMace} size="xl">
                Mint Pepemon Avatars
              </Title>
              <Spacer size="md" />
              <Text as="p" font={theme.font.inter} size="m">
                Lorem ipsum.
              </Text>
              <Spacer size="md" />
              <iframe
                src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/marketplace-v3.html?contract=0x2FCb67128BE211D7c94dA8990AC61E6af2Ea0BD0&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D&directListingId=0&primaryColor=red&secondaryColor=red"
                width="600px"
                height="600px"
                style={{ maxWidth: "100%" }}
                frameBorder="0"
              ></iframe>
            </>
          )}
          {routerParams.bridgeState === "bid-on-pepesea" && (
            <>
              <Title as="h1" font={theme.font.spaceMace} size="xl">
                Bid on Pepesea
              </Title>
              <Spacer size="md" />
              <Text as="p" font={theme.font.inter} size="m">
                Lorem ipsum.
              </Text>
              <Spacer size="md" />
              <iframe
                src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/marketplace-v3.html?contract=0x2FCb67128BE211D7c94dA8990AC61E6af2Ea0BD0&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D&englishAuctionId=1&theme=system"
                width="600px"
                height="600px"
                style={{ maxWidth: "100%" }}
                frameBorder="0"
              ></iframe>
            </>
          )}
        </StyledStoreBody>
      </StyledStoreWrapper>
    </div>
  );
};

export default BridgeCard;
