import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  iconHeight?: string
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, iconHeight, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        {icon && <StyledIcon height={iconHeight || "250"}>{icon}</StyledIcon>}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem 2rem',
          justifyContent: 'center',
          alignItems: 'center',

          borderRadius: '8px',
          marginTop: '2rem',

        }}>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
        </div>
      </StyledPageHeader>
    </Container>
  )
}

interface StyledIconProps {
  height: string;
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      text-align: center;
  }
`

const StyledIcon = styled.div<StyledIconProps>`
  font-size: 120px;
  height: ${props => props.height}px;
  line-height: 250px;
  text-align: center;
`

const StyledTitle = styled.h1`

  font-size: 36px;
  font-weight: 700;
  margin: 0 0 .5rem 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`

  font-size: 22px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
