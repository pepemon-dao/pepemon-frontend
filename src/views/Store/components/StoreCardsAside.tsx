import React, { useState } from 'react';
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, StyledTitle, StyledText, Spacer, StyledSpacer } from '../../../components';
import { StoreClaimModal } from './index';
import { ActionClose, coin } from '../../../assets';
import { theme } from '../../../theme';

const StoreCardsAside: React.FC<any> = ({setSelectedCard, selectedCard}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);

	return (
		<StyledStoreWrapper>
			<StyledStoreHeader>
				<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
					<StyledTitle as="h2" color={theme.color.white} font={theme.font.neometric} size="1.2rem">
						Selected Card
					</StyledTitle>
					<ActionClose onClick={() => setSelectedCard("")}/>
				</div>
			</StyledStoreHeader>
			<StyledStoreBody>
				<StyledTitle as="h2" font={theme.font.neometric} size="1.3rem">{selectedCard.name}</StyledTitle>
				<Spacer size="sm"/>
				<StyledText as="p" font={theme.font.inter} size=".875rem" color={theme.color.gray[600]}>Super cool discription about this card. Iuis aute irure dolor in reprehenderit in voluptate velit esse cillum.</StyledText>
				<Spacer size="sm"/>
				<img loading="lazy" src={selectedCard.url} alt={selectedCard.name} style={{width: "100%"}}/>
				<Spacer size='md'/>
				<StyledPepemonCardMeta>
					<dt>Rarity:</dt>
					<dd>Epic</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Type:</dt>
					<dd>Collector's edition</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Set:</dt>
					<dd>New beginning</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Artist:</dt>
					<dd>Azucena N.A.</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Price:</dt>
					<dd>
						<StyledPepemonCardPrice styling="alt">
							<img loading="lazy" src={coin} alt="coin"/>
							{selectedCard.price} PPDEX
						</StyledPepemonCardPrice>
					</dd>
				</StyledPepemonCardMeta>
				<Spacer size='md'/>
				<Button onClick={() => setActiveClaimModal(true) } width="100%">Claim card</Button>
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
