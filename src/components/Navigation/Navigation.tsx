import { Link } from "react-router-dom";
import styled from "styled-components";
import { pepemon, homeactive } from "../../assets";
import { useLocation } from "react-router-dom"; // version 5.2.0

const Navigation = () => {
	const { pathname } = useLocation();

	return (
		<StyledMenuOuterWrapper>
			<StyledMenuInnerWrapper>
				<StyledLogoLink to="/" active>
					<img loading="lazy" src={pepemon} className="pepemon-icon" alt="logo" />
					<span>Pepemon</span>
				</StyledLogoLink>

				<StyledMenuList>
					<StyledMenuListItem>
						<StyledLink active={ pathname === "/" ? true : false } to="/">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Home</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink active={ pathname.startsWith("/staking") ? true : false } to="/staking">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Staking</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink active={ pathname.startsWith("/subscription") ? true : false } to="/subscription">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Subscription</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink active={ pathname.startsWith("/store") ? true : false } to="/store">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>Store</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink active={ pathname === "/" ? true : false } to="/">
							<StyledLinkIcon loading="lazy" src={ homeactive } alt="logo" />
							<span>My Collection</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem>
						<StyledLink active={ pathname === "/" ? true : false } to="/">
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
		max-width: ${props => props.theme.sideBar.width}px;
		background-color: ${props => props.theme.color.typographyAllTextOnDark};
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
	}

	&:hover {
		max-width: unset;
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
	padding-left: 0;
	list-style-type: none;
`

const StyledMenuListItem = styled.li`
	width: 100%;
`

const StyledLink = styled<any>(Link)`
	&{
		align-items: center;
		color: ${props => props.theme.color.layoutPrimary};
		display: flex;
		font-family: ${props => props.theme.font.spaceMace};
		justify-content: flex-start;
		margin-bottom: 1.6em;
		margin-top: 1.6em;
		opacity: ${props => props.active ? 1 : 0.4};
		text-decoration: none;
	}

	span {
		display: none;
		flex: 1 0 auto;
		font-size: 1.25rem;
		margin-left: 1em;
		padding-right: 1.9em;
	}
`

const StyledLogoLink = styled<any>(StyledLink)`
	img {
		width: 80px;
		margin-left: ${20}px;
		margin-right: ${20}px;
	}

	span {
		font-size: 1.6rem;
		font-weight: bold;
		margin-left: ${-20}px;
	}
`

const StyledLinkIcon = styled.img`
	height: auto;
	height: ${props => props.theme.sideBar.width / 4}px;
	width: ${props => props.theme.sideBar.width / 4}px;
	margin-left: auto;
	margin-right: auto;
	object-fit: contain;
`

export default Navigation;
