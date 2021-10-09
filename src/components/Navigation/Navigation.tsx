import { Link } from "react-router-dom";
import styled from "styled-components";
import { pepemon, homeactive } from "../../assets";
import { theme } from "../../theme";
import { useLocation } from "react-router-dom"; // version 5.2.0

const Navigation = () => {
	const { pathname } = useLocation();

	return (
		<StyledMenuOuterWrapper>
			<StyledMenuInnerWrapper>
				<StyledLogoLink to="/" isActive={true}>
					<img loading="lazy" src={pepemon} className="pepemon-icon" alt="logo" />
					<span>Pepemon</span>
				</StyledLogoLink>

				<StyledMenuList>
					<StyledMenuListItem>
						<StyledLink isActive={ pathname === "/" && true } to="/">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Home</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink isActive={ pathname.startsWith("/staking") && true } to="/staking">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Staking</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink isActive={ pathname.startsWith("/subscription") && true } to="/subscription">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Subscription</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink isActive={ pathname.startsWith("/store") && true } to="/store">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Store</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink soon isActive={false} to="/">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>My Collection</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink soon isActive={false} to="/">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Events</span>
						</StyledLink>
					</StyledMenuListItem>
				</StyledMenuList>
			</StyledMenuInnerWrapper>
		</StyledMenuOuterWrapper>
	);
}

const StyledMenuOuterWrapper = styled.div`
	&{
		max-width: ${theme.sideBar.width}px;
		background-color: ${theme.color.typographyAllTextOnDark};
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
	}

	&:hover {
		max-width: unset;
		box-shadow: 0 4px 15px 10px rgba(121,121,121,0.5);
	}

	&:hover span {
		display: block;
	}
`
const StyledMenuInnerWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const StyledMenuList = styled.ul`
	align-items: center;
	display: flex;
	flex-direction: column;
	list-style-type: none;
	padding-left: 32px;
	width: 100%;
`

const StyledMenuListItem = styled.li`
	width: 100%;
`

const StyledLink = styled(Link)<{isActive?: boolean, soon?: boolean}>`
	&{
		align-items: center;
		color: ${props => props.isActive ? theme.color.layoutPrimary : theme.color.layoutOverlay};
		display: flex;
		font-family: ${theme.font.spaceMace};
		justify-content: flex-start;
		margin-bottom: 1.6em;
		margin-top: 1.6em;
		text-decoration: none;
		pointer-events: ${props => props.soon && "none"};
	}

	img {
		opacity: ${props => props.isActive ? 1 : 0.6};
	}

	span {
		display: none;
		flex: 1 0 auto;
		font-size: 1.25rem;
		margin-left: 1em;
		padding-right: 1.9em;
		position: relative;

		${({soon}) => soon && `
			&::after {
				background-image: linear-gradient(to bottom, #aa6cd6 -100%, #713aac);
				border-radius: 8px;
				padding: 3px 5px;
				color: ${theme.color.white};
				content: "soon";
				font-family: "Inter";
				font-size: .9rem;
				opacity: 2;
				position: absolute;
				right: 1.9em;
			}
		`}
	}
`

const StyledLogoLink = styled<any>(StyledLink)`
	margin-left: ${(theme.sideBar.width - 80) / 2}px;
	margin-right: ${(theme.sideBar.width - 80) / 2}px;

	img {
		width: 80px;
	}

	span {
		font-size: 1.6rem;
		font-weight: bold;
	}
`

const StyledLinkIcon = styled.img`
	width: ${theme.sideBar.width / 4}px;
	height: ${theme.sideBar.width / 4}px;
	object-fit: contain;
`

export default Navigation;
