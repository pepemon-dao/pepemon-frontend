import styled from "styled-components";
import { theme } from "../../theme";
import { StyledPageWrapperMain, StyledPageWrapperMainInner, Loading } from "../../components";

const LoadingPage = () => {
	return (
		<StyledPageWrapperMain>
			<StyledPageWrapperMainInner>
				<Loading/>
			</StyledPageWrapperMainInner>
		</StyledPageWrapperMain>
	)
}

export default LoadingPage;
