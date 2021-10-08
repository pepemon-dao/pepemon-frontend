import React, { useState } from 'react';
import styled from "styled-components";
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StyledPepemonCardImage, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, StyledTitle, StyledText, Spacer, StyledSpacer } from '../../../components';
import { StoreClaimModal } from './index';
import { ActionClose, coin } from '../../../assets';
import { theme } from '../../../theme';

const StoreBoosterpacksAside: React.FC<any> = ({setSelectedPack, selectedPack}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);

	return (
		<StyledStoreWrapper width="35%">
			<StyledStoreHeader>
				<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
					<StyledTitle as="h2" color={theme.color.white} weight={900} font={theme.font.neometric} size="1.2rem">
						Selected boosterpack
					</StyledTitle>
					<ActionClose onClick={() => setSelectedPack("")}/>
				</div>
			</StyledStoreHeader>
			<StyledStoreBody>
				<StyledTitle as="h2" font={theme.font.neometric} size="1.3rem">{selectedPack.name}</StyledTitle>
				<Spacer size="sm"/>
				<StyledText as="p" font={theme.font.inter} size=".875rem" color={theme.color.gray[600]}>When claiming this boorsterpack you will recieve 3 random cards. Possible cards are:</StyledText>
				<Spacer size="sm"/>
				<StyledPepemonCardImage src={selectedPack.url}/>
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
							{selectedPack.price} PPDEX
						</StyledPepemonCardPrice>
					</dd>
				</StyledPepemonCardMeta>
				<Spacer size='md'/>
				<StyledText as="p" font={theme.font.inter} size=".75rem" color={theme.color.gray[300]} txtTransform="uppercase">Chances of getting this card:</StyledText>
				<Spacer size='sm'/>
				<Container>
					<Background />
					<Progress percent={60}/>
				</Container>
				<Spacer size='md'/>
				<Button onClick={() => setActiveClaimModal(true) } width="100%">Claim pack</Button>
				{ activeClaimModal &&
					<StoreClaimModal dismiss={() => setActiveClaimModal(false)} claimButtonText="Claim pack"/>
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

export default StoreBoosterpacksAside;
