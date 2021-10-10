import styled from "styled-components";
import { theme } from "../../theme";

const ExternalLink = styled.a.attrs({
	target: "_blank",
	rel: "noopener noreferrer",
})<{size?: number}>`
	color: ${theme.color.purple[600]};
	cursor: pointer;
	font-size: ${props => props.size && props.size}rem;
	text-decoration: underline;

	&:hover {
		color: ${theme.color.purple[700]};
	}
`;

export default ExternalLink;
