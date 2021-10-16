import React from 'react'
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from '../../components';
import SubscriptionCard from './components/SubscriptionCard';

const Subscription: React.FC<any> = () => {
  return (
	  <StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Subscription</StyledPageTitle>
					<SubscriptionCard/>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default Subscription;
