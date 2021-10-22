import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { pepemon, events, home, my_collection, staking, store, subscriptions, logoexpand } from "../../assets";
import { theme } from "../../theme";

const Navigation = () => {
	const [navLogo, setNavLogo] = useState(pepemon);
	const { pathname } = useLocation();

	return (
		<StyledMenuOuterWrapper onMouseEnter={() => setNavLogo(logoexpand)} onMouseLeave={() => setNavLogo(pepemon)}>
			<StyledMenuInnerWrapper>
				<StyledLogoLink to="/">
					<img src={navLogo} alt="logo" />
				</StyledLogoLink>

				<StyledMenuList>
					<StyledMenuListItem isActive={ pathname === "/" && true }>
						<StyledLink to="/">
							<StyledLinkIcon loading="lazy" src={ home } alt="logo" />
							<span>Home</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem isActive={ pathname.startsWith("/staking") && true }>
						<StyledLink to="/staking">
							<StyledLinkIcon loading="lazy" src={ staking } alt="logo" />
							<span>Staking</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem isActive={ pathname.startsWith("/subscription") && true }>
						<StyledLink to="/subscription">
							<StyledLinkIcon loading="lazy" src={ subscriptions } alt="logo" />
							<span>Subscription</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem isActive={ pathname.startsWith("/store") && true }>
						<StyledLink to="/store">
							<StyledLinkIcon loading="lazy" src={ store } alt="logo" />
							<span>Store</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem soon isActive={false}>
						<StyledLink to="/">
							<StyledLinkIcon loading="lazy" src={ my_collection } alt="logo" />
							<span>My Collection</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem soon isActive={false}>
						<StyledLink to="/">
							<StyledLinkIcon loading="lazy" src={ events } alt="logo" />
							<span>Events</span>
						</StyledLink>
					</StyledMenuListItem>
				</StyledMenuList>
			</StyledMenuInnerWrapper>
		</StyledMenuOuterWrapper>
	);
}

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

interface StyledLinkProps {
	isActive?: boolean;
	soon?: boolean;
}

const StyledLink = styled(Link)<StyledLinkProps>`
	&{
		align-items: center;
		display: flex;
		font-family: ${theme.font.spaceMace};
		justify-content: flex-start;
		margin-bottom: 1.6em;
		margin-top: 1.6em;
		text-decoration: none;
	}

	span {
		display: none;
		flex: 1 0 auto;
		font-size: 1.25rem;
		margin-left: 1em;
		padding-right: 1.9em;
		position: relative;
	}
`

const StyledMenuListItem = styled.li<StyledLinkProps>`
	width: 100%;

	${StyledLink} {
		color: ${props => props.isActive ? theme.color.layoutPrimary : theme.color.layoutOverlay};
		pointer-events: ${props => props.soon && "none"};

		img {
			opacity: ${props => props.isActive ? 1 : 0.6};
		}

		span {
			${({soon}) => soon && `
				&::after {
					background-image: linear-gradient(to bottom, #aa6cd6 -100%, #713aac);
					border-radius: 8px;
					padding: 3px 5px;
					color: ${theme.color.white};
					content: "soon";
					font-family: "Inter";
					font-size: .7rem;
					opacity: 2;
					position: absolute;
					right: 1em;
					top: -1.5em;
				}
			`}
		}
	}
`

const StyledLogoLink = styled(StyledLink)<StyledLinkProps>`
	height: 107px;
	margin-left: ${(theme.sideBar.width - 80) / 2}px;
	margin-right: ${(theme.sideBar.width - 80) / 2}px;

	img {
		width: 80px;
	}
`

const StyledLinkIcon = styled.img`
	width: ${theme.sideBar.width / 4}px;
	height: ${theme.sideBar.width / 4}px;
	object-fit: contain;
`

const StyledMenuOuterWrapper = styled.div`
	&{
		max-width: ${theme.sideBar.width}px;
		background-color: ${theme.color.typographyAllTextOnDark};
		height: 100%;
		left: 0;
		position: fixed;
		top: 0;
		z-index: 1000;

		@media (min-height: 645px) {
			height: 100vh;
		}
	}

	&:hover {
		max-width: unset;
		box-shadow: 0 4px 15px 10px ${theme.color.colorsLayoutShadows};

		${StyledLogoLink} img { width: 200px; }

		span { display: block; }
	}
`

export default Navigation;
