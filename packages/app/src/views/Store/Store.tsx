import React from 'react';
import { DefaultPage } from '../../components';
import { StoreCard } from './components';

const Store: React.FC<any> = () => {
	return (
		<DefaultPage title='Store'>
			<StoreCard/>
		</DefaultPage>
	)
}

export default Store
