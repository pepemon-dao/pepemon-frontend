import React from 'react';
import { DefaultPage } from '../../components';
import BridgeCard from './components/BridgeCard';

export const bridgeMeta = {
	title: 'Bridge your coins to the Pepe Chain',
	description: "Bridge your $ppdex and other pepemon tokens to the Pepemon L2 chain. You'll be able to use them in the game and earn rewards for doing so."
}

const Bridge: React.FC<any> = () => {
	return (
		<DefaultPage title='BridgeCard'>
			<BridgeCard/>
		</DefaultPage>
	)
}

export default Bridge;
