import React, { useContext } from "react";
import styled from "styled-components";
import { cardback_normal, coin } from "../../../assets";
import { Title, Spacer, StyledSpacer } from "../../../components";
import { getDisplayBalance } from "../../../utils";
import { theme } from "../../../theme";
import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices } from "../../../hooks";
import { PepemonProviderContext } from "../../../contexts";

const CardSingle : React.FC<any> = ({cardId, selectedCard, selectCard}) => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];
	const cardPrice = useCardsStorePrices([cardId])[0] || undefined;
	const cardMetadata = useCardsMetadata([cardId])[0];
	const cardsBalances = useCardsFactoryData([cardId], 0)[0] || null;

	const priceOfCard = !cardPrice ? 0 : parseFloat(getDisplayBalance(cardPrice.price, 18)).toFixed(2);
	const isSoldOut = () => {
		if (!cardsBalances) return true;
		return cardsBalances.totalSupply === parseInt(cardsBalances.maxSupply);
	}

	if (cardMetadata?.status === "failed") {
		return <></>
	}

	const self = {
		cardId: cardId,
		cardPrice: cardPrice && cardPrice.price,
		cardMetadata: cardMetadata
	};

	return (
		<StyledPepemonCard style={{ opacity: isSoldOut() ? "50%" : "100%" }}>
			<StyledPepemonCardPrice>
				<img loading="lazy" src={coin} alt="coin"/>
				{cardPrice ? `${priceOfCard} ${chainId === 56 ? 'BNB' : 'PPDEX'}` : 'fetching'}
			</StyledPepemonCardPrice>
			<div>
				<StyledPepemonCardImage loading="lazy" active={cardId === selectedCard?.cardId} src={cardMetadata ? cardMetadata.image : cardback_normal} alt={cardMetadata ? cardMetadata.name : 'Loading card'}
					onClick={() => cardMetadata && selectCard(self)}/>
				<Title as="h4" size={1} font={theme.font.neometric}>{cardMetadata ? cardMetadata.name : 'Loading'}</Title>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<Spacer size="sm"/>
				<StyledPepemonCardMeta>
					<dt>Minted</dt>
					<dd>{cardsBalances === null ? 'fetching' : `${cardsBalances.totalSupply} / ${parseInt(cardsBalances.maxSupply) > 10000 ? '♾️': cardsBalances.maxSupply}`}</dd>
				</StyledPepemonCardMeta>
				<StyledPepemonCardMeta>
					<dt>Time</dt>
					<dd>{'card.time'}</dd>
				</StyledPepemonCardMeta>
			</div>
		</StyledPepemonCard>
	)
}

const StyledPepemonCard = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	&:hover {
		cursor: pointer;
	}
`

export const StyledPepemonCardPrice = styled.span<{styling?: string}>`
	& {
		background-color: ${props => props.styling === 'alt' ? props.theme.color.white : props.theme.color.black};
		color: ${props => props.styling === 'alt' ? props.theme.color.black : props.theme.color.white};
		font-family: ${props => props.theme.font.spaceMace};
		border-radius: 6px;
		display: inline-flex;
		margin-left: auto;
		margin-right: auto;
		align-items: center;
		padding: ${props => props.styling === 'alt' ? '' : '2px 8px'};
		font-size: ${props => props.styling === 'alt' ? '1rem' : '.8rem'};
		transform: ${props => props.styling === 'alt' ? '' : 'translateY(40%)'};
		position: relative;
		z-index: 1;
	}

	& img {
		width: 1.8em;
	}
`

export const StyledPepemonCardImage = styled.img<{active?: boolean}>`
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
	height: auto;
	max-width: 25em;
	position: relative;
	width: 100%;
	z-index: 0;

	&:hover {
		cusror: pointer;
	}

	${({ active }) => active && `
		&{
			filter: drop-shadow(0 0 50px #894fbe);
		}
	`}
`

export const StyledPepemonCardMeta = styled.dl`
	&{
		display: flex;
		font-family: ${props => props.theme.font.inter};
		justify-content: space-between;
		margin-bottom: 0;
		margin-top: 0;
	}

	& dt, dd {
		font-size: .8rem;
		margin-top: .5em;
	}

	& dt {
		color: ${props => props.theme.color.gray[300]};
		text-transform: uppercase;
		letter-spacing: 1.2px;
	}

	& dd {
		color: ${props => props.theme.color.gray[600]};
		font-weight: bold
	}
`

export default CardSingle;
