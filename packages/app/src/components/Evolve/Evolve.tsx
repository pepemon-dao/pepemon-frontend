import React from "react";
import styled from "styled-components";
import { AnimatedImg } from "../../components";
import { theme } from "../../theme";
import { pepertle, warpertle, rektoise } from "../../assets";

const Evolve = () => {
	return (
		<>
			<EvolveGrid>
				<EvolveImgWrapper>
					<EvolveImgContainer>
						<AnimatedImg width={313} height={434} src={pepertle} alt="pepertle" />
					</EvolveImgContainer>
				</EvolveImgWrapper>
				<EvolveImgWrapper>
					<EvolveImgContainer>
						<AnimatedImg width={313} height={434} src={warpertle} alt="warpertle" />
					</EvolveImgContainer>
				</EvolveImgWrapper>
				<EvolveImgWrapper>
					<EvolveImgContainer>
						<AnimatedImg width={313} height={434} src={rektoise} alt="rektoise" />
					</EvolveImgContainer>
				</EvolveImgWrapper>
			</EvolveGrid>
		</>
	)
}

const EvolveGrid = styled.div`
	display: grid;
	position: relative;

	@media (min-width: ${theme.breakpoints.tabletL}) {
		grid-auto-rows: 1fr;
		width: 250%;
	}
`

interface EvolveImgWrapperProps {
	width?: string;
	margin?: string;
	transform?: string
}

interface EvolveImgContainerProps {
	absolute?: boolean,
	left?: string,
	transform?: string,
	right?: string
}

const EvolveImgContainer = styled.div<EvolveImgContainerProps>`
	position: relative;
	text-align: center;
	width: fit-content;
`

const EvolveImgWrapper = styled.div<EvolveImgWrapperProps>`
	margin: ${props => props.margin && props.margin};
	position: sticky;
	top: calc(${theme.topBarSize}px + 2em);

	&:first-child {
			margin-right: auto;
	}

	&:nth-child(2) {
		padding-top: ${theme.topBarSize}px;

			margin-left: auto;
			margin-right: auto;
	}

	&:nth-child(3) {
		padding-top: ${2*theme.topBarSize}px;

			margin-left: auto;
	}
`

export default Evolve;
