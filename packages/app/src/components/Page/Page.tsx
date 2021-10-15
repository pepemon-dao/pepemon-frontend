import React from 'react'
import styled from 'styled-components'
import { Navigation } from "../../components";
import { darktealTiles } from "../../assets";
import { theme } from "../../theme";
// import Footer from '../Footer';

const Page: React.FC<any> = ({children}) => {
	return (
		<StyledPageWrapper>
			<Navigation/>
			{children}
		</StyledPageWrapper>
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
`

export const StyledPageWrapperMainInner = styled.div`
	max-width: ${theme.breakpoints.ultra}px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 10em;
`

export default Page
