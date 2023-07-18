import React from "react";
import styled from "styled-components";
import {
  Accordion,
  ContentColumns,
  ContentColumn,
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
        <Accordion title="1. Bridge to L2" isOpen={false}>
          <div>
            <ContentColumns>
              <ContentColumn width="80%">
                {routerParams.bridgeState === "testnet" && <BridgeSubview />}
              </ContentColumn>
            </ContentColumns>
          </div>
        </Accordion>
        <Accordion title="2. Claim PPBLZ" isOpen={false}>
          <div>
            <ContentColumns>
              <ContentColumn width="80%">
                <Title
                  as="h3"
                  size="xl"
                  weight={900}
                  font={theme.font.neometric}
                >
                  Claim your Testnet PPBLZ{" "}
                </Title>
                <Spacer size="sm" />
                <Text as="p" size="s" lineHeight={1.125}>
                  Experience the thrill of becoming an early adopter on
                  Pepechain Testnet ecosystem!<br></br>
                  <br></br>Be among the exclusive few to claim your 1 PPBLZ and
                  unlock staking opportunities for earning testnet PPDEX.
                </Text>
                <Spacer size="md" />
                <div>
                <iframe
                  title="claim-ppblz"
                  src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/erc20.html?contract=0xD5678bCB3652a118A0B7e93C5C457e42ce263640&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D"
                  width="600px"
                  height="600px"
                  style={{ maxWidth: "100%" }}
                  frameBorder="0"
                />
                </div>
              </ContentColumn>
            </ContentColumns>
          </div>
        </Accordion>
        <Accordion title="3. Mint NFT" isOpen={false}>
          <div>
            <ContentColumns>
              <ContentColumn width="80%">
                <Title
                  as="h3"
                  size="xl"
                  weight={900}
                  font={theme.font.neometric}
                >
                  Mint your exclusive Pepemon Badges{" "}
                </Title>
                <Spacer size="sm" />
                <Text as="p" font={theme.font.inter} size="m">
                  Unlock your vibrant, one-of-a-kind Pepemon Badge on the
                  Pepechain Testnet!<br></br>
                  <br></br>Effortlessly turn your pepETH into an exclusive,
                  envy-worthy Pepemon NFT that showcases your dedication and
                  unique style. Limited at 1 Badge per wallet!
                </Text>
                <Spacer size="md" />
                <div>
                <iframe
                  title="mint-nft"
                  src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/erc1155.html?contract=0xa44e4154dDC1ECeDf60d731460D9E06634498765&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D&tokenId=0"
                  width="600px"
                  height="600px"
                  style={{ maxWidth: "100%" }}
                  frameBorder="0"
                ></iframe>
                </div>
              </ContentColumn>
            </ContentColumns>
          </div>
        </Accordion>
        <Accordion title="4. Bid on Pepesea" isOpen={false}>
          <div>
            <ContentColumns>
              <ContentColumn width="80%">
                <Title
                  as="h3"
                  size="xl"
                  weight={900}
                  font={theme.font.neometric}
                >
                  Win the race on the hottest NFTs{" "}
                </Title>
                <Spacer size="sm" />
                <Text as="p" font={theme.font.inter} size="m">
                  Get exclusive NFT opportunities with Pepesea's thrilling
                  bidding system!<br></br>
                  <br></br>With Pepesea, even if your pepETH balance falls short
                  for your dream NFT, you can still join the race and
                  potentially snag the hottest NFTs in the marketplace.
                </Text>
                <Spacer size="md" />
                <div>
                <iframe
                  src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/marketplace-v3.html?contract=0x6516905B4Af10DC036D73A8e627eA49092915D02&chain=%7B%22name%22%3A%22pepechain-testnet%22%2C%22chain%22%3A%22%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fl2-pepechain-testnet-8uk55qlld4.t.conduit.xyz%22%5D%2C%22nativeCurrency%22%3A%7B%22symbol%22%3A%22pepETH%22%2C%22name%22%3A%22pepETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22pepechain-testnet%22%2C%22chainId%22%3A906090%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22pepechain-testnet%22%7D&englishAuctionId=1&primaryColor=blue"
                  width="600px"
                  height="600px"
                  style={{ maxWidth: "100%" }}
                  frameBorder="0"
                  title="bid-on-pepesea"
                ></iframe>
                </div>
              </ContentColumn>
            </ContentColumns>
          </div>
        </Accordion>
        <Accordion title="5. Swap on Photonswap" isOpen={false}>
          <div>
            <ContentColumns>
              <ContentColumn width="80%">
                <Title
                  as="h3"
                  size="xl"
                  weight={900}
                  font={theme.font.neometric}
                >
                  Start trading with fast transactions and low fees
                </Title>
                <Spacer size="sm" />
                <Text as="p" size="s" lineHeight={1.125}>
                  Connect to Pepechain L2 Testnet and start trading testnet
                  tokens. Make it to the top traders leaderboard and win epic
                  NFT prizes on mainnet
                </Text>
                <br></br>
                <Text as="p" size="s" lineHeight={1.125}>
                  Start swapping BTC, USDC or PPBLZ on{" "}
                  <a
                    href="https://photonswap.finance/#/swap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>PhotonSwap</b>
                  </a>
                </Text>
              </ContentColumn>
            </ContentColumns>
          </div>
        </Accordion>
        <Accordion title="6. Play Pepemon: Degen Battleground" isOpen={false}>
          <div>
            <ContentColumns>
              <ContentColumn width="80%">
                <Title
                  as="h3"
                  size="xl"
                  weight={900}
                  font={theme.font.neometric}
                >
                  Use your PPDEX to win epic prizes
                </Title>
                <Spacer size="sm" />
                <Text as="p" size="s" lineHeight={1.125}>
                  Mint your testnet Pepemon Battle Decks and top the game
                  leaderboards for a chance to win Collector's Edition cards on
                  Ethereum worth $3000
                </Text>
                <br></br>
                <Text as="p" size="s" lineHeight={1.125}>
                  Play now at{" "}
                  <a
                    href="https://play.pepemon.world"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <b>play.pepemon.world</b>
                  </a>
                </Text>
              </ContentColumn>
            </ContentColumns>
          </div>
        </Accordion>
      </StyledStoreWrapper>
    </div>
  );
};

export default BridgeCard;
