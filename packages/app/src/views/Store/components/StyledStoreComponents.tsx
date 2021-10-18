import styled from 'styled-components';

export const StyledStoreWrapper = styled.div<{width?: string}>`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.color.black};
    max-width: ${props => props.width && props.width};

    &:last-child:not(:first-child) {
        margin-left: 1em;
    }
`

export const StyledStoreHeader = styled.div`
    background-color: ${(props) => props.theme.color.purple[800]};
    color:  ${(props) => props.theme.color.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1em;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`

export const StyledStoreBody = styled.div`
    position: relative;
    background-color: ${props => props.theme.color.white};
    padding: 1.1em;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`

export const StyledStoreCardsWrapper = styled.div<{gridCols: number}>`
	display: grid;
	grid-template-columns: repeat(${props => props.gridCols}, 1fr);
	grid-row-gap: 2rem;
	grid-column-gap: 1rem;
	overflow: visible;
`
