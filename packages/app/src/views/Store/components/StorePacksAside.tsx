import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, Title, Text, Spacer, StyledSpacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreClaimModal } from '../components';
import { getDisplayBalance } from "../../../utils";
import { ActionClose, cardback_normal, coin } from '../../../assets';
import { useCardsMetadata, useApprove, useAllowance, useTokenBalance, useCardsFactoryData, useCardsStorePrices } from "../../../hooks";
import { theme } from '../../../theme';

const StorePacksAside: React.FC<any> = ({setSelectedPack, selectedPack}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId, contracts: { pepemonStore, ppdex }, ppdexAddress } = pepemonContext[0];
	const allowance = useAllowance(pepemonStore);

	const isAllowedSpending = () => {
        // No allowance needed for native BNB payments
        if (chainId === 56) {
            return true
        }
        return new BigNumber(100000000000000000000).comparedTo(allowance) === -1;
    }

	return (
		<StyledStoreWrapper style={{width: "34%"}}>
			<StyledStoreHeader>
				<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
					<Title as="h2" color={theme.color.white} font={theme.font.neometric} weight={900} size={1.2}>
						Selected Card
					</Title>
					<ActionClose onClick={() => setSelectedPack(null)}/>
				</div>
			</StyledStoreHeader>
			<StyledStoreBody>
				<Title as="h2" font={theme.font.neometric} size={1.3}>{selectedPack.name}</Title>
				<Spacer size="sm"/>
				<Text as="p" font={theme.font.inter} size={.875} lineHeight={1.3} color={theme.color.gray[600]}>When claiming this boorsterpack you will recieve {selectedPack.cardsPerPack} random cards.</Text>
				<Spacer size="sm"/>
				<img loading="lazy" src={selectedPack.url} alt={selectedPack.name} style={{width: "100%"}}/>
				<Spacer size='md'/>
				<StyledPepemonCardMeta>
					<dt>Rarity:</dt>
					<dd>Epic</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Type:</dt>
					<dd>Collectors edition</dd>
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
							{selectedPack.price} {chainId === 56 ? 'BNB' : 'PPDEX'}
						</StyledPepemonCardPrice>
					</dd>
				</StyledPepemonCardMeta>
				<Spacer size='md'/>
				<Text as="p" font={theme.font.inter} size={.75} color={theme.color.gray[300]} spacing={1.2} txtTransform="uppercase">Chances of getting this card:</Text>
				<Spacer size='sm'/>
				<Container>
					<Background />
					<Progress percent={60}/>
				</Container>
				<Spacer size='md'/>
				<Button disabled styling="purple" onClick={() => setActiveClaimModal(true) } width="100%">Not available (yet)</Button>
				{ activeClaimModal &&
					<StoreClaimModal
						disabled
						dismiss={() => setActiveClaimModal(false)}
						claimButtonText="Claim Deck"/>
				}
			</StyledStoreBody>
		</StyledStoreWrapper>
	)
}

const Container = styled.div`
  height: 8px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 2px;
  transition: width 10s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: ${props => props.theme.color.gray[100]};
  width: 100%;
`;

const Progress = styled(BaseBox)<{percent: number}>`
	background: ${props => props.theme.color.green[200]};
	width: ${({ percent }) => percent}%;
`;

export default StorePacksAside;
