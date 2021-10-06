import styled from "styled-components";

interface ButtonProps {
    bg?: string;
    color?: string;
    font?: string;
    hidden?: boolean;
    width?: string
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.bg ? props.bg : props.theme.color.purple[400]};
  border: 1px solid ${props => props.color ? props.color : props.theme.color.white};
  border-radius: 8px;
  color: ${props => props.color ? props.color : props.theme.color.white};
  cursor: pointer;
  font-family: ${props => props.font ? props.font : props.theme.font.spaceMace};
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  padding: 12px 24px;
  width: ${props => props.width && props.width};
  transition: all .2s;

  &:hover {
      background-color: ${props => props.color ? props.color : props.theme.color.white};
      border: 1px solid ${props => props.bg ? props.bg : props.theme.color.purple[400]};
      color: ${props => props.bg ? props.bg : props.theme.color.purple[400]};
  }

  ${props => props.hidden && "hidden"} :focus {
    outline: none;
  }
`;

export default Button;
