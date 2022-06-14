import React, { useContext } from "react";
import styled from "styled-components";
import { ContentBoxGrid, ContentBox, Text, Value } from "../../../components";
import { theme } from "../../../theme";
import { PepemonProviderContext } from "../../../contexts";
import { getBalanceNumber } from "../../../utils";
import { useTotalValueStaked, useTotalSpendInShop } from "../../../hooks";
import { walk1, walk2, walk3 } from "../../../assets";

const Balances: React.FC = () => {
  const poolStatistics = useTotalValueStaked();
  const totalSpendInShop = useTotalSpendInShop();
  const [pepemon] = useContext(PepemonProviderContext);
  const { account } = pepemon;

  return (
    <div>
      <CustomContentBoxGrid>
        <WalkingPepemon src={walk1} delay="0s" duration="10.5s" />
		<WalkingPepemon src={walk2} delay="-3.5s" duration="13.2s" />
		<WalkingPepemon src={walk3} delay="-8.2s" duration="11.1s"/>
        <CustomContentBox style={{ gridArea: "box1" }}>
          <Text as="p" align="center">
            Total PPBLZ value locked
          </Text>
          <Text
            as="p"
            size="xl"
            font={theme.font.neometric}
            weight={900}
            align="center"
          >
            <Value
              value={
                poolStatistics.ppblzPool && poolStatistics.uniV2Pool
                  ? poolStatistics.uniV2Pool.tvl + poolStatistics.ppblzPool.tvl
                  : "Loading..."
              }
            />
          </Text>
        </CustomContentBox>
        <CustomContentBox style={{ gridArea: "box2" }}>
          <Text as="p" align="center">
            PPDEX Burned
          </Text>
          <Text
            as="p"
            size="xl"
            font={theme.font.neometric}
            weight={900}
            align="center"
          >
            <Value
              value={
                !!account
                  ? getBalanceNumber(totalSpendInShop.multipliedBy(0.9))
                  : "Available before VCs can dump"
              }
            />
          </Text>
        </CustomContentBox>
        <CustomContentBox style={{ gridArea: "box3" }}>
          <Text as="p" align="center">
            Total NFT’s solds
          </Text>
          <Text
            as="p"
            size="xl"
            font={theme.font.neometric}
            weight={900}
            align="center"
          >
            Over 5000
          </Text>
        </CustomContentBox>
        <CustomContentBox style={{ gridArea: "box4" }}>
          <Text
            as="p"
            size="xl"
            font={theme.font.neometric}
            weight={900}
            align="center"
          >
            Sustainable APY
          </Text>
          <Text as="p" align="center">
            Pepemon uses a unique system for those participating in it's DeFi
            economy. Because we want to offer a predictable yield and minimize
            inflation, each PPBLZ produces around 14 PPDEX per year.
          </Text>
        </CustomContentBox>
        <CustomContentBox style={{ gridArea: "box5" }}>
          <Text
            as="p"
            size="xl"
            font={theme.font.neometric}
            weight={900}
            align="center"
          >
            Care-free staking
          </Text>
          <Text as="p" align="center">
            Users have the choice of staking PPBLZ on our platform for basic
            APY, or stake PPBLZ-ETH LP tokens for double the rewards in PPDEX.
            Collect fees and help other Pepetrainers trade by staking LP tokens.
          </Text>
        </CustomContentBox>
      </CustomContentBoxGrid>
    </div>
  );
};

const CustomContentBoxGrid = styled(ContentBoxGrid)`
  grid-template-areas: "box1" "box2" "box3" "box4" "box5";
  position: relative;

  @media (min-width: ${theme.breakpoints.tabletL}) {
    grid-template-areas: "box1 box1 box2 box2 box3 box3" "box4 box4 box4 box5 box5 box5";
  }
`;

const CustomContentBox = styled(ContentBox)`
  @media (max-width: ${theme.breakpoints.tabletL}) {
    box-shadow: 2px 4px 10px 5px ${theme.color.colorsLayoutShadows};
  }
`;

interface WalkingPepemonProps {
  duration?: string;
  delay?: string;
}

const WalkingPepemon = styled.img<WalkingPepemonProps>`
  position: absolute;
  top: -96px;
  left: -96px;
  width: 96px;
  height: 96px;
  animation: walk-pepemon ${(props) => props.duration || "12s"} linear infinite;
  animation-delay: ${(props) => props.delay || "0s"};
  z-index: 1;

  @keyframes walk-pepemon {
    0% {
      top: calc(0% - 96px);
      left: calc(0% - 96px);
      transform: rotate(0deg);
    }
    25% {
      top: calc(0% - 96px);
      left: 100%;
      transform: rotate(0deg);
    }
    30% {
      top: calc(0%);
      left: calc(100%);
      transform: rotate(90deg);
    }
    45% {
      top: 100%;
      left: 100%;
      transform: rotate(90deg);
    }
    50% {
      top: 100%;
      left: calc(100% - 96px);
      transform: rotate(180deg);
    }
    75% {
      top: 100%;
      left: 0%;
      transform: rotate(180deg);
    }
    80% {
      top: calc(100% - 96px);
      left: calc(0% - 96px);
      transform: rotate(270deg);
    }
    95% {
      top: 0%;
      left: calc(0% - 96px);
      transform: rotate(270deg);
    }
    100% {
      top: calc(0% - 96px);
      left: calc(0% - 96px);
      transform: rotate(360deg);
    }
  }
`;

export default Balances;
