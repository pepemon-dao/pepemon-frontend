import React from 'react';
import styled from 'styled-components';
import { walk3 } from '../../assets';

const Loading = () => {
	return (
		<StyledLoading>
			<img src={walk3} alt="loading"/>
		</StyledLoading>
	)
}

const StyledLoading = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
`

export default Loading;
