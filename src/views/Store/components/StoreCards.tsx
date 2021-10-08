import React from "react";
import styled from 'styled-components';
import { StyledTitle, Spacer, StyledSpacer } from '../../../components';
import { theme } from '../../../theme';
import { coin } from '../../../assets';

interface StoreCardsProps {
	title: string;
	pokeCards: any;
	gridCols: number;
	selectedCard?: any;
	selectCard: (card: { name: string; cardsPerPack?: number; url: string; minted: string; time: string, price: string }) => void;
}

const StoreCards: React.FC<StoreCardsProps> = (props) => {
	return (
		<StyledStoreContentWrapper>
			<div>
				<StyledTitle as="h3" size="1.3rem" font={theme.font.spaceMace}>{props.title}</StyledTitle>
				<Spacer/>
				<StyledStoreCardsWrapper gridCols={props.gridCols}>
					{ Object.keys(props.pokeCards).map((card, key) => {
						const active = props.selectedCard.name === props.pokeCards[card].name;

					return (
						<PepemonCard active={active} key={key} card={props.pokeCards[card]} selectCard={() => props.selectCard(props.pokeCards[card])}/>
					) }) }
				</StyledStoreCardsWrapper>
			</div>
			<Spacer size="lg"/>
		</StyledStoreContentWrapper>
	)
}

const StyledStoreContentWrapper = styled.div`
  &{
	background-color: ${(props) => props.theme.color.white};
	display: flex;
	flex-direction: column;
	width: 100%;
  }
  & * { box-sizing: border-box; }
  @media (max-width: 880px) {
    max-width: 600px;
    padding: 0 2rem;
    flex-direction: column;
  }
  @media (max-width: 450px) {
    max-width: min-content;
    padding: 0 2rem;
    flex-direction: column;
  }
`

const StyledStoreCardsWrapper = styled.div<{gridCols: number}>`
	display: grid;
	grid-template-columns: repeat(${props => props.gridCols}, 1fr);
	grid-row-gap: 2rem;
	grid-column-gap: 1rem;
	overflow: visible;
`

export const PepemonCard: React.FC<{card: { name: string, cardsPerPack?: number; url: string, minted: string, time: string, price: string }, selectCard: (card: any) => any, active: boolean}> = ({card, selectCard, active}) => {
	const soldOut = card.time === "sold out" ? true : false;

	return (
		<StyledPepemonCard style={{ opacity: soldOut ? "50%" : "100%" }}>
			<StyledPepemonCardPrice>
				<img loading="lazy" src={coin} alt="coin"/>
				{card.price} PPDEX
			</StyledPepemonCardPrice>
			<div>
				<StyledPepemonCardImage active={active} src={card.url} onClick={() => selectCard(card)}/>
				<StyledTitle as="h4" size="1rem" font={theme.font.neometric}>{card.cardsPerPack ? `${card.cardsPerPack} cards` : card.name}</StyledTitle>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<Spacer size="sm"/>
				<StyledPepemonCardMeta>
					<dt>Minted</dt>
					<dd>{card.minted}</dd>
				</StyledPepemonCardMeta>
				<StyledPepemonCardMeta>
					<dt>Time</dt>
					<dd>{card.time}</dd>
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
	}

	& dd {
		color: ${props => props.theme.color.gray[600]};
		font-weight: bold
	}
`

export default StoreCards;
