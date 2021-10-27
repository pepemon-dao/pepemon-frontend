import React from "react";
import { DefaultPage, Loading } from "../../components";

const LoadingPage: React.FC<any> = ({children}) => {
	return (
		<DefaultPage>
			{children}
			<Loading/>
		</DefaultPage>
	)
}

export default LoadingPage;
