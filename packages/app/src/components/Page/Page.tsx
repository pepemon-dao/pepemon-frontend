import React, { useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { Footer, Navigation, NotSupportedModal } from "../../components";
import { PepemonProviderContext } from "../../contexts";
import { darktealTiles } from "../../assets";
import { theme } from "../../theme";
// import Footer from '../Footer';

const Page: React.FC<any> = ({children}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;

	const { pathname } = useLocation();

	const isSupportedChain = (chainId: number) => {
		if (pathname.startsWith("/store")) {
			return (chainId === 1 || chainId === 4 || chainId === 56);
		}
		return (chainId === 1 || chainId === 4);
	}

	const isOnSupportedChain = () => {
		return isSupportedChain(chainId);
	}

	// go to top
	window.scrollTo(0,0);

	return (
		<div style={{ position: 'relative' }}>
			<StyledPageWrapper>
				<Navigation/>
				{ (!isOnSupportedChain() && chainId) ? <NotSupportedModal page="Home"/>
				: children
				}
			</StyledPageWrapper>
			<Footer/>
		</div>
	)
}

export const StyledPageWrapper = styled.div`
	display: flex;
`

export const StyledPageWrapperMain = styled.main`
	background-attachment: fixed;
	background-image: url(${darktealTiles});
	background-repeat: no-repeat;
	background-size: cover;
	margin-left: ${theme.sideBar.width}px;
	padding-bottom: 7.5em;
	padding-left: 2em;
	padding-right: 2em;
	min-height: 100vh;
	width: calc(100vw - ${theme.sideBar.width}px);
	padding-bottom: ${2 * theme.footer.height}px;
`

export const StyledPageWrapperMainInner = styled.div`
	max-width: ${theme.breakpoints.ultra}px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 10em;
`

export default Page
