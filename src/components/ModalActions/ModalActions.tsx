import React from "react";
import styled from "styled-components";
import { Spacer } from '../index';

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length;
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
            <>
              <StyledModalAction>{child}</StyledModalAction>
              {i < l - 1 && <Spacer size="md"/>}
            </>
        ))}
    </StyledModalActions>
  );
};

const StyledModalActions = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0;
  width: 60%
`;

const StyledModalAction = styled.div``

export default ModalActions;
