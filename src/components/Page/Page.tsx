import React from 'react'
import styled from 'styled-components'
import { Navigation } from "../../components";
import { darktealTiles } from "../../assets";
// import Footer from '../Footer'

interface PageProps {
    custom?: boolean
}

// const Page: React.FC<PageProps> = (props) => {
// 	const { children } = props;
// 	return <>
// 		{ children }
// 	</>
// }

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
	box-shadow: inset 0 0 0 2000px ${props => props.theme.color.buttonSecondaryDisabled};
	margin-left: ${120}px;
	padding-left: 2em;
	padding-right: 2em;
	min-height: 100vh;
	width: calc(100vw - ${120}px);
`

export const StyledPageWrapperMainInner = styled.div`
	max-width: 940px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 10em;
`

export default Page
