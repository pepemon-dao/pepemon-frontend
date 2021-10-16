import React from 'react'
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from '../../components';
import StakeCard from './components/StakeCard';

const Staking: React.FC<any> = () => {
  return (
	  <StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Staking</StyledPageTitle>
					<StakeCard/>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default Staking;
