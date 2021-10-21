import styled from "styled-components";
import { theme } from "../../theme";

export const AccordionGroup = styled.section`
	display: flex;
	flex-direction: column;
`

export const AccordionWrapper = styled.div<{isOpen: boolean}>`
	background-color: ${theme.color.purple[800]};
	border-radius: ${theme.borderRadius}px;
	margin-bottom: .5em;
	outline: ${props => props.isOpen && `2px solid ${props.theme.color.green[200]}` };
	width: 100%;
`

export const AccordionHeader = styled.div<{isOpen: boolean}>`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	padding: 1.25em 2em;
`

export const AccordionHeaderTitle = styled.div`
	display: flex;
	align-items: center;
`

export const AccordionHeaderButton = styled.button`
	align-items: center;
	background-color: ${theme.color.transparent};
	border: none;
	border-radius: 8px;
	color: ${theme.color.white};
	cursor: pointer;
	display: flex;
	font-family: ${theme.font.neometric};
	font-size: 0.75rem;

	img {
		margin-left: .7em;
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0px 0px 10px 5px ${theme.color.purple[600]};
	}
`

export const AccordionBody = styled.div`
	background-color: ${theme.color.white};
	border-bottom-left-radius: ${theme.borderRadius}px;
	border-bottom-right-radius: ${theme.borderRadius}px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1.5em 2em 2em;
`

export const AccordionBodyContent = styled.div<{side: "left" | "right"}>`
	border-left: ${props => props.side === "right" && `2px solid ${theme.color.colorsLayoutBorders}`};
	padding-left: ${props => props.side === "right" && "5.5em"};
	padding-right: ${props => props.side === "left" ? "5.5em" : "2.5em"};;
`
