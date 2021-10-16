import React, { useState, useContext } from 'react';
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody } from './index';
import { Button, Title, Text, Spacer, StyledSpacer, StyledPepemonCardMeta, StyledPepemonCardPrice } from '../../../components';
import { StoreClaimModal } from './index';
import { ActionClose, coin } from '../../../assets';
import { PepemonProviderContext } from '../../../contexts';
import { theme } from '../../../theme';

const StoreCardsAside = ({setSelectedCard, selectedCard}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);

	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];
	const { title, description, image, rarity, type, set, artist, priceOfCard,
	 	isRedeemingThisCard, isAffordable, isReleasingSoon, isMintable, isNoLongerForSale, isAllowedSpending, setDelayApprove, onRedeemCard, tokenId, setTransactions, transactions
	} = selectedCard;

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
			<Title as="h2" font={theme.font.neometric} size={1.3}>{title}</Title>
			<Spacer size="sm"/>
			<Text as="p" font={theme.font.inter} size={.875} lineHeight={1.3} color={theme.color.gray[600]}>{description}</Text>
			<Spacer size="sm"/>
			<img loading="lazy" src={image} alt={title} style={{width: "100%"}}/>
			<Spacer size='md'/>
			<StyledPepemonCardMeta>
				<dt>Rarity:</dt>
				<dd>{rarity.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Type:</dt>
				<dd>{type.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Set:</dt>
				<dd>{set.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Artist:</dt>
				<dd>{artist.value}</dd>
			</StyledPepemonCardMeta>
			<Spacer size='sm'/>
			<StyledSpacer bg={theme.color.gray[100]} size={2}/>
			<StyledPepemonCardMeta>
				<dt>Price:</dt>
				<dd>
					<StyledPepemonCardPrice styling="alt">
						{parseInt(priceOfCard) === 0 ? "No longer available" :
							<>
								<img loading="lazy" src={coin} alt="coin"/>
								{priceOfCard} PPDEX
							</>
						}
					</StyledPepemonCardPrice>
				</dd>
			</StyledPepemonCardMeta>
			<Spacer size='md'/>
			{!isAllowedSpending() ?
                <Button styling="purple"
                        disabled={!isMintable() || isRedeemingThisCard || priceOfCard === '0.00'}
                        onClick={() => setDelayApprove(false)}>Approve first</Button>
                : (isAffordable() && !isReleasingSoon() &&
                    (isMintable() && !isNoLongerForSale() &&
                        <Button styling="purple"
                                disabled={isRedeemingThisCard || priceOfCard === '0.00'}
                                onClick={() => setActiveClaimModal(true)}>{isRedeemingThisCard ? 'Claiming...' : 'Claim'}
                        </Button>
                    )
				)
            }
			{ activeClaimModal &&
				<StoreClaimModal
					dismiss={() => setActiveClaimModal(false)}
					claimButtonText={isRedeemingThisCard ? 'Claiming...' : 'Claim card' }
					claimButtonClick={() => onRedeemCard(tokenId, chainId === 56 ? priceOfCard.toString() : null).then(() => setTransactions(transactions + 1))}
				/>
			}
		</StyledStoreBody>
		</StyledStoreWrapper>
	)
}

export default StoreCardsAside;
