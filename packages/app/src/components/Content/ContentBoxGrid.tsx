import styled from "styled-components/macro";

interface ContentBoxGridProps {
	gridTemplate: string;
}

const ContentBoxGrid = styled.div<ContentBoxGridProps>`
	display: grid;
	grid-auto-columns: 1fr;
	grid-gap: 1.25em;
	grid-template: ${props => props.gridTemplate};
`

export default ContentBoxGrid;
