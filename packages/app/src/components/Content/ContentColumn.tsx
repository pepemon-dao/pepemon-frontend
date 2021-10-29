import styled from "styled-components/macro";

interface ContentColumnProps {
	width?: string;
	space?: string
}

const ContentColumn = styled.div<ContentColumnProps>`
	width: ${ props => props.width && props.width };

	&:not(:first-child) {
		margin-left: ${props => props.space && props.space};
	}
`

export default ContentColumn;
