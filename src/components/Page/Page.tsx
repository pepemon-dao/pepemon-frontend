import React from 'react'
import styled from 'styled-components'
// import Footer from '../Footer'

interface PageProps {
    image?: any,
    repeat?: string,
    color?: string,
    size?: string,
    scroll?: boolean,
}

const Page: React.FC<PageProps> = ({ image, repeat, color, size, scroll, children }) => (
  <StyledPage>
      <StyledMain image={image} repeat={repeat} color={color} size={size} scroll={scroll}>{children}</StyledMain>
      {/*<Footer />*/}
  </StyledPage>
)

interface StyledMainProps {
    image?: any,
    repeat?: string,
    color?: string,
    size?: string,
    scroll?: boolean,
}

const StyledPage = styled.div`
    width: 100%;
`

const StyledMain = styled.div<StyledMainProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
    background-size: auto ${props => props.size ? props.size : '100vh'};
    background-attachment: ${props => props.scroll ? 'scroll': 'fixed'};
`

export default Page
