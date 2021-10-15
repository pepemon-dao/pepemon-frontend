import React, { useState } from 'react';
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody } from './index';
import { Button, Title, Text, Spacer, StyledSpacer, StyledPepemonCardMeta, StyledPepemonCardPrice } from '../../../components';
import { StoreClaimModal } from './index';
import { ActionClose, coin } from '../../../assets';
import { theme } from '../../../theme';

const StoreCardsAside = ({setSelectedCard, selectedCard}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);

	return (
		<StyledStoreWrapper width="calc(34% - .5em)">
		<StyledStoreHeader>
			<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
				<Title as="h2" color={theme.color.white} font={theme.font.neometric} weight={900} size={1.2}>
					Selected Card
				</Title>
				<ActionClose onClick={() => setSelectedCard(null)}/>
			</div>
		</StyledStoreHeader>
		<StyledStoreBody>
			<Title as="h2" font={theme.font.neometric} size={1.3}>{selectedCard.title}</Title>
			<Spacer size="sm"/>
			<Text as="p" font={theme.font.inter} size={.875} lineHeight={1.3} color={theme.color.gray[600]}>{selectedCard.description}</Text>
			<Spacer size="sm"/>
			<img loading="lazy" src={selectedCard.image} alt={selectedCard.title} style={{width: "100%"}}/>
			<Spacer size='md'/>
			<StyledPepemonCardMeta>
				<dt>Rarity:</dt>
				<dd>{selectedCard.rarity.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Type:</dt>
				<dd>{selectedCard.type.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Set:</dt>
				<dd>{selectedCard.set.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Artist:</dt>
				<dd>{selectedCard.artist.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Price:</dt>
				<dd>
					<StyledPepemonCardPrice styling="alt">
						<img loading="lazy" src={coin} alt="coin"/>
						{selectedCard.priceOfCard} PPDEX
					</StyledPepemonCardPrice>
				</dd>
			</StyledPepemonCardMeta>
			<Spacer size='md'/>
			<Button styling="purple" onClick={() => setActiveClaimModal(true) } width="100%">Claim card</Button>
			{ activeClaimModal &&
				<StoreClaimModal
					dismiss={() => setActiveClaimModal(false)}
					claimButtonText="Claim card"/>
			}
		</StyledStoreBody>
		</StyledStoreWrapper>
	)
}

export default StoreCardsAside;
