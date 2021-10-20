import React from "react";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from '../../components';
import { CardToClaim } from './CardToClaim';

const TestPage: React.FC<any> = () => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Test</StyledPageTitle>
				<p>Token ID 75:</p>
				<CardToClaim tokenId={75}/>
				<p>Token ID 76:</p>
				<CardToClaim tokenId={76}/>
				<p>Token ID 77:</p>
				<CardToClaim tokenId={77}/>
				<p>Token ID 78:</p>
				<CardToClaim tokenId={78}/>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default TestPage;
