import React from 'react';
import { StyledStoreWrapper } from '../components';

const StoreAside = ({children}) => {
	return (
		<StyledStoreWrapper width="34%">
			<div style={{position: 'sticky', top: '1em'}}>
				{children}
			</div>
		</StyledStoreWrapper>
	)
}

export default StoreAside;
