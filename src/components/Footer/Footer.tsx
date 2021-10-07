import styled from "styled-components";
import { footercover, logoexpand } from "../../assets";
import { theme } from "../../theme";
import { StyledTitle } from "../../components";

const Footer = () => {
	return (
		<StyledFooter>
			<div style={{ height: "450px" }}/>
			<StyledFooterInner>

				<StyledFooterGrid>
					<div>
						<img src={logoexpand} alt="pepemon logo" style={{maxWidth: "10em"}}/>
					</div>
					<div>
						<StyledTitle as="h2" size="0.8rem" weight={400} color={theme.color.white}>PEPEMON</StyledTitle>
						<StyledList>
							<li><StyledLink href="#">About</StyledLink></li>
							<li><StyledLink href="#">Whitepaper</StyledLink></li>
							<li><StyledLink href="#">Pepemon the game</StyledLink></li>
						</StyledList>
					</div>
					<div>
						<StyledTitle as="h2" size="0.8rem" weight={400} color={theme.color.white}>TOKENS</StyledTitle>
						<StyledList>
							<li><StyledLink href="#">PPBLZ Contract</StyledLink></li>
							<li><StyledLink href="#">PPDEX Contract</StyledLink></li>
							<li><StyledLink href="#">Buy $PPBLZ</StyledLink></li>
							<li><StyledLink href="#">Buy $PPDEX</StyledLink></li>
						</StyledList>
					</div>

					<div>
						<StyledTitle as="h2" size="0.8rem" weight={400} color={theme.color.white}>SOCIALS</StyledTitle>
						<StyledList>
							<li><StyledLink href="#">Twitter</StyledLink></li>
							<li><StyledLink href="#">Telegram</StyledLink></li>
							<li><StyledLink href="#">Discord </StyledLink></li>
							<li><StyledLink href="#">Github</StyledLink></li>
							<li><StyledLink href="#">Medium</StyledLink></li>
							<li><StyledLink href="#">OpenSea</StyledLink></li>
						</StyledList>
					</div>
				</StyledFooterGrid>
				<StyledFooterLegal>
					<hr/>
					<StyledFooterLegalInner>
						<StyledFooterLegalLinks>
							<a href="#">Terms of service</a>
							<a href="#">Privacy policy</a>
							<a href="#">Cookie policy</a>
						</StyledFooterLegalLinks>
						<div>
							© 2021
						</div>
					</StyledFooterLegalInner>
				</StyledFooterLegal>
			</StyledFooterInner>
		</StyledFooter>
	)
}

const StyledFooter = styled.footer`
	background-position-x: center;
	background-position-y: 100%;
	background-image: url(${footercover});
	background-size: 100% auto;
	background-repeat: no-repeat;
`

const StyledFooterInner = styled.div`
	margin-left: auto;
	margin-right: auto;
	max-width: ${theme.page.maxWidth}px;
`

const StyledFooterGrid = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-template-columns: repeat(4, 1fr);
	padding-bottom: 2em;
`

const StyledList = styled.ul`
	list-style-type: none;
	padding-left: 0;
`

const StyledLink = styled.a`
	color: ${theme.color.white};
	font-size: .875rem;
	line-height: 1.6;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`

const StyledFooterLegal = styled.div`
	color: ${theme.color.white};
	font-size: .875rem;
	opacity: .6;
`

const StyledFooterLegalInner = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	padding-bottom: 1.5em;
	padding-top: 1.5em;
`

const StyledFooterLegalLinks = styled.div`
	display: flex;

	a {
		color: currentColor;
		text-decoration: none;

		&:not(:first-child) {
			margin-left: 1.5em;
		}
	}
`

export default Footer;
