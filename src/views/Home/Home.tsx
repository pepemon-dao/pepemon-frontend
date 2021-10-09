import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, ContentBox, ContentBoxNumber, ContentBoxGrid, ContentCentered, ContentColumn, ContentColumns, Footer,
	Spacer, Title, Text, SocialBoxes, Newsletter, Value } from "../../components";
import { theme } from "../../theme";
import "./Home.css";
import { dummyGraph, group, cover, coverblack, fudizardPng, pepemander, logoexpand, bluecard, pepechucard, witchenerycard, pepechurcard, downgreenarrow } from "../../assets";
import { getBalanceNumber } from "../../utils";
import { useTotalValueStaked, useTotalSpendInShop, usePepemon } from "../../hooks";

const Home: React.FC<any> = ({ appChainId: chainId, setChainId }) => {
  const poolStatistics = useTotalValueStaked();
  const totalSpendInShop = useTotalSpendInShop();
  const pepemon = usePepemon();

  return (
	<HomeWrapper>
		<StyledSection bgImage={cover} style={{paddingTop: "12.125em"}}>
			<ContentColumns>
				<ContentColumn width="40%" style={{paddingTop: "3.75em"}}>
					<Title as="h1" font={theme.font.spaceMace} size={4.5}>Gotta claim ‘em all!</Title>
					<Text as="p" font={theme.font.inter} size={1.375}>
						Pepemon is a digital collectible card game on blockchain owned by players. Powered by DeFi and NFTs as in-game assets.
					</Text>
				</ContentColumn>
				<ContentColumn width="60%">
					<img loading="lazy" src={group} alt="Pepetrainers" style={{maxWidth: "120%", width: "750px"}}/>
				</ContentColumn>
			</ContentColumns>
			<ContentColumns>
				<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
					<ContentBox>
						<ContentBoxNumber><span>1</span></ContentBoxNumber>
						<Text as="p" align="center">
							Become a true Pepetrainer by getting $PPBLZ
						</Text>
						<Spacer size="md"/>
						<StyledLink to="/store">Become a pepetrainer</StyledLink>
					</ContentBox>
				</ContentColumn>
				<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
					<ContentBox>
						<ContentBoxNumber><span>2</span></ContentBoxNumber>
						<Text as="p" align="center">
							Stake your $PPBLZ with
						</Text>
						<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
							100% APY
						</Text>
						<Spacer size="md"/>
						<StyledLink light to="/staking">Sart staking</StyledLink>
					</ContentBox>
				</ContentColumn>
				<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
					<ContentBox>
						<ContentBoxNumber><span>3</span></ContentBoxNumber>
						<Text as="p" align="center">
							Buy or claim your $PPDEX and get booster packs right now!
						</Text>
						<Spacer size="md"/>
						<StyledLink light to="/store/boosterpacks">Buy your boosterpack</StyledLink>
					</ContentBox>
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
					<Button styling="purple">Claim your card</Button>
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
				<ContentBoxGrid gridTemplate='"box1 box1 box2 box2 box3 box3" "box4 box4 box4 box5 box5 box5"'>
					<ContentBox style={{ gridArea: "box1" }}>
						<Text as="p" align="center">Total PPBLZ value locked</Text>
						<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
							<Value value={
								poolStatistics.ppblzPool && poolStatistics.uniV2Pool
								? poolStatistics.uniV2Pool.tvl + poolStatistics.ppblzPool.tvl
								: "Loading..." }/>
						</Text>
					</ContentBox>
					<ContentBox style={{ gridArea: "box2" }}>
						<Text as="p" align="center">PPDEX Burned</Text>
						<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
							<Value value={
								!!pepemon.account ? getBalanceNumber(totalSpendInShop.multipliedBy(0.9))
								: "Available before VCs can dump" }/>
						</Text>
					</ContentBox>
					<ContentBox style={{ gridArea: "box3" }}>
						<Text as="p" align="center">Total NFT’s solds</Text>
						<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">1029</Text>
					</ContentBox>
					<ContentBox style={{ gridArea: "box4" }}>
						<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">100% APY</Text>
						<Text as="p" align="center">
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Text>
					</ContentBox>
					<ContentBox style={{ gridArea: "box5" }}>
						<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Staking</Text>
						<Text as="p" align="center">
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Text>
					</ContentBox>
				</ContentBoxGrid>

				<ContentColumns style={{marginTop: "23em", marginBottom: "7.5em"}}>
					<ContentColumn width="40%" style={{paddingTop: "3.75em"}}>
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
						<Button styling="purple" width="100%">Buy now</Button>
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
					<div style={{ position: "relative", height: "100%", width: "250%",
						display: "grid",
						gridAutoRows: "1fr"
					}}>
						<div>
							<div style={{width: "28%"}}>
								<img loading="lazy" src={pepemander} alt="pepemander" />
							</div>
						</div>
						<div style={{width: "100%", margin: "0 auto", transform: "translateY(-30%)"}}>
							<img loading="lazy" src={downgreenarrow} alt="downgreenarrow" style={{position: "relative", left: "40%", transform: "translateX(-50%) translateY(60%)"}}/>
							<div style={{border: "1px dashed gray", borderRadius: "8px", height: "100%", left: "50%", transform: "translateX(-50%)", position: "absolute", width: "28%"}}/>
						</div>
						<div style={{width: "100%", margin: "0 0 0 auto", transform: "translateY(-60%)"}}>
							<div style={{border: "1px dashed gray", borderRadius: "8px", height: "100%", right: "0", position: "absolute", width: "28%"}}/>
						</div>
					</div>
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
						Duel other trainers on an epic game powered by DeFi and NFT's. Read more about the game mechanics here and let's discuss on the different strategies for the closed Beta launch happening soon for card holders.
					</Text>
				</ContentColumn>
				<ContentColumn width="45%">
					<div style={{ position: "relative", height: "100%", width: "100%" }}>
						<img loading="lazy" src={logoexpand} alt="Pepemon"/>
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
  );
};

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

const StyledLink = styled(Link)<{light?: boolean}>`
	background-color: ${props => props.light && props.theme.color.white};
	background-image: ${props => !props.light && `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})`};
	border-radius: 8px;
	border: ${props => props.light && `1px solid ${props.theme.color.purple[600]}`};
	box-shadow: ${props => !props.light && "0 4px 10px 0 rgba(121, 121, 121, 0.5)"};
	color: ${props => props.light ? props.theme.color.purple[600] : props.theme.color.white};
	font-family: ${props => props.theme.font.spaceMace};
	padding: 12px 24px;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: .2s all ease-in;

	&:hover {
		background-image: ${props => props.light ? `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})` : "unset"};
		background-color: ${props => !props.light && props.theme.color.white};
		border: ${props => !props.light && `1px solid ${props.theme.color.purple[600]}`};
		color: ${props => props.light ? props.theme.color.white : props.theme.color.purple[600]};
		box-shadow: 0 4px 10px 0 rgba(121, 121, 121, 0.5);
	}
`

export default Home;
