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
						Hi pepetrainer!
					</Title>
					<Spacer size='sm' />
					<Text color={theme.color.white}>
						On this page you can stake your awesome Pepemon cards to receive even more awesome exclusive 
						Pepemon rewards. If you are missing one, or maybe even multiple cards required for joining your 
						desired event, you can always try buying them from a fellow Pepetrainer on OpenSea.
					</Text>
					<Spacer size='md' />
					<Text color={theme.color.white}>
						Sometimes an event requires you to burn certain cards in the process, these cards are marked with 
						this cute emoji. Until event completion you can always withdraw your cards without any penalty or card burned.
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
`;

const InfoContent = styled.div`
	width: 940px;
	height: 224px;
	margin: 24px 210px 16px 0;
	padding: 16px 16px 24px 32px;
	border-radius: 16px;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	background-image: linear-gradient(104deg, #47057b 5%, #220245 98%);
    opacity: 0.8;

`;

export default EventInfo;