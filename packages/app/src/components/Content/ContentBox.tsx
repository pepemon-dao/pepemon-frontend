import styled from "styled-components";
import { theme } from '../../theme';

const ContentBox = styled.div<{bgColor?: string, shadow?: boolean}>`
	background-color: ${props => props.bgColor ? props.bgColor : props.theme.color.white};
	border-radius: 8px;
	padding: 1em 1.25em;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	position: relative;

	${({shadow}) => shadow && `
		box-shadow: 0 4.5px 1px 0 rgba(0, 0, 0, 0.06), 0 10.3px 6.9px 0 ${theme.color.iconBackgroundGrey8}, 0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1), 0 33.2px 29.2px 0 rgba(0, 0, 0, 0.13), 0 71px 80px 0 rgba(0, 0, 0, 0.19);
	`}
`

export const ContentBoxNumber = styled.span`
	color: ${props => props.theme.color.white};
	font-size: 1.125rem;
	font-weight: 700;
	left: 50%;
	margin-bottom: auto;
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
