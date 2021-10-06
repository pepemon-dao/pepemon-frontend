// @ts-ignore
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Spacer, StyledTitle, StyledText } from "../../components";
import { theme } from "../../theme";
import dropdownarrow from "../../assets/dropdownarrow.png";
import pepemandercard from "../../assets/pepemandercard.png";
import pokeball from "../../assets/pokeball-temp.png";
import subscribetoclaim from "../../assets/subscribetoclaim.png";
import unsubscribe from "../../assets/unsubscribe.png";
import uparrow from "../../assets/uparrow.png";
import "./dropdown.css";

type AccordionProps = {
	heading: string;
};

const Accordion: React.FC<AccordionProps> = ({ heading }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<AccordionWrapper isOpen={isOpen}>
			<AccordionHeader onClick={toggle} isOpen={isOpen}>
				<AccordionHeaderTitle>
					<img src={pokeball} alt="Pokeball" style={{ width: "40px", height: "40px", marginRight: "1em" }}/>
					<StyledTitle as="h2" color={isOpen ? theme.color.green : theme.color.white} font={theme.font.neometric}>{heading}</StyledTitle>
				</AccordionHeaderTitle>
				<AccordionHeaderButton onClick={toggle}>
						<span>Show {isOpen ? "less" : "more"}</span>
						<img src={isOpen ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
				</AccordionHeaderButton>
			</AccordionHeader>
			{isOpen &&
				<AccordionBody>
					<AccordionBodyContent side="left">
						<StyledText as="p" size=".875rem">
							Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP, stake these LP tokens and recieve a unique NFT every month. Your LP tokens will be locked for a minimum 32 days.
						</StyledText>
						<Spacer size="md"/>
						<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
							<StyledText as="p">PPBLZ-ETH LP balance</StyledText>
							<StyledText as="p" font={theme.font.inter} txtDecoration="underline" color={theme.color.purple[600]}>Buy PPBLZ-ETH LP</StyledText>
						</div>
						<StyledText as="p" size="2.5rem" weight={900} font={theme.font.neometric}>4.00</StyledText>
						<Spacer size="md"/>
						<StyledText as="p">PPBLZ-ETH LP staked</StyledText>
						<StyledText as="p" size="2.5rem" weight={900} font={theme.font.neometric}>0.00</StyledText>
						<Spacer size="md"/>
						<StyledText as="p" size=".875rem">
							3.828 PPBLZ-ETH LP needed to subscribe
						</StyledText>
						{/* <img src={subscribeandstake} style={{ width: "58%", marginTop: "10px" }} />    */}
						{/* <img src={approvelp} style={{ width: "58%", marginTop: "10px" }} /> */}
						<Spacer size="md"/>
						<StyledText as="p" size="2.5rem" color={theme.color.purple[600]} weight={900} font={theme.font.neometric}>
							You have an active <wbr/>subscription!
						</StyledText>
						<Spacer size="md"/>
						<Button bg={theme.color.white} color={theme.color.purple[600]}>Unsubscribe</Button>
					</AccordionBodyContent>

					<AccordionBodyContent side="right">
						<div>
							<StyledText as="p" size=".75rem" color={theme.color.gray[400]} txtTransform="uppercase">This months card:</StyledText>
							<Spacer size="md"/>
							<StyledText as="p" size="1.375rem" color={theme.color.headers} weight={900} font={theme.font.neometric}>Yugipepe</StyledText>
							<Spacer size="sm"/>
							<StyledText as="p" size=".875rem" color={theme.color.headers}>
								Super cool discription about this card. Iuis aute irure dolor in reprehenderit in.
							</StyledText>
							<div
							style={{
								display: "flex",
								width: "253px",
								height: "356px",
								objectFit: "cover",
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
								backgroundImage: `url(${pepemandercard})`,
								marginTop: "14px",
							}}
							></div>
							<Spacer size="md"/>
							<Button disabled bg={theme.color.purple[400]} color={theme.color.purple[500]} width="100%" borderless>Subscribe to claim</Button>
						</div>
					</AccordionBodyContent>
				</AccordionBody>
			}
		</AccordionWrapper>
	);
};

export const AccordionGroup = styled.section`
	display: flex;
	flex-direction: column;
`

const AccordionWrapper = styled.div<{isOpen: boolean}>`
	background-color: ${props => props.theme.color.purple[800]};
	border-radius: ${props => props.theme.borderRadius}px;
	margin-bottom: .5em;
	outline: ${props => props.isOpen && `2px solid ${props.theme.color.green}` };
	width: 100%;
`

const AccordionHeader = styled.div<{isOpen: boolean}>`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	padding: 1.25em 2em;
`

const AccordionHeaderTitle = styled.div`
	display: flex;
	align-items: center;
`

const AccordionHeaderButton = styled.button`
	align-items: center;
	background-color: ${props => props.theme.color.transparent};
	border: none;
	color: ${props => props.theme.color.white};
	cursor: pointer;
	display: flex;
	font-family: ${props => props.theme.font.neometric};
	font-size: 0.75rem;

	img {
		margin-left: .7em;
	}
`

const AccordionBody = styled.div`
	background-color: ${props => props.theme.color.white};
	border-bottom-left-radius: ${props => props.theme.borderRadius}px;
	border-bottom-right-radius: ${props => props.theme.borderRadius}px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1.5em 5.3em 2em 2em;
`

const AccordionBodyContent = styled.div<{side: "left" | "right"}>`
	border-left: ${props => props.side === "right" && `2px solid ${props.theme.color.colorsLayoutBorders}`};
	padding-left: ${props => props.side === "right" && "5.5em"};
	padding-right: ${props => props.side === "left" && "5.5em"};
`

const Rectangle = styled.div`
	border: 2px solid #f0f0f0;
	height: 495px;
	margin: 24px 82px 0 69px;
	width: 2px;
`

export default Accordion;
