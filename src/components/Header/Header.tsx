import styled from "styled-components";

const Header = styled.div`
  background-color: transparent;
  height: ${(props) => props.theme.color.topBarSize}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

export default Header;
