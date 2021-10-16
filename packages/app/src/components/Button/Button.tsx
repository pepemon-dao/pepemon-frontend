import styled from "styled-components";
import { theme } from "../../theme";
import { Link } from "react-router-dom";

interface ButtonProps {
	disabled?: boolean;
	styling?: "purple" | "green" | "white" | "link" | "white_borderless";
	symbol?: boolean;
	width?: string;
	onClick?: any;
}

// TODO: any => ButtonProps
const Button = styled.button<any>`
	&{
		border-width: 1px;
		border-style: solid;
		border-radius: 8px;
		box-shadow: ${props => (!props.disabled && props.styling !== "link") && `0 4px 10px 0 ${theme.color.colorsLayoutShadows}`};
		cursor: ${props => !props.disabled && "pointer"};
		font-family: ${props => props.styling === "link" ? theme.font.inter : theme.font.spaceMace};
		font-size: ${props => props.symbol ? "2" : "1"}rem;
		font-weight: ${props => props.styling !== "link" && "bold"};
		text-align: center;
		text-transform: ${props => props.styling !== "link" && "uppercase"};
		opacity: ${props => props.disabled && .5};
		padding: ${props => props.symbol ? ".22em" : ".75em"} 1.5em;
		transition: all .4s;
		width: ${props => props.width && props.width};
	}

	&:focus-visible {
		outline: none;
		box-shadow: ${props => (!props.disabled && props.styling !== "link") && `0px 0px 10px 5px ${theme.color.purple[600]}`};
		filter: ${props => (!props.disabled && props.styling === "link") && `drop-shadow(2px 2px 3px ${theme.color.purple[600]})`};
	}

	${({disabled}) => disabled && `
		pointer-events: none;
	`}

	${({styling}) => styling === "purple" && `
		background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
		border-color: transparent;
		color: ${theme.color.white};

		&:hover {
			background-image: unset;
			border-color: ${theme.color.purple[600]};
			color: ${theme.color.purple[600]};
		}
	`}

	${({styling}) => styling === "white" && `
		background-image: linear-gradient(${theme.color.white}, ${theme.color.white});
		border-color: ${theme.color.purple[600]};
		color: ${theme.color.purple[600]};

		&:hover {
			background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
			border-color: transparent;
			color: ${theme.color.white};
		}
	`}

	${({styling}) => styling === "white_borderless" && `
		background-color: ${theme.color.white};
		border-color: transparent;
		color: ${theme.color.purple[600]};
	`}

	${({styling}) => styling === "green" && `
		background-image: linear-gradient(to bottom, ${theme.color.green[100]}, ${theme.color.green[200]});
		border-color: transparent;
		color: ${theme.color.purple[800]};

		&:hover {
			background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
			color: ${theme.color.white};
		}
	`}

	${({styling}) => styling === "link" && `
		background-color: transparent;
		border-color: transparent;
		color: ${theme.color.purple[600]};
		text-decoration: underline;

		&:hover {
			color: ${theme.color.purple[700]};
		}
	`}
`;

interface ButtonLinkProps {
	light?: boolean;
}

export const ButtonLink = styled(Link)<ButtonLinkProps>`
	background-color: ${props => props.light && props.theme.color.white};
	background-image: ${props => !props.light && `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})`};
	border-radius: 8px;
	border: ${props => props.light && `1px solid ${props.theme.color.purple[600]}`};
	box-shadow: ${props => !props.light && `0 4px 10px 0 ${theme.color.colorsLayoutShadows}`};
	color: ${props => props.light ? props.theme.color.purple[600] : props.theme.color.white};
	font-family: ${props => props.theme.font.spaceMace};
	padding: .75em 1.5em;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: .2s all ease-in;

	&:hover {
		background-image: ${props => props.light ? `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})` : "unset"};
		background-color: ${props => !props.light && props.theme.color.white};
		border: ${props => !props.light && `1px solid ${props.theme.color.purple[600]}`};
		color: ${props => props.light ? props.theme.color.white : props.theme.color.purple[600]};
		box-shadow: 0 4px 10px 0 ${theme.color.colorsLayoutShadows};
	}

	&:focus-visible {
		filter: drop-shadow(2px 2px 3px ${theme.color.purple[600]});
		outline: none;
	}
`

export default Button;
