import React from 'react'
import { DefaultPage } from '../../components';
import SubscriptionCard from './components/SubscriptionCard';

export const subscriptionMeta = {
	title:'Pepemon! NFT Subscription',
	description: "Pepemon One NFT subscription is the best way not to miss out on any exclusive Collector's Edition NFTs and secure NFT drops every month."
}

const Subscription: React.FC<any> = () => {
	return (
		<DefaultPage title='Subscription'>
			<SubscriptionCard/>
		</DefaultPage>
	)
}

export default Subscription;
