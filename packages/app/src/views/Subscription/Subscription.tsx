import React from 'react'
import { DefaultPage } from '../../components';
import SubscriptionCard from './components/SubscriptionCard';

const Subscription: React.FC<any> = () => {
	return (
		<DefaultPage title='Subscription'>
			<SubscriptionCard/>
		</DefaultPage>
	)
}

export default Subscription;
