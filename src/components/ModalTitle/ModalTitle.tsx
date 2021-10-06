import React from "react";
import styled from "styled-components";

interface ModalTitleProps {
  text?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>{text}</StyledModalTitle>
);

const StyledModalTitle = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.black};
  display: flex;
  font-size: 2.5rem;
  font-family: ${props => props.theme.font.spaceMace};
  justify-content: center;
`;

export default ModalTitle;
