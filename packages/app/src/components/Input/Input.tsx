import React, { forwardRef, ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface InputProps {
  mb?: number;
  width?: string;
  height?: string;
  borderRadius?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number; // Add defaultValue property to InputProps interface
  onChange?: ChangeEventHandler<HTMLInputElement>; // Add onChange property to InputProps interface
}

const InputWrapper = styled.input<InputProps>`
  margin-bottom: ${(props) => props.mb}px;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '40px'};
  border-radius: ${(props) => props.borderRadius || '8px'};
  /* Add more styling properties here */
`;

// Define the type for the ref callback function
type RefCallBack = (instance: HTMLInputElement | null) => void;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { mb, ...rest } = props;
  return <InputWrapper ref={ref} mb={mb} {...rest} />;
});

export default Input;
