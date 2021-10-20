import React, { useContext } from "react";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from '../../components';
import { PepemonProviderContext } from '../../contexts';

const TestPage: React.FC<any> = () => {
	const pepemonContext = useContext(PepemonProviderContext);
	console.log(pepemonContext);

	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Test</StyledPageTitle>
				// Your test code goes here!
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default TestPage;
