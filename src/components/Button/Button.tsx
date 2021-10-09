import styled from "styled-components";
import { theme } from "../../theme";

interface ButtonProps {
	styling?: "purple" | "green" | "white" | "link" | "white_borderless";
	disabled?: boolean;
	width?: string;
}

const Button = styled.button<ButtonProps>`
	&{
		border-width: 1px;
		border-style: solid;
		border-radius: 8px;
		box-shadow: ${props => (!props.disabled && props.styling !== "link") && "0 4px 10px 0 rgba(121, 121, 121, 0.5)"};
		cursor: ${props => !props.disabled && "pointer"};
		font-family: ${props => props.styling === "link" ? theme.font.inter : theme.font.spaceMace};
		font-size: 1rem;
		font-weight: ${props => props.styling !== "link" && "bold"};
		text-align: center;
		text-transform: ${props => props.styling !== "link" && "uppercase"};
		opacity: ${props => props.disabled && .5};
		padding: .75em 1.5em;
		transition: all .4s;
		width: ${props => props.width && props.width};
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

export default Button;
