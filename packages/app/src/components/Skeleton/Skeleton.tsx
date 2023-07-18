import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonWrapperProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  isLoaded?: boolean;
}

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const SkeletonContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  overflow: hidden;
`;

const SkeletonLoading = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  animation: ${loadingAnimation} 1.5s ease-in-out infinite;
`;

const SkeletonWrapper = styled.div<SkeletonWrapperProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '16px'};
`;

const Skeleton: React.FC<SkeletonWrapperProps> = ({ width, height, children, isLoaded }) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <SkeletonContainer>
      <SkeletonWrapper width={width} height={height}>
        <SkeletonLoading />
      </SkeletonWrapper>
    </SkeletonContainer>
  );
};

export default Skeleton;
