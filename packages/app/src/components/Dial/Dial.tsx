import React from 'react';
import styled from 'styled-components';

interface DialProps {
  children?: React.ReactNode,
  color?: 'primary' | 'secondary',
  disabled?: boolean,
  size?: number,
  value: number
}

const Dial: React.FC<DialProps> = ({ children, color, disabled, size = 256, value }) => {

  if (color === 'primary') {

  }

  return (
    <StyledDial size={size}>
      <StyledOuter>
          	value={value}
      </StyledOuter>
      <StyledInner size={size}>
        {children}
      </StyledInner>
    </StyledDial>
  )
}

interface StyledInnerProps {
  size: number
}

const StyledDial = styled.div<StyledInnerProps>`
  padding: calc(${props => props.size}px * 24 / 256);
  position: relative;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

const StyledInner = styled.div<StyledInnerProps>`
  align-items: center;

  border-radius: ${props => props.size}px;
  display: flex;
  justify-content: center;
  position: relative;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

const StyledOuter = styled.div`

  border-radius: 10000px;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

export default Dial
