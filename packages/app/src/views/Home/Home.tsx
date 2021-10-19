import React from 'react'
import styled from 'styled-components'
import { AnimatedImg, ContentBox, ContentBoxNumber, ContentBoxGrid, ContentCentered, ContentColumn, ContentColumns, Evolve, ExternalLink, Footer, Spacer, ButtonLink, Title, Text, SocialBoxes, Newsletter } from "../../components";
import Balances from './components/Balances';
import { theme } from "../../theme";
import { dummyGraph, group, cover, coverblack, fudizardPng, logoexpand, bluecard, pepechucard, witchenerycard, pepechurcard } from "../../assets";

const Home: React.FC<any> = () => {

	return (
		<HomeWrapper>
			<StyledSection bgImage={cover} style={{paddingTop: "12.125em"}}>
				<ContentColumns>
					<ContentColumn width="40%" style={{paddingTop: "3.75em"}}>
						<Title as="h1" font={theme.font.spaceMace} size={4.5}>Gotta claim ‘em all!</Title>
						<Text as="p" font={theme.font.inter} size={1.375}>
							Pepemon is a digital collectible card game on blockchain owned by players. Powered by DeFi and NFTs as in-game assets.
						</Text>
						<Spacer size="lg"/>
						<Spacer size="lg"/>
						<ContentColumns style={{width: "250%"}}>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
								<ContentBox shadow>
									<ContentBoxNumber><span>1</span></ContentBoxNumber>
									<Text as="p" align="center">
										Become a true Pepetrainer by getting $PPBLZ
									</Text>
									<Spacer size="md"/>
									<ButtonLink to="/store">Become a pepetrainer</ButtonLink>
								</ContentBox>
							</ContentColumn>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(30%)"}}>
								<ContentBox shadow>
									<ContentBoxNumber><span>2</span></ContentBoxNumber>
									<Text as="p" align="center">
										Stake your $PPBLZ with
									</Text>
									<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
										100% APY
									</Text>
									<Spacer size="md"/>
									<ButtonLink light to="/staking">Sart staking</ButtonLink>
								</ContentBox>
							</ContentColumn>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(60%)"}}>
								<ContentBox shadow>
									<ContentBoxNumber><span>3</span></ContentBoxNumber>
									<Text as="p" align="center">
										Buy or claim your $PPDEX and get booster packs right now!
									</Text>
									<Spacer size="md"/>
									<ButtonLink light to="/store/boosterpacks">Buy your boosterpack</ButtonLink>
								</ContentBox>
							</ContentColumn>
						</ContentColumns>
					</ContentColumn>
					<ContentColumn width="60%">
						<img src={group} alt="Pepetrainers" style={{maxWidth: "120%", width: "750px"}}/>
					</ContentColumn>
				</ContentColumns>
				<ContentColumns style={{marginTop: "23em", marginBottom: "7.5em"}}>
					<ContentColumn width="40%">
						<div style={{ position: "relative", height: "100%", width: "100%" }}>
							<img loading="lazy" src={witchenerycard} alt="witchenery" style={{ objectFit: "cover", width: "80%", position: "absolute", right: "40%", top: "-10%", zIndex: 99 }}/>
							<img loading="lazy" src={pepechucard} alt="pepechu" style={{ objectFit: "cover", width: "80%", position: "absolute", right: "10%", top: "20%" }}/>
							<img loading="lazy" src={bluecard} alt="blue" style={{ objectFit: "cover", width: "63%", position: "absolute", left: "-20%", top: "70%" }}/>
							<img loading="lazy" src={pepechurcard} alt="pepechur" style={{ objectFit: "cover", width: "20%", position: "absolute", right: "28%", top: "-18%" }}/>
						</div>
					</ContentColumn>
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size={3} weight={900} lineHeight={1.15}>Collect unique Pepemon cards created by real artists</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Pepemon NFT</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Use your Pepedex to claim these unique NFTs pepemon cards. All cards created by real artist all over the world.
							<br/><br/>
							Once you have claimed these cards, you can become the very best by using your NFTs in a trading card game on blockchain!
							<br/><br/>
							"Pepechu, I choose you!"
						</Text>
						<Spacer size="md"/>
						<ButtonLink to="/store/cards">Claim your card</ButtonLink>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection bgImage={coverblack}>
				<ContentCentered style={{paddingTop: "7.5em"}}>
					<Title as="h1" font={theme.font.neometric} size={3} color={theme.color.white} weight={900} align="center" lineHeight={1.04}>
						Lorem ipsum dolor sit amet,<br /> consectetur elit.
					</Title>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.spaceMace} color={theme.color.white} align="center" underline>To the moon</Text>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.inter} color={theme.color.white} align="center">
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat.
					</Text>
					<Spacer size="md"/>

					<Balances />

					<ContentColumns style={{marginTop: "10em", marginBottom: "7.5em"}}>
						<ContentColumn width="40%" style={{paddingTop: "7em"}}>
							<Title as="h2" font={theme.font.neometric} size={3} weight={900} lineHeight={1.04}>Get yours before it too late!</Title>
							<Spacer size="md"/>
							<ContentColumns justify="space-between">
								<ContentColumn>
									<Text as="p" font={theme.font.spaceMace} underline>Golden Fudizard</Text>
								</ContentColumn>
								<ContentColumn>
									<ContentBoxGrid gridTemplate='"meta1 meta2 meta3"'>
										<div style={{ gridArea: "meta1" }}>
											<Text as="p" align="center">total</Text>
											<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">27</Text>
										</div>
										<div style={{ gridArea: "meta2" }}>
											<Text as="p" align="center">total</Text>
											<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">27</Text>
										</div>
										<div style={{ gridArea: "meta3" }}>
											<Text as="p" align="center">total</Text>
											<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">27</Text>
										</div>
									</ContentBoxGrid>
								</ContentColumn>
							</ContentColumns>
							<img loading="lazy" src={dummyGraph} alt="graph"/>
							<ButtonLink style={{display: "inline-block", width: "100%"}} to="/store/cards">
								Buy now
							</ButtonLink>
						</ContentColumn>
						<ContentColumn width="60%">
							<div style={{ position: "relative", height: "100%", width: "100%" }}>
								<ContentCentered>
									<img loading="lazy" src={fudizardPng} alt="fudizard"/>
								</ContentCentered>
							</div>
						</ContentColumn>
					</ContentColumns>
				</ContentCentered>
			</StyledSection>

			<StyledSection>
				<ContentColumns>
					<ContentColumn width="40%">
						<Evolve/>
					</ContentColumn>
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size={3} weight={900}>Stake to evolve</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Staking events</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Stake your awesome Pepemon cards to receive even more awesome exclusive Pepemon rewards.
						</Text>
						<Text as="p" font={theme.font.inter}>
							Place Pepemander into the next rectangle to evolve!
						</Text>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection>
				<ContentColumns style={{marginBottom: "7.5em"}}>
					<ContentColumn width="55%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size={3} weight={900}>The Pepemon Game</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Coming soon</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Duel other trainers on an epic game powered by DeFi and NFT's. Read more about the game mechanics <ExternalLink href="https://example.com">here</ExternalLink> and let's discuss on the different strategies for the closed Beta launch happening soon for card holders.
						</Text>
					</ContentColumn>
					<ContentColumn width="45%">
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
			<Footer/>
		</HomeWrapper>
	)
}

const HomeWrapper = styled.div`
	margin-left: ${props => props.theme.sideBar.width}px;
	width: calc(100vw - ${props => props.theme.sideBar.width}px);
`

const StyledSection = styled.section<{bgImage?: string, bgColor?: string}>`
	background-position: center;
	background-image: ${props => props.bgImage && `url(${props.bgImage})`};
	background-color: ${props => props.bgColor && props.bgColor};
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position-y: 0;
	padding-left: 2em;
	padding-right: 2em;
`

export default Home;
