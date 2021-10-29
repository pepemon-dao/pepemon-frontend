import styled from "styled-components/macro";

interface ContentColumnsProps {
	justify?: string;
	maxWidth?: string;
}

const ContentColumns = styled.div<ContentColumnsProps>`
	display: flex;
	justify-content: ${ props => props.justify && props.justify};
	max-width: ${ props => props.maxWidth ? props.maxWidth : "1120px"};
	margin-left: auto;
	margin-right: auto;
`

export default ContentColumns;
