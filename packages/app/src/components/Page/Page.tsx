import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Footer, Navigation, NotSupportedModal } from '../../components';
import { PepemonProviderContext } from '../../contexts';
import { darktealTiles } from '../../assets';
import { theme } from '../../theme';
import { isSupportedChain } from '../../utils';

const Page: React.FC<any> = ({children}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;

	const { pathname } = useLocation();

	// go to top
	window.scrollTo(0,0);

	return (
		<StyledPageWrapper>
			<StyledPageInner>
				<Navigation/>
				{ (!isSupportedChain(chainId, pathname) && chainId) ? <NotSupportedModal page='Home'/>
				: children
				}
			</StyledPageInner>
			<Footer/>
		</StyledPageWrapper>
	)
}

export const StyledPageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	position: relative;
`

export const StyledPageInner = styled.div`
	display: flex;
`

export const StyledPageWrapperMain = styled.main`
	background-attachment: fixed;
	background-image: url(${darktealTiles});
	background-repeat: no-repeat;
	background-size: cover;
	padding-left: clamp(1em, 2.65vw, 2em);
	padding-right: clamp(1em, 2.65vw, 2em);
	min-height: 100vh;
	padding-bottom: ${theme.footer.spaceTop}px;
	width: 100vw;
	position: relative;

	@supports ( -webkit-touch-callout : none) {
		background-attachment: scroll;
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		margin-left: ${theme.sideBar.width.closed}px;
		width: calc(100vw - ${theme.sideBar.width.closed}px);
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: linear-gradient(to bottom, rgba(255, 255, 255, .5) 0%, rgba(255, 255, 255, 0) 100%);
		z-index: 0;
	}
`

export const StyledPageWrapperMainInner = styled.div`
	max-width: ${theme.breakpoints.ultra};
	margin-left: auto;
	margin-right: auto;
	padding-top: 6em;
	z-index: 1;
	position: relative;

	@media (min-width: ${theme.breakpoints.desktop}) {
		padding-top: 10em;
	}
`

export default Page
