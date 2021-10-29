import React from 'react'
import { DefaultPage } from '../../components';
import StakeCard from './components/StakeCard';

const Staking: React.FC<any> = () => {
	return (
		<DefaultPage title='Staking'>
			<StakeCard/>
		</DefaultPage>
	)
}

export default Staking;
