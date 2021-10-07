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
		padding: .75em 1.5em;
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

export const StyledButton = styled.button<{light?: boolean, width?: string}>`
	background-color: ${props => props.light && props.theme.color.white};
	background-image: ${props => !props.light && `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})`};
	border-radius: 8px;
	border: ${props => `1px solid ${props.light ? props.theme.color.purple[600] : "transparent"}`};
	box-shadow: ${props => !props.light && "0 4px 10px 0 rgba(121, 121, 121, 0.5)"};
	color: ${props => props.light ? props.theme.color.purple[600] : props.theme.color.white};
	font-family: ${props => props.theme.font.spaceMace};
	padding: 12px 24px;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: .2s all ease-in;
	width: ${props => props.width && props.width};

	&:hover {
		background-image: ${props => props.light ? `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})` : "unset"};
		background-color: ${props => !props.light && props.theme.color.white};
		border: ${props => !props.light && `1px solid ${props.theme.color.purple[600]}`};
		color: ${props => props.light ? props.theme.color.white : props.theme.color.purple[600]};
		box-shadow: 0 4px 10px 0 rgba(121, 121, 121, 0.5);
	}
`

export default Button;
