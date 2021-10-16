// @ts-ignore
import React, { useState } from "react";
import styled from "styled-components";
import { Button, ContentColumns, ContentColumn, Spacer, Title, Text } from "../../components";
import { theme } from "../../theme";
import { dropdownarrow, pokeball, uparrow, yugipepe } from "../../assets";

type AccordionProps = {
	heading: string;
	state?: "active" | "approve" | "can_stake";
};

const Accordion: React.FC<AccordionProps> = ({ heading, state }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<AccordionWrapper isOpen={isOpen}>
			<AccordionHeader onClick={toggle} isOpen={isOpen}>
				<AccordionHeaderTitle>
					<img loading="lazy" src={pokeball} alt="Pokeball" style={{ width: "40px", height: "40px", marginRight: "1em" }}/>
					<Title as="h2" color={isOpen ? theme.color.green[200] : theme.color.white} weight={900} font={theme.font.neometric}>{heading}</Title>
				</AccordionHeaderTitle>
				<AccordionHeaderButton onClick={toggle}>
						<span>Show {isOpen ? "less" : "more"}</span>
						<img loading="lazy" src={isOpen ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
				</AccordionHeaderButton>
			</AccordionHeader>
			{isOpen &&
				<AccordionBody>
					<AccordionBodyContent side="left">
						<Text as="p" size={.875} lineHeight={1.125}>
							Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP, stake these LP tokens and recieve a unique NFT every month. Your LP tokens will be locked for a minimum 32 days.
						</Text>
						<Spacer size="md"/>
						<ContentColumns>
							<ContentColumn width="50%">
								<Spacer size="md"/>
								<Text as="p" lineHeight={1}>PPBLZ-ETH LP balance</Text>
								<Spacer size="sm"/>
								<Text as="p" size={2.5} weight={900} lineHeight={1} font={theme.font.neometric}>4.00</Text>
								<Spacer size="md"/>
								<Text as="p" lineHeight={1}>PPBLZ-ETH LP staked</Text>
								<Spacer size="sm"/>
								<Text as="p" size={2.5} weight={900} lineHeight={1} font={theme.font.neometric}>0.00</Text>
							</ContentColumn>
							<ContentColumn width="50%">
								<Spacer size="sm"/>
								<Button styling="link">Buy PPBLZ-ETH LP</Button>
							</ContentColumn>
						</ContentColumns>
						<Spacer size="md"/>
						{ state === "active" ?
							<>
								<Text as="p" size={2.5} lineHeight={1.1} color={theme.color.purple[600]} weight={900} font={theme.font.neometric}>
									You have an active <wbr/>subscription!
								</Text>
								<Spacer size="md"/>
								<Button styling="white">Unsubscribe</Button>
							</>
						:
							<div style={{ display: "inline-flex", flexDirection: "column" }}>
								<Text as="p" size={.875}>
									3.828 PPBLZ-ETH LP needed to subscribe
								</Text>
								<Spacer size="sm"/>
								<Button styling="purple" width="100%">{ state === "approve" ? "Approve LP" : "Subscribe and stake LP" }</Button>
							</div>
						}

						<Spacer size="md"/>
					</AccordionBodyContent>

					<AccordionBodyContent side="right">
						<div>
							<Text as="p" size={.75} color={theme.color.gray[400]} txtTransform="uppercase">This months card:</Text>
							<Spacer size="md"/>
							<Text as="p" size={1.375} color={theme.color.headers} weight={900} font={theme.font.neometric}>Yugipepe</Text>
							<Spacer size="sm"/>
							<Text as="p" size={.875} color={theme.color.headers}>
								Super cool discription about this card. Iuis aute irure dolor in reprehenderit in.
							</Text>
							<Spacer size="sm"/>
							<img src={yugipepe} alt="'yugipepe'"/>
							<Spacer size="md"/>
							<Button disabled styling="white_borderless" width="100%">Subscribe to claim</Button>
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
	outline: ${props => props.isOpen && `2px solid ${props.theme.color.green[200]}` };
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
	border-radius: 8px;
	color: ${props => props.theme.color.white};
	cursor: pointer;
	display: flex;
	font-family: ${props => props.theme.font.neometric};
	font-size: 0.75rem;

	img {
		margin-left: .7em;
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0px 0px 10px 5px ${theme.color.purple[600]};
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

export default Accordion;
