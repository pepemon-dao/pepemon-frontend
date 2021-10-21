import React from 'react'
import { Accordion, Spacer, Title, Text, ContentColumns, ContentColumn } from '../../../../components';
import { theme } from '../../../../theme';
import { pepechu1stanniversarycard, pepemander1stanniversarycard, pepertle1stanniversarycard, pepesaur1stanniversarycard } from '../../../../assets';
import { CardToClaim } from './CardToClaim';

const PepemonOneAnniversarySet: React.FC<any> = () => {
	return (
		<Accordion title='1st Anniversary set' isOpen={true}>
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
							img={{url: pepertle1stanniversarycard, title: 'Pepertle anniversary'}}
							tokenId={75}/>
					</ContentColumn>
					<ContentColumn width="25%" space="3.5em">
						<CardToClaim
							title="Pepemander"
							text="Donate 1 card to recieve this card"
							img={{url: pepemander1stanniversarycard, title: 'Pepemander anniversary'}}
							tokenId={76}/>
					</ContentColumn>
					<ContentColumn width="25%" space="3.5em">
						<CardToClaim
							title="Pepesaur"
							text="Providing ppblz liquidity to recieve this card"
							img={{url: pepesaur1stanniversarycard, title: 'Pepesaur anniversary'}}
							tokenId={77}/>
					</ContentColumn>
					<ContentColumn width="25%" space="3.5em">
						<CardToClaim
							title="Pepechu"
							text="Providing ppblz liquidity to recieve this card"
							img={{url: pepechu1stanniversarycard, title: 'Pepechu anniversary'}}
							tokenId={78}/>
					</ContentColumn>
				</ContentColumns>
			</div>
		</Accordion>
	)
}

export default PepemonOneAnniversarySet;
