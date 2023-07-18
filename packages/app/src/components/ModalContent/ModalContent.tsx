import React from 'react'
import styled from 'styled-components'

interface ModalContentProps{
	children?: any
}

const ModalContent: React.FC<ModalContentProps> = ({children}) => {
	return <StyledModalContent>{children}</StyledModalContent>
}

const StyledModalContent = styled.div`
	padding: ${(props) => props.theme.spacing[2]}px;
`

export default ModalContent
