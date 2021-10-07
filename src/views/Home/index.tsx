import styled from "styled-components";
import { Link } from "react-router-dom";
import { ContentBox, ContentBoxNumber, ContentBoxGrid, ContentCentered, ContentColumn, ContentColumns, Footer,
	Spacer, StyledTitle, StyledText, StyledButton, SocialBoxes, Newsletter } from "../../components";
import { theme } from "../../theme";
import "./Home.css";
import { dummyGraph, group, walkr, walkh, walkw, cover, coverblack, fudizardPng, pepemander, logoexpand, bluecard, pepechucard, witchenerycard, pepechurcard, downgreenarrow } from "../../assets";
import { Value } from "../../components";
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
					<StyledTitle as="h1" font={theme.font.spaceMace} size="4.5rem">Gotta claim ‘em all!</StyledTitle>
					<StyledText as="p" font={theme.font.inter} size="1.375rem">
						Pepemon is a digital collectible card game on blockchain owned by players. Powered by DeFi and NFTs as in-game assets.
					</StyledText>
				</ContentColumn>
				<ContentColumn width="60%">
					<img src={group} alt="Pepetrainers" style={{maxWidth: "120%", width: "750px"}}/>
				</ContentColumn>
			</ContentColumns>
			<ContentColumns>
				<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
					<ContentBox>
						<ContentBoxNumber><span>1</span></ContentBoxNumber>
						<StyledText as="p" align="center" lineHeight="1.5">
							Become a true Pepetrainer by getting $PPBLZ
						</StyledText>
						<Spacer size="md"/>
						<StyledLink to="/store">Become a pepetrainer</StyledLink>
					</ContentBox>
				</ContentColumn>
				<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
					<ContentBox>
						<ContentBoxNumber><span>2</span></ContentBoxNumber>
						<StyledText as="p" align="center" lineHeight="1.5">
							Stake your $PPBLZ with
						</StyledText>
						<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">
							100% APY
						</StyledText>
						<Spacer size="md"/>
						<StyledLink light to="/staking">Sart staking</StyledLink>
					</ContentBox>
				</ContentColumn>
				<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
					<ContentBox>
						<ContentBoxNumber><span>3</span></ContentBoxNumber>
						<StyledText as="p" align="center" lineHeight="1.5">
							Buy or claim your $PPDEX and get booster packs right now!
						</StyledText>
						<Spacer size="md"/>
						<StyledLink light to="/store/boosterpacks">Buy your boosterpack</StyledLink>
					</ContentBox>
				</ContentColumn>
			</ContentColumns>
			<ContentColumns style={{marginTop: "23em", marginBottom: "7.5em"}}>
				<ContentColumn width="40%">
					<div style={{ position: "relative", height: "100%", width: "100%" }}>
						<img src={witchenerycard} alt="witchenery" style={{ objectFit: "cover", width: "80%", position: "absolute", right: "40%", top: "-10%", zIndex: 99 }}/>
						<img src={pepechucard} alt="pepechu" style={{ objectFit: "cover", width: "80%", position: "absolute", right: "10%", top: "20%" }}/>
						<img src={bluecard} alt="blue" style={{ objectFit: "cover", width: "63%", position: "absolute", left: "-20%", top: "70%" }}/>
						<img src={pepechurcard} alt="pepechur" style={{ objectFit: "cover", width: "20%", position: "absolute", right: "28%", top: "-18%" }}/>
					</div>
				</ContentColumn>
				<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
					<StyledTitle as="h2" font={theme.font.neometric} size="3rem">Collect unique Pepemon cards created by real artists</StyledTitle>
					<Spacer size="md"/>
					<StyledText as="p" font={theme.font.spaceMace} txtDecoration="underline">Pepemon NFT</StyledText>
					<Spacer size="md"/>
					<StyledText as="p" font={theme.font.inter} lineHeight="1.5">
						Use your Pepedex to claim these unique NFTs pepemon cards. All cards created by real artist all over the world.
						<br/><br/>
						Once you have claimed these cards, you can become the very best by using your NFTs in a trading card game on blockchain!
						<br/><br/>
						"Pepechu, I choose you!"
					</StyledText>
					<Spacer size="md"/>
					<StyledButton>Claim your card</StyledButton>
				</ContentColumn>
			</ContentColumns>
		</StyledSection>

		<StyledSection bgImage={coverblack}>
			<ContentCentered style={{paddingTop: "7.5em"}}>
				<StyledTitle as="h1" font={theme.font.neometric} size="3rem" color={theme.color.white} weight={900} align="center">
					Lorem ipsum dolor sit amet,<br /> consectetur elit.
				</StyledTitle>
				<Spacer size="md"/>
				<StyledText as="p" font={theme.font.spaceMace} color={theme.color.white} align="center" txtDecoration="underline">To the moon</StyledText>
				<Spacer size="md"/>
				<StyledText as="p" font={theme.font.inter} lineHeight="1.5" color={theme.color.white} align="center">
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat.
				</StyledText>
				<Spacer size="md"/>
				<ContentBoxGrid gridTemplate='"box1 box1 box2 box2 box3 box3" "box4 box4 box4 box5 box5 box5"'>
					<ContentBox style={{ gridArea: "box1" }}>
						<StyledText as="p" align="center" lineHeight="1.5">Total PPBLZ value locked</StyledText>
						<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">
							<Value value={
								poolStatistics.ppblzPool && poolStatistics.uniV2Pool
								? poolStatistics.uniV2Pool.tvl + poolStatistics.ppblzPool.tvl
								: "Loading..." }/>
						</StyledText>
					</ContentBox>
					<ContentBox style={{ gridArea: "box2" }}>
						<StyledText as="p" align="center" lineHeight="1.5">PPDEX Burned</StyledText>
						<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">
							<Value value={
								!!pepemon.account ? getBalanceNumber(totalSpendInShop.multipliedBy(0.9))
								: "Available before VCs can dump" }/>
						</StyledText>
					</ContentBox>
					<ContentBox style={{ gridArea: "box3" }}>
						<StyledText as="p" align="center" lineHeight="1.5">Total NFT’s solds</StyledText>
						<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">1029</StyledText>
					</ContentBox>
					<ContentBox style={{ gridArea: "box4" }}>
						<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">100% APY</StyledText>
						<StyledText as="p" align="center" lineHeight="1.5">
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</StyledText>
					</ContentBox>
					<ContentBox style={{ gridArea: "box5" }}>
						<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">Staking</StyledText>
						<StyledText as="p" align="center" lineHeight="1.5">
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</StyledText>
					</ContentBox>
				</ContentBoxGrid>

				<ContentColumns style={{marginTop: "23em", marginBottom: "7.5em"}}>
					<ContentColumn width="40%" style={{paddingTop: "3.75em"}}>
						<StyledTitle as="h2" font={theme.font.neometric} size="3rem">Get yours before it too late!</StyledTitle>
						<Spacer size="md"/>
						<ContentColumns justify="space-between">
							<ContentColumn>
								<StyledText as="p" font={theme.font.spaceMace} txtDecoration="underline">Golden Fudizard</StyledText>
							</ContentColumn>
							<ContentColumn>
								<ContentBoxGrid gridTemplate='"meta1 meta2 meta3"'>
									<div style={{ gridArea: "meta1" }}>
										<StyledText as="p" align="center" lineHeight="1.5">total</StyledText>
										<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">27</StyledText>
									</div>
									<div style={{ gridArea: "meta2" }}>
										<StyledText as="p" align="center" lineHeight="1.5">total</StyledText>
										<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">27</StyledText>
									</div>
									<div style={{ gridArea: "meta3" }}>
										<StyledText as="p" align="center" lineHeight="1.5">total</StyledText>
										<StyledText as="p" size="2rem" font={theme.font.neometric} weight={900} align="center">27</StyledText>
									</div>
								</ContentBoxGrid>
							</ContentColumn>
						</ContentColumns>
						<img src={dummyGraph} alt="graph"/>
						<StyledButton width="100%">Buy now</StyledButton>
					</ContentColumn>
					<ContentColumn width="60%">
						<div style={{ position: "relative", height: "100%", width: "100%" }}>
							<ContentCentered>
								<img src={fudizardPng} alt="fudizard"/>
							</ContentCentered>
						</div>
					</ContentColumn>
				</ContentColumns>
			</ContentCentered>
		</StyledSection>
		<div className="middle-container">
		  <div className="stake-evolve">
			<div className="img-evolve">
			  <img className="pepemander-display" src={pepemander} />
			  <div className="dotted-div" style={{ marginTop: "470px" }}>
				<img src={downgreenarrow} className="downgreenarrow" />
			  </div>
			  <div className="dotted-div" style={{ marginTop: "870px" }}></div>
			</div>
			<div className="text-evolve">
			  <span className="Stake-to-evolve">Stake to evolve</span>
			  <span className="underlined-text" style={{ width: "132px" }}>
				Staking events
				<div
				  className="underline-div"
				  style={{ width: "132px", marginLeft: "0" }}
				></div>
			  </span>
			  <span className="Stake-your-awesome-P">
				Stake your awesome Pepemon cards to receive even more awesome
				exclusive Pepemon rewards.
				<br />
				<br />
				Place Pepemander into the next rectangle to evolve!
			  </span>
			</div>
		  </div>
		</div>

		<StyledSection>
			<ContentColumns style={{marginBottom: "7.5em"}}>
				<ContentColumn width="55%" style={{paddingTop: "3.75em"}}>
					<StyledTitle as="h2" font={theme.font.neometric} size="3rem">The Pepemon Game</StyledTitle>
					<Spacer size="md"/>
					<StyledText as="p" font={theme.font.spaceMace} txtDecoration="underline">Coming soon</StyledText>
					<Spacer size="md"/>
					<StyledText as="p" font={theme.font.inter} lineHeight="1.5">
						Duel other trainers on an epic game powered by DeFi and NFT's. Read more about the game mechanics here and let's discuss on the different strategies for the closed Beta launch happening soon for card holders.
					</StyledText>
				</ContentColumn>
				<ContentColumn width="45%">
					<div style={{ position: "relative", height: "100%", width: "100%" }}>
						<img src={logoexpand} alt="Pepemon"/>
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
