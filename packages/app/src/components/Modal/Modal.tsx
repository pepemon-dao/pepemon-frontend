import React from "react";
import styled, { keyframes } from "styled-components";

export interface ModalProps {
  onDismiss?: () => void;
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>{children}</StyledModal>
    </StyledResponsiveWrapper>
  );
};

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 800px;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: 100%;
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
    max-width: 100vw;
  }
`;

const StyledModal = styled.div`
  padding: 40px;
  // background: ${(props) => props.theme.color[5]};
  background: rgba(58, 72, 107, 0.3);
  // border: 1px solid ${(props) => props.theme.color.grey[300]}ff;
  border: 1.5px solid #3a486b;
  backdrop-filter: blur(40px);
  // border-radius: 12px;
  // box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[300]};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 0;
  z-index: 1;
`;

export default Modal;
