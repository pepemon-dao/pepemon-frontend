import React, { useContext } from 'react'
import styled, { ThemeContext,DefaultTheme } from 'styled-components'

interface ContainerProps {
  children?: React.ReactNode,
  size?: 'sm' | 'md' | 'lg'
}

interface CustomTheme extends DefaultTheme {
  siteWidth: number;
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  const newWidth = useContext(ThemeContext)

  const { siteWidth } = newWidth as CustomTheme

  let width: number
  switch (size) {
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = siteWidth * 2 / 3
      break
    case 'lg':
    default:
      width = siteWidth
  }
  return (
    <StyledContainer width={width}>
      {children}
    </StyledContainer>
  )
}

interface StyledContainerProps {
  width: number
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${props => props.width}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  width: 100%;
`

export default Container