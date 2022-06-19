import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { theme } from "../../theme";
import {
  Title,
  Text,
  Spacer,
  ButtonLink,
  ContentColumn,
  ContentColumns,
} from "../../components";
import {
  bluecard,
  pepechucard,
  pepechurcard,
  pepechu_res,
  witchenerycard,
} from "../../assets";

const MintCard: React.FC<any> = () => {
  return (
    <>
      <ContentColumns>
        <ContentColumn
          mobileStyle={{ display: "none" }}
          tabletLStyle={{ display: "flex" }}
          width="40%"
          style={{ paddingTop: "xxl" }}
        >
          <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <LazyLoadImage
              src={witchenerycard}
              alt="witchenery"
              style={{
                objectFit: "cover",
                width: "80%",
                position: "absolute",
                right: "40%",
                top: "-10%",
                zIndex: 99,
              }}
            />
            <LazyLoadImage
              src={pepechucard}
              alt="pepechu"
              style={{
                objectFit: "cover",
                width: "80%",
                position: "absolute",
                right: "10%",
                top: "20%",
              }}
            />
            <LazyLoadImage
              src={bluecard}
              alt="blue"
              style={{
                objectFit: "cover",
                width: "63%",
                position: "absolute",
                left: "-20%",
                top: "70%",
              }}
            />
            <LazyLoadImage
              src={pepechurcard}
              alt="pepechur"
              style={{
                objectFit: "cover",
                width: "20%",
                position: "absolute",
                right: "28%",
                top: "-18%",
              }}
            />
          </div>
        </ContentColumn>

        <ContentColumn
          width="60%"
          style={{ display: "block", paddingTop: "3.75em" }}
        >
          <Title
            as="h2"
            font={theme.font.neometric}
            size="xxl"
            weight={900}
            lineHeight={1.15}
          >
            Collect unique Pepemon NFT cards
          </Title>
          <Spacer size="md" />
          <Text as="p" font={theme.font.spaceMace} underline>
            Scarcity meets pixel perfect art
          </Text>
          <Spacer size="md" />
          <Text as="p" font={theme.font.inter}>
            Use PPDEX to mint unique Pepemon NFT cards. All the cards are
            created by upcoming artists all over the metaverse.
            <br />
            <br />
            Once you have minted your cards, you can become the very best by
            dueling with your NFTs in a Trading Card Game on blockchain!
            <br />
            <br />
            "Pepechu, I choose you!"
          </Text>
          <Spacer size="md" />
          <AlignCenter>
            <ShowOnMobile>
              <LazyLoadImage
                width={374}
                height={520}
                effect="blur"
                src={pepechu_res}
                alt="pepechu"
                style={{ maxWidth: "374px", margin: "0 auto" }}
              />
              <Spacer size="md" />
            </ShowOnMobile>
            <ButtonLink to="/store/cards">Mint your card</ButtonLink>
          </AlignCenter>
        </ContentColumn>
      </ContentColumns>
    </>
  );
};

const ShowOnMobile = styled.div`
  @media (min-width: ${theme.breakpoints.tabletL}) {
    display: none;
  }
`;

const AlignCenter = styled.div`
  @media (max-width: ${theme.breakpoints.tabletL}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default MintCard;
