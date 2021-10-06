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
	background-color: ${props => props.theme.color.white};
	border-radius: 16px;
	justify-content: center;
	align-items: flex-start;
`

export default Loading;
