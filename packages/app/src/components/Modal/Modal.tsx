import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
  onDismiss?: () => void
}

const Modal: React.FC<any> = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>{children}</StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
  width: 512px;
  max-height: 90%;
  // overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    // animation: ${mobileKeyframes} 0.3s forwards ease-out;
    width: 100vw;
  }
`

const StyledModal = styled.div`
  padding: 0 20px;


  border-radius: 12px;

  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
  z-index: 10000;
  overflow: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: unset;
  }
`

export default Modal
