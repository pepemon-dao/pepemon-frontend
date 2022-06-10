import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'web3modal';
// import { useTranslation } from 'react-i18next';
import { AnimatedImg, ContentCentered, ContentColumn, ContentColumns, Evolve, Head, Hero, Stats, Spacer, ButtonLink, Title, Text, SocialBoxes, Newsletter, ContentBox, ContentBoxNumber, ExternalLink } from '../../components';
import Balances from './components/Balances';
import { theme } from '../../theme';
import { useTokenPrices } from '../../hooks';
import { calculatePpblzApy } from '../../utils';
import { cover, coverblack, logoexpand, pepechu_res, cardsStack } from '../../assets';

const Home: React.FC<any> = () => {
	const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);
	// const { t, i18n } = useTranslation();

	return (
		<HomeWrapper bgImage={cover}>
			<Head title='Pepemon - DeFi, NFTs, Blockchain gaming'
				description='Earn $PPDEX with $PPBLZ Token. Use $PPDEX to Mint NFTs and use those to duel others on a blockchain trading card game!'
				twitterTitle='Pepemon! Community-driven TCG on blockchain'
				twitterDescription='Pepemon DeFi economy is powered by $PPBLZ, staking it earns $PPDEX. Collectors and gamers can get their NFT cards on our store. Subscribe to Pepemon One NFT subscription for exclusive NFTs every month.'/>
			<StyledSection
				desktopStyle={{paddingTop: "12.125em"}}
				mobileStyle={{paddingTop: '3em', backgroundColor: theme.color.purple[200]}}>
				<Hero apy={`${ppblzApy.toFixed(0)}% APY`}/>
			</StyledSection>

			<StyledSection desktopStyle={{marginTop: "17em", marginBottom: "7.5em"}}>
				<ContentColumns>
					<ContentColumn width="40%" style={{paddingTop: "xxl"}}>
						<Title as="h1" font={theme.font.spaceMace} size={'xxxl'}>Gotta battle ‘em all!</Title>
						<Text as="p" font={theme.font.inter} size={'s'}>
							Digital Collectible Card Games in Metaverse. Owned by the gamers, airdropped 100%, since 2020. PlayAndEarn powered by DeFi with NFTs as in-game cards.
						</Text>
						<Title as="h1" font={theme.font.spaceMace} size={'xxxl'}>Gotta claim ‘em all!</Title>
						<Text as="p" font={theme.font.inter} size={'s'}>
							Digital collectible card games on blockchain owned by the players. 100% airdropped. Play2Earn games powered by DeFi and NFTs in-game assets.
						</Text>
						<Spacer size="lg"/>
						<Spacer size="lg"/>
						<ContentColumns style={{width: "250%"}}>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
								<ContentBox shadow>
									<ContentBoxNumber><span>1</span></ContentBoxNumber>
									<Text as="p" align="center">
										Own a piece of Pepemon and vote with PPBLZ
									</Text>
									<Spacer size="md"/>
									<ExternalLink href="https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8" styling='button'>
										Shape the path with other Pepetrainers
										Start your journey by getting $PPBLZ
									</ExternalLink>
									<Spacer size="md"/>
								</ContentBox>
							</ContentColumn>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(30%)"}}>
								<ContentBox shadow>
									<ContentBoxNumber><span>2</span></ContentBoxNumber>
									<Text as="p" align="center">
										Stake your $PPBLZ with
									</Text>
									<Text as="p" size={'l'} font={theme.font.neometric} weight={900} align="center">
										{ppblzApy.toFixed(0)}% APY
									</Text>
									<Spacer size="md"/>
									<ButtonLink light="true" to="/staking">Start earning</ButtonLink>
								</ContentBox>
							</ContentColumn>
						</ContentColumns>
					</ContentColumn>
					
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900} lineHeight={1.15}>Collect unique Pepemon NFT cards</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Scarcity meets pixel perfect art</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Use PPDEX to mint unique Pepemon NFT cards. All the cards are created by upcoming artists all over the metaverse.
							<br/><br/>
							Once you have minted your cards, you can become the very best by dueling with your NFTs in a Trading Card Game on blockchain!
							<br/><br/>
							"Pepechu, I choose you!"
						</Text>
						<Spacer size="md"/>
						{ isMobile() &&
							<>
								<img loading="lazy" src={pepechu_res} alt='pepechu'style={{ objectFit: "cover"}}/>
								<Spacer size="md"/>
							</>
						}
						<ButtonLink to="/store/cards">Mint your cards</ButtonLink>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection bgImage={coverblack} desktopStyle={{ color: theme.color.white, textAlign: 'center' }}>
				<ContentCentered style={{paddingTop: "7.5em"}}>
					<Title as="h1" font={theme.font.neometric} size='xxl' color='inherit' weight={900} lineHeight={1.04}>
						Start earning<br /> before ETH 2.0.
					</Title>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.spaceMace} align='left' color='inherit' underline>NO VCs. No pre-sale.</Text>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.inter} color='inherit'>
						Pepemon tokens were 100% airdropped. No VCs and No token Sale was held, just 300 people got PPBLZ airdropped to their wallets. Since then on average more than 80% of those tokens were staked to generate PPDEX and mint NFT Cards.
					</Text>
					<Spacer size="md"/>

					<Balances />

					<Stats/>
				</ContentCentered>
			</StyledSection>

			<StyledSection>
				<ContentColumns mobileStyle={{ flexDirection: 'column-reverse' }}>
					<ContentColumn width="40%">
						<Evolve/>
					</ContentColumn>
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size={'xxl'} weight={900}>Evolve your monsters and upgrade your cards</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Breed more Exclusive PepeMonsters!</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Evolve your awesome Pepemon cards and mint exclusive cards to crush your enemies on blockchain decided battles.
						</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Staking events</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Evolve your awesome Pepemon cards to mint exclusive cards and crush your enemies in blockchain battles.
						</Text>
						<Text as="p" font={theme.font.inter}>
							Don't forget to use the NFT Evolution Qubes to save your monsters when evolving!
						</Text>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection>
				<ContentColumns style={{marginBottom: "7.5em"}}>
					<ContentColumn width="55%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900}>Pepemon: Degen Battleground</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Release coming in 2022</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Duel other trainers on an epic game powered by DeFi and NFT's. Become a professional Pepetrainer with the PlayAndEarn mechanism that enables each player to get exclusive drops after a battle no matter what the skill level or collection size, there is always an opportunity to earn for everyone!
						</Text>
						<Text as="p" font={theme.font.spaceMace} underline>Beta release late 2021</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Duel other trainers on an epic game powered by DeFi and NFT's. Become a professional Pepetrainer with the Play2Earn mechanism that enables each player to get exclusive drops after a battle no matter what the skill level or collection size, there is always an opportunity to earn!
						</Text>
					</ContentColumn>
					<ContentColumn mobileStyle={{ marginTop: '2em' }} width="45%">
						<div style={{ position: "relative", height: "100%", width: "100%" }}>
							<AnimatedImg src={logoexpand} alt="Pepemon"/>
						</div>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection bgColor={theme.color.purple[300]}>
				<Newsletter/>
			</StyledSection>

			<StyledSection bgColor={theme.color.purple[200]}>
				<SocialBoxes/>
			</StyledSection>
		</HomeWrapper>
	)
}

const HomeWrapper = styled.main<{bgImage?: string}>`
	padding-bottom: ${theme.footer.spaceTop}px;
	width: 100vw;

	@media (min-width: ${theme.breakpoints.desktop}) {
		${ props => props.bgImage && `
			background-image: url(${props.bgImage});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 0;
		`}
		margin-left: ${theme.sideBar.width.closed}px;
		width: calc(100vw - ${theme.sideBar.width.closed}px);
	}
`

interface StyledSectionProps {
	bgImage?: string,
	bgColor?: string,
	desktopStyle?: object,
	mobileStyle?: object,
}

const StyledSection = styled.section<any>`
	background-color: ${props => props.bgColor && props.bgColor};
	padding-left: clamp(1em, 2.65vw, 2em);
	padding-right: clamp(1em, 2.65vw, 2em);

	@media (max-width: ${theme.breakpoints.desktop}) {
		${props => props.mobileStyle && props.mobileStyle}
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		${ props => props.bgImage && `
			background-image: url(${props.bgImage});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 0;
		`}
		${props => props.desktopStyle && props.desktopStyle}
	}
`

export default Home;
