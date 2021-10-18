import React from 'react';
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from '../../components';
import { StoreCard } from './components';

const Store: React.FC<any> = () => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Store</StyledPageTitle>
				<StoreCard/>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default Store
