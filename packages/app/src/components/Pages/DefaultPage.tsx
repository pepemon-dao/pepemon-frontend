import React from 'react';
import { StyledPageWrapperMain, StyledPageWrapperMainInner, StyledPageTitle } from "../../components";

interface DefaultPageProps {
	children: any,
	title?: string
}

const DefaultPage: React.FC<DefaultPageProps> = ({children, title}:any) => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				{ title && <StyledPageTitle as="h1">{title}</StyledPageTitle> }
				{children}
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default DefaultPage;
