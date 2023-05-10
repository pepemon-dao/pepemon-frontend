import React, { useState } from 'react';
import styled from 'styled-components';
import { Title, Text } from '..';
import { theme } from '../../theme';
import {  uparrow, dropdownarrow } from '../../assets';

interface AccordionProps {
	title: string,
	isOpen?: boolean,
	isActive?: boolean,
	children: any,
	timeLeft?: string,
}

const Accordion: React.FC<AccordionProps> = ({title, isOpen = true, isActive = false, children, timeLeft=''}) => {
	const [openAccordion, setOpenAccordion] = useState(isOpen);
	const toggleAccordion = () => {
		setOpenAccordion(!openAccordion)
	}

	return (
		<AccordionWrapperV2 isActive={isActive} >
			<AccordionHeaderV2 onClick={toggleAccordion} isOpen={openAccordion}>
				<AccordionHeaderTitleV2>
					<Title as="h2" color={openAccordion ? theme.color.green[200] : theme.color.white} weight={900} font={theme.font.neometric}>{title}</Title>
				</AccordionHeaderTitleV2>
				<AccordionTextV2>{timeLeft}</AccordionTextV2>
				<AccordionHeaderButtonV2 onClick={toggleAccordion}>
						<span>Show {openAccordion ? "less" : "more"}</span>
						<img loading="lazy" src={openAccordion ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
				</AccordionHeaderButtonV2>
			</AccordionHeaderV2>
			<AccordionBodyV2 isOpen={openAccordion}>
				{children}
			</AccordionBodyV2>
		</AccordionWrapperV2>
	)
}

export const AccordionGroupV2 = styled.section`
	display: flex;
	flex-direction: column;
`

export const AccordionWrapperV2 = styled.div<{isActive: boolean}>`
	border: 2px solid ${props => props.isActive ? `${props.theme.color.green[200]}` : 'transparent'};;
	background-color: ${theme.color.purple[800]};
	border-radius: ${theme.borderRadius}px;
	margin-bottom: .8em;
	width: 100%;
`

export const AccordionHeaderV2 = styled.div<{isOpen: boolean}>`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	padding: clamp(1.125em,3.75vw,1.2em) clamp(.8em,2.65vw,2em);
`

export const AccordionHeaderTitleV2 = styled.div`
	display: flex;
	align-items: center;
	flex: 4 1 auto ;
`
export const AccordionTextV2 = styled.div`
	display: flex;
	align-items: center;
	color: ${theme.color.white};
	flex: 1 1 auto;
	`

export const AccordionHeaderButtonV2 = styled.button`
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

	span {
		display: none;

		@media (min-width: ${theme.breakpoints.tabletP}) {
			display: inline;
		}
	}
`

export const AccordionBodyV2 = styled.div<{isOpen: boolean}>`
	background-color: ${theme.color.white};
	border-bottom-left-radius: ${theme.borderRadius}px;
	border-bottom-right-radius: ${theme.borderRadius}px;
	display: ${props => props.isOpen ? 'flex' : 'none'};
	flex-direction: column;
	justify-content: space-between;
	padding: clamp(1.125em,3.75vw,1.2em) clamp(.8em,2.65vw,2em) 2em;

	@media (min-width: ${theme.breakpoints.tabletP}) {
		flex-direction: row;
	}
`

export const AccordionBodyContentV2 = styled.div<{side: "left" | "right"}>`
	@media (min-width: ${theme.breakpoints.tabletP}) {
		border-left: ${props => props.side === "right" && `2px solid ${theme.color.colorsLayoutBorders}`};
		padding-left: ${props => props.side === "right" && "5.5em"};
		padding-right: ${props => props.side === "left" ? "5.5em" : "2.5em"};
	}
`

export default Accordion;
