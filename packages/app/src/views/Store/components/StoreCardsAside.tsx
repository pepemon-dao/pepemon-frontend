import React, { useState, useContext } from "react";
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, ExternalLink, Title, Text, Spacer, StyledSpacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreClaimModal } from '../components';
import { getDisplayBalance } from "../../../utils";
import { ActionClose, cardback_normal, coin } from '../../../assets';
import { useAllowance, useTokenBalance, useRedeemCard, useApprove } from "../../../hooks";
import { theme } from '../../../theme';

const StoreCardsAside: React.FC<any> = ({setSelectedCard, selectedCard: { cardId, cardPrice, cardMetadata = null, cardsBalances = null }}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);
	const [transactions, setTransactions] = useState(0);
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId, contracts } = pepemonContext[0];
	const { onRedeemCard, isRedeemingCard } = useRedeemCard(contracts.pepemonStore.address);
	const { onApprove, isApproving } = useApprove(contracts.pepemonStore.address, contracts.ppdex.address);
	const allowance = useAllowance(contracts.pepemonStore.address);
	const ppdexBalance = useTokenBalance(contracts.ppdex.address);
	if (cardMetadata.status === "failed") { setSelectedCard(null); return <></> } // bail out early if card infos couldn't be loaded

	const isItemCard = (tokenId: number) => {
        return [17, 18, 19].includes(tokenId);
    }

    const daysForSale = () => {
        if (isItemCard(cardId)) {
            return 1000000
        }
        return cardId > 5 ? (cardId > 12 ? 28 : 21) : 14;
    }

	const isAllowedSpending = () => {
        // No allowance needed for native BNB payments
        if (chainId === 56) { return true; }
		return cardPrice?.comparedTo(allowance) === -1;
    }

	const isMintable = () => {
        return cardsBalances && (parseInt(cardsBalances.totalSupply) < parseInt(cardsBalances.maxSupply));
    }

	const isAffordable = () => {
        if (cardPrice?.isEqualTo(ppdexBalance)) { return true; }
        return cardPrice?.comparedTo(ppdexBalance) === -1;
    }

	const isReleasingSoon = () => {
        const birthdayMetaData = cardMetadata.attributes.find(attribute => attribute.trait_type === 'birthday');
        if (parseInt(birthdayMetaData.value) === 0) {
            return true;
        }

        return parseInt(birthdayMetaData.value) > (Date.now() / 1000);
    }

	const isForSale = () => {
        const birthdayMetaData = cardMetadata.attributes.find(attribute => attribute.trait_type === 'birthday');
        if (parseInt(birthdayMetaData.value) === 0) {
            return false;
        }
        return (parseInt(birthdayMetaData.value) + (daysForSale() * 24 * 60 * 60)) > (Date.now() / 1000)
    }

	const isSoldOut = () => {
        return (!isMintable() && !isReleasingSoon()) || (!isForSale() && !isReleasingSoon());
    }
	const isNoLongerForSale = () => {
        return !isReleasingSoon() && !isForSale()
    }

	const priceOfCard = cardPrice && parseFloat(getDisplayBalance(cardPrice, 18)).toFixed(2);

	const buttonProps = () => {
		if (isSoldOut() || isNoLongerForSale()) {
			return { disabled: true, onClick: () => null, text: 'Sold out' }
		}
		else if (isAllowedSpending()) {
			if (isReleasingSoon()) {
				return { disabled: true, onClick: () => null, text: 'Releasing soon' }
			} else if (!isAffordable()) {
				return { disabled: true, onClick: () => null, text: 'Not enough balance' };
			} else {
				return { disabled: true, onClick: setActiveClaimModal(true), text: isRedeemingCard ? 'Claiming...' : 'Claim card' }
			}
		} else {
			return { disabled: false, onClick: () => !isApproving && onApprove(), text: isApproving ? 'Enabling...' : 'Enable' }
		}
	}

	return (
		<StyledStoreWrapper style={{width: "34%"}}>
			<StyledStoreHeader>
				<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
					<Title as="h2" color={theme.color.white} font={theme.font.neometric} weight={900} size={1.2}>
						Selected Card
					</Title>
					<ActionClose onClick={() => setSelectedCard("")}/>
				</div>
			</StyledStoreHeader>
			<StyledStoreBody>
				<Title as="h2" font={theme.font.neometric} size={1.3}>{cardMetadata ? cardMetadata.name : 'Loading card'}</Title>
				<Spacer size="sm"/>
				<Text as="p" font={theme.font.inter} size={.875} lineHeight={1.3} color={theme.color.gray[600]}>{cardMetadata && cardMetadata.description}</Text>
				<Spacer size="sm"/>
				<img loading="lazy" src={cardMetadata ? cardMetadata.image : cardback_normal} alt={cardMetadata ? cardMetadata.name : 'Loading card'} style={{width: "100%"}}/>
				<Spacer size='md'/>
				<StyledPepemonCardMeta>
					<dt>Rarity:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Rarity').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Type:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Type').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Set:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Set').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Artist:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Artist').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Price:</dt>
					<dd>
						<StyledPepemonCardPrice styling="alt">
							<img loading="lazy" src={coin} alt="coin"/>
							{cardPrice ? `${priceOfCard} ${chainId === 56 ? 'BNB' : 'PPDEX'}` : 'fetching'}
						</StyledPepemonCardPrice>
					</dd>
				</StyledPepemonCardMeta>
				<Spacer size='md'/>
				{isAffordable() && !isReleasingSoon() &&
					<ExternalLink style={{ width: '100%' }} href={chainId === 137 ? 'https://quickswap.exchange/#/swap?outputCurrency=0x127984b5e6d5c59f81dacc9f1c8b3bdc8494572e' :
					chainId === 56 ? 'https://www.binance.com/en/trade/BNB_ETH' : `https://app.uniswap.org/#/swap?outputCurrency=${contracts.ppdex.address}`}>
						Buy {chainId === 56 ? 'BNB' : 'PPDEX'}
					</ExternalLink>
				}
				<Spacer size='md'/>
				<Button width="100%" styling="purple"
					disabled={buttonProps().disabled}
					onClick={buttonProps().onClick}>
						{buttonProps().text}
				</Button>
				{ activeClaimModal &&
					<StoreClaimModal
						dismiss={() => setActiveClaimModal(false)}
						claimButtonText={isRedeemingCard ? 'Claiming...' : 'Claim card'}
						claimButtonClick={() => onRedeemCard(cardId, chainId === 56 ? priceOfCard.toString() : null).then(() => setTransactions(transactions + 1))}
						claimButtonDisabled={isRedeemingCard}
					/>
				}
			</StyledStoreBody>
		</StyledStoreWrapper>
	)
}

export default StoreCardsAside;
