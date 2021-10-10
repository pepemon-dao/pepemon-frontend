import React from "react";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, Loading } from "../../components";

const LoadingPage: React.FC<any> = ({children}) => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<Loading/>
				{children}
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default LoadingPage;
