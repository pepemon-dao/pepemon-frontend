import React from 'react';
import { DefaultPage } from '../../components';
import StakeCard from './components/StakeCard';

export const stakingMeta = {
	title: 'Pepemon! Earn',
	description: 'Users have the choice of earning with PPBLZ on our platform for a basic APY, or earn with PPBLZ-ETH LP tokens for double the rewards in PPDEX. Collect fees and help other Pepemon trainers get in the game.'
}

const Staking: React.FC<any> = () => {
	return (
		<DefaultPage title='Staking'>
			<StakeCard/>
		</DefaultPage>
	)
}

export default Staking;
