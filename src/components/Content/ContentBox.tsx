import styled from "styled-components";

const ContentBox = styled.div<{bgColor?: string}>`
	background-color: ${props => props.bgColor ? props.bgColor : props.theme.color.white};
	border-radius: 8px;
	padding: 1em 1.25em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
`

export const ContentBoxNumber = styled.h3`
	color: ${props => props.theme.color.white};
	left: 50%;
	margin-bottom: -1em;
	margin-top: 0;
	position: relative;
	text-align: center;
	top: 0;
	transform: translateX(-50%) translateY(-80%);

	span {
		background-color: ${props => props.theme.color.headers};
		display: inline-block;
		border-radius: 8px;
		padding: 0.6em 1em;
	}
`

export default ContentBox;
