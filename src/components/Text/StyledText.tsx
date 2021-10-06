import styled from 'styled-components'

interface StyledTextProps {
	as: 'p' | 'span' | 'b' | 'strong';
	color?: string;
	weight?: number;
	size?: string;
	font?: string;
	inactive?: boolean;
	txtTransform?: string;
}

const StyledText = styled.div<StyledTextProps>`
	&{
		color: ${props => props.color ? props.color : props.theme.color.black};
		font-family: ${props => props.font && props.font};
		font-size: ${props => props.size && props.size};
		font-weight: ${props => props.weight && props.weight};
		text-transform: ${props => props.txtTransform && props.txtTransform};
		opacity: ${props => ! props.inactive ? 1 : .7};
		margin-top: 0;
		margin-bottom: 0;
	}
`

export default StyledText;
