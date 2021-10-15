import styled from 'styled-components';
import { theme } from '../../theme';

interface TitleProps {
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	align?: string;
	font?: string;
	isInactive?: boolean;
	lineHeight?: number;
	size?: number;
	weight?: number | string;
}

const Title = styled.div<TitleProps>`
	&{
		color: ${props => props.color ? props.color : props.theme.color.black};
		font-family: ${props => props.font ? props.font : props.theme.font.spaceMace};
		font-size: ${props => props.size && props.size}rem;
		font-weight: ${props => props.weight ? props.weight : 500};
		hyphens: none;
		line-height: ${props => props.lineHeight && props.lineHeight};
		margin: 0;
		text-align: ${props => props.align && props.align};
	}
`

export const StyledPageTitle = styled(Title)`
	font-size: 2.5rem;
	margin-bottom: .5em;
`

export const StyledLinkTitle = styled.h2<{isInactive?: boolean}>`
	font-size: 1.2rem;
	font-family: ${theme.font.neometric};
	font-weight: 500;
	margin-bottom: 0;
	margin-top: 0;

	&:not(:last-child) {
		margin-right: 1em;
	}

	a {
		color: ${theme.color.white};
		text-decoration: none;
	}

	${({ isInactive }) => isInactive !== true ? (`
		&{
			font-weight: 900;
		}

		a {
			position: relative;
		}

		a:before {
			content: "";
			background-color: currentColor;
			display: inline-block;
			position: absolute;
			height: 2px;
			width: 100%;
			bottom: -.1em;
			left: 0;
		}`): (`
		opacity: .7;
	`)}
`

export default Title;
