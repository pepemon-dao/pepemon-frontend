import React, { useState } from 'react'
import styled from 'styled-components';
import { Title, Text, Spacer } from '../../../components';
import { ibutton, ActionClose } from '../../../assets';
import { theme } from '../../../theme';

const EventInfo: React.FC<any> = () => {
	const [toggleInfo, setToggleInfo] = useState(true);

	return (
        <>
			{!toggleInfo ? (
				<InfoButton
					onClick={() => setToggleInfo(true)}
				>
					<img src={ibutton} alt='info' style={{opacity: 0.75}}/>
				</InfoButton>
			) : (
				<InfoContent>
					<Title
						as='h3'
						font={theme.font.neometric}
						color={theme.color.white}
						weight='bold'
					>
						Hello there!
					</Title>
					<Spacer size='sm' />
					<Text color={theme.color.white}>
						On this page you can evolve your awesome Pepemon NFT cards to 
						receive exclusive Pepemon NFT rewards. If you are missing a NFT card 
						required for joining an evolution event you can always get them from 
						a fellow Pepetrainer on OpenSea or Pepemon Marketplace.
					</Text>
					<Spacer size='md' />
					<Text color={theme.color.white}>
						Sometimes an evolution event requires you to burn certain cards in the process, these cards are marked with 
						this 💀 cute emoji. Until event completion you can always withdraw your cards, loosing the progress but without any changes to your NFTs.
					</Text>
					<StyledActionClose>
						<ActionClose onClick={() => setToggleInfo(false)} />
					</StyledActionClose>
				</InfoContent>
			)}
        </>
	)
}

const StyledActionClose = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
    
`;

const InfoButton = styled.div`
	display: flex;
	width: 56px;
	height: 56px;
	margin: 24px 413px 16px 0;
	padding: 16px;
	border-radius: 16px;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
    background-image: linear-gradient(137deg, #47057b 2%, #220245 99%);
    cursor: pointer;
    opacity: 0.8;
    justify-content: center;
`;

const InfoContent = styled.div`
	width: 100%;
	margin: 24px 210px 16px 0;
	padding: 16px 16px 24px 32px;
	border-radius: 16px;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	background-image: linear-gradient(104deg, #47057b 5%, #220245 98%);
    opacity: 0.8;

`;

export default EventInfo;
