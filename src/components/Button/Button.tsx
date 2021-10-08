import styled from "styled-components";

interface ButtonProps {
	bg?: string;
	borderless?: boolean;
	color?: string;
	disabled?: boolean;
	font?: string;
	hidden?: boolean;
	width?: string;
}

const Button = styled.button<ButtonProps>`
	&{
		background-color: ${props => props.bg ? props.bg : props.theme.color.purple[600]};
		border-color: ${props => props.color ? props.color : props.theme.color.white};
		border-width: ${props => props.borderless && "0px"};
		border-style: solid;
		border-radius: 8px;
		color: ${props => props.color ? props.color : props.theme.color.white};
		cursor: ${props => !props.disabled && "pointer"};
		font-family: ${props => props.font ? props.font : props.theme.font.spaceMace};
		font-size: 1rem;
		font-weight: bold;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		padding: 12px 24px;
		width: ${props => props.width && props.width};
		transition: all .2s;
	}

	${(props) => !props.disabled && `
		&:hover {
			background-color: ${(props: any) => props.color ? props.color : props.theme.color.white};
			border: 1px solid ${(props: any) => props.bg ? props.bg : props.theme.color.purple[600]};
			color: ${(props: any) => props.bg ? props.bg : props.theme.color.purple[600]};
		}
	`}

	${props => props.hidden && "hidden"} :focus {
		outline: none;
	}
`;

export default Button;
