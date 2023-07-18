import React, { useContext } from "react";
import styled, { ThemeContext,DefaultTheme } from "styled-components";

interface SpacerProps {
  size?: "sm" | "md" | "lg";
}

interface CustomTheme extends DefaultTheme {
  spacing: number[];
}


const Spacer: React.FC<SpacerProps> = ({ size = "md" }) => {
  const space= useContext(ThemeContext);

  const { spacing } = space as CustomTheme;

  let s: number;
  switch (size) {
    case "lg":
      s = spacing[6];
      break;
    case "sm":
      s = spacing[2];
      break;
    case "md":
    default:
      s = spacing[4];
  }

  return <StyledSpacer size={s} />;
};

interface StyledSpacerProps {
  size?: number;
  bg?: string
}

export const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${props => props.size ? props.size : 0}px;
  width: ${props => props.size ? props.size : 0}px;
  background-color: ${props => props.bg ? props.bg : props.theme.color.transparent};
`;

export default Spacer;
