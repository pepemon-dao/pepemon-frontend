import React, { useState } from 'react';
import styled from "styled-components";
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StyledPepemonCardImage, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, Title, Text, Spacer, StyledSpacer } from '../../../components';
import { StoreClaimModal } from './index';
import { ActionClose, coin } from '../../../assets';
import { theme } from '../../../theme';

const StoreBoosterpacksAside: React.FC<any> = ({setSelectedPack, selectedPack}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);

	return (
		<StyledStoreWrapper width="35%">
			<StyledStoreHeader>
				<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
					<Title as="h2" color={theme.color.white} weight={900} font={theme.font.neometric} size={1.2}>
						Selected boosterpack
					</Title>
					<ActionClose onClick={() => setSelectedPack("")}/>
				</div>
			</StyledStoreHeader>
			<StyledStoreBody>
				<Title as="h2" font={theme.font.neometric} size={1.3}>{selectedPack.name}</Title>
				<Spacer size="sm"/>
				<Text as="p" font={theme.font.inter} size={.875} lineHeight={1.3} color={theme.color.gray[600]}>When claiming this boorsterpack you will recieve 3 random cards. Possible cards are:</Text>
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
				<Text as="p" font={theme.font.inter} size={.75} color={theme.color.gray[300]} spacing={1.2} txtTransform="uppercase">Chances of getting this card:</Text>
				<Spacer size='sm'/>
				<Container>
					<Background />
					<Progress percent={60}/>
				</Container>
				<Spacer size='md'/>
				<Button styling="purple" onClick={() => setActiveClaimModal(true) } width="100%">Claim pack</Button>
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
