import React, { useContext } from "react";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from '../../components';
import { PepemonProviderContext } from '../../contexts';

const TestPage: React.FC<any> = () => {
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId } = pepemonContext[0];

	const handleClick = () => {
		console.log(pepemonContext);
	}

	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<StyledPageTitle as="h1">Store</StyledPageTitle>
				<button onClick={handleClick}>Bruh</button>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default TestPage;
