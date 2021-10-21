import React, { useState } from 'react'
import { AccordionWrapper, AccordionHeader, AccordionHeaderTitle, AccordionHeaderButton, AccordionBody, Spacer, Title, Text, ContentColumns, ContentColumn } from '../../../../components';
import { theme } from '../../../../theme';
import { pokeball, uparrow, dropdownarrow, anniv_pepemander } from '../../../../assets';
import { CardToClaim } from './CardToClaim';

const PepemonOneAnniversarySet: React.FC<any> = () => {
	const [openAccordion, setOpenAccordion] = useState(true);
	const toggleAccordion = () => {
		console.log(openAccordion);
		setOpenAccordion(!openAccordion)
	}

	return (
		<AccordionWrapper isOpen={openAccordion}>
			<AccordionHeader onClick={toggleAccordion} isOpen={openAccordion}>
				<AccordionHeaderTitle>
					<img loading="lazy" src={pokeball} alt="Pokeball" style={{ width: "40px", height: "40px", marginRight: "1em" }}/>
					<Title as="h2" color={openAccordion ? theme.color.green[200] : theme.color.white} weight={900} font={theme.font.neometric}>Pepemon One 1st Anniversary set</Title>
				</AccordionHeaderTitle>
				<AccordionHeaderButton onClick={toggleAccordion}>
						<span>Show {openAccordion ? "less" : "more"}</span>
						<img loading="lazy" src={openAccordion ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
				</AccordionHeaderButton>
			</AccordionHeader>
			{openAccordion &&
				<AccordionBody>
					<div>
						<ContentColumns>
							<ContentColumn width="50%">
								<Title as="h3" size={2.5} weight={900} font={theme.font.neometric}>
								1st Anniversary set
								</Title>
								<Spacer size="sm"/>
								<Text as="p" size={.875} lineHeight={1.125}>
								Celebrating a full year of Pepemon with an awesome birthday set. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</Text>
							</ContentColumn>
						</ContentColumns>
						<Spacer size="lg"/>
						<ContentColumns>
							<ContentColumn width="25%" space="3.5em">
								<CardToClaim
									title="Pepertle"
									text="Providing ppblz liquidity to recieve this card"
									img={{url: anniv_pepemander, title: 'pepemander anniversary'}}
									tokenId={75}/>
							</ContentColumn>
							<ContentColumn width="25%" space="3.5em">
								<CardToClaim
									title="Pepemander"
									text="Donate 1 card to recieve this card"
									img={{url: anniv_pepemander, title: 'pepemander anniversary'}}
									tokenId={76}/>
							</ContentColumn>
							<ContentColumn width="25%" space="3.5em">
								<CardToClaim
									title="Pepesaur"
									text="Providing ppblz liquidity to recieve this card"
									img={{url: anniv_pepemander, title: 'pepemander anniversary'}}
									tokenId={77}/>
							</ContentColumn>
							<ContentColumn width="25%" space="3.5em">
								<CardToClaim
									title="Pepechu"
									text="Providing ppblz liquidity to recieve this card"
									img={{url: anniv_pepemander, title: 'pepemander anniversary'}}
									tokenId={78}/>
							</ContentColumn>
						</ContentColumns>
					</div>
				</AccordionBody>
			}
		</AccordionWrapper>
	)
}

export default PepemonOneAnniversarySet;
