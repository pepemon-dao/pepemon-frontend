import React from "react";
import styled from "styled-components";
import {
  Badge,
  StyledLinkTitle,
  Title,
  Text,
  Spacer,
} from "../../../components";
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
              <Link to={`/bridge/testnet`}>1. Bridge</Link>
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "claim-ppblz"}
            >
              <Link to={`/bridge/claim-ppblz`}>2. Claim PPBLZ</Link>
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "stake-ppblz"}
            >
              <Link to={`/bridge/stake-ppblz`}>3. Stake for PPDEX</Link>
              <Badge text="soon" />
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "mint-pepemon-avatars"}
            >
              <Link to={`/bridge/mint-pepemon-avatars`}>4. Mint</Link>
            </StyledLinkTitle>
            <StyledLinkTitle
              isInactive={routerParams.bridgeState !== "bid-on-pepesea"}
            >
              <Link to={`/bridge/bid-on-pepesea`}>5. Bid</Link>
            </StyledLinkTitle>
          </div>
        </StyledStoreHeader>
        <StyledStoreBody>
          {routerParams.bridgeState === "testnet" && <BridgeSubview />}
          {routerParams.bridgeState === "claim-ppblz" && (
            <>
              <Text as="p" font={theme.font.inter} size="m">
                Experience the thrill of becoming an early adopter in the
                revolutionary Pepechain Testnet ecosystem! Be among the
                exclusive few to claim your limited-edition ERC-20 PPBLZ tokens
                and unlock staking opportunities for earning PPDEX.
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
              <Text as="p" font={theme.font.inter} size="m">
                Unlock your vibrant, one-of-a-kind Pepemon Badge on the
                Pepechain Testnet! Effortlessly turn your pepETH into an
                exclusive, envy-worthy Pepemon NFT that showcases your
                dedication and unique style.
              </Text>
              <Spacer size="md" />
              <iframe
                src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/erc721.html?contract=0xccC01ab293244e2000fE58319077Fa07adBA540f&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D"
                width="600px"
                height="600px"
                style={{ maxWidth: "100%" }}
                frameBorder="0"
              ></iframe>
            </>
          )}
          {routerParams.bridgeState === "bid-on-pepesea" && (
            <>
              <Text as="p" font={theme.font.inter} size="m">
                Unlock exclusive NFT opportunities with Pepesea's thrilling
                bidding system! With Pepesea, even if your pepETH balance falls
                short for your dream NFT, you can still join the race and
                potentially snag the hottest NFTs in the marketplace.
              </Text>
              <Spacer size="md" />
              <iframe
                src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/marketplace-v3.html?contract=0x6516905B4Af10DC036D73A8e627eA49092915D02&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D&englishAuctionId=1&primaryColor=blue"
                width="600px"
                height="600px"
                style={{ maxWidth: "100%" }}
                frameBorder="0"
              ></iframe>
            </>
          )}
          {/* {routerParams.bridgeState === "stake-ppblz" && (
            <>
              <Text as="p" font={theme.font.inter} size="m">
                Discover a world of exclusive rewards with the power of Pepemon
                Pepeball tokens! By staking your free PPBLZ tokens, not only
                will you secure a steady stream of PPDEX earnings, but you'll
                also gain access to an exciting treasure trove of NFT
                opportunities on the Pepechain Testnet.
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
          )} */}
        </StyledStoreBody>
      </StyledStoreWrapper>
    </div>
  );
};

export default BridgeCard;
