import React, { useContext } from 'react';
import { ContentBoxGrid, ContentBox, Text, Value } from '../../../components';
import { theme } from '../../../theme';
import { PepemonProviderContext } from "../../../contexts";
//  Old
import { getBalanceNumber } from '../../../utils';
import { useTotalValueStaked, useTotalSpendInShop } from '../../../hooks';

const Balances: React.FC = () => {
  const poolStatistics = useTotalValueStaked();
  const totalSpendInShop = useTotalSpendInShop();
  const [pepemon] = useContext(PepemonProviderContext);
  const { account } = pepemon;

	return (
		<ContentBoxGrid gridTemplate='"box1 box1 box2 box2 box3 box3" "box4 box4 box4 box5 box5 box5"'>
			<ContentBox style={{ gridArea: "box1" }}>
				<Text as="p" align="center">Total PPBLZ value locked</Text>
				<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
					<Value
						value={
							poolStatistics.ppblzPool && poolStatistics.uniV2Pool ?
							poolStatistics.uniV2Pool.tvl + poolStatistics.ppblzPool.tvl :
							'Loading...'
						}
					/>
				</Text>
			</ContentBox>
			<ContentBox style={{ gridArea: "box2" }}>
				<Text as="p" align="center">PPDEX Burned</Text>
				<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
					<Value value={!!account ? getBalanceNumber(totalSpendInShop.multipliedBy(0.9)) : 'Available before VCs can dump'}/>
				</Text>
			</ContentBox>
			<ContentBox style={{ gridArea: "box3" }}>
				<Text as="p" align="center">Total NFT’s solds</Text>
				<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Over 5000</Text>
			</ContentBox>
			<ContentBox style={{ gridArea: "box4" }}>
				<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Sustainable APY</Text>
				<Text as="p" align="center">
					Pepemon uses a unique system for those participating in it's DeFi economy. Because we want to offer a predictable yield and minimize inflation, each PPBLZ produces around 14 PPDEX per year.
				</Text>
			</ContentBox>
			<ContentBox style={{ gridArea: "box5" }}>
				<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Care-free staking</Text>
				<Text as="p" align="center">
					Users have the choice of staking PPBLZ on our platform for basic APY, or stake PPBLZ-ETH LP tokens for double the rewards in PPDEX. Collect fees and help other Pepetrainers trade by staking LP tokens.
				</Text>
			</ContentBox>
		</ContentBoxGrid>
	)
}

export default Balances;
