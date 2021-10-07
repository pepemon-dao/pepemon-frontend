import styled from 'styled-components'

interface StyledTextProps {
	as: 'p' | 'span' | 'b' | 'strong';
	align?: string;
	color?: string;
	weight?: number | string;
	size?: string;
	font?: string;
	lineHeight?: string;
	inactive?: boolean;
	txtTransform?: string;
	txtDecoration?: string;
}

const StyledText = styled.div<StyledTextProps>`
	&{
		line-height: ${props => props.lineHeight && props.lineHeight};
		color: ${props => props.color ? props.color : props.theme.color.headers};
		font-family: ${props => props.font && props.font};
		font-size: ${props => props.size && props.size};
		font-weight: ${props => props.weight && props.weight};
		text-align: ${props => props.align && props.align};
		text-decoration: ${props => props.txtDecoration && props.txtDecoration};
		text-transform: ${props => props.txtTransform && props.txtTransform};
		opacity: ${props => ! props.inactive ? 1 : .7};
		margin-top: 0;
		margin-bottom: 0;
	}
`

export default StyledText;
