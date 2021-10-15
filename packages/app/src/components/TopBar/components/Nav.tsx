import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/store">
        Store
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/events">
        Events
      </StyledLink>
      {/*<StyledLink exact activeClassName="active" to="/pepemon-dego-promo">*/}
      {/*    Dego Promo*/}
      {/*</StyledLink>*/}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    justify-content: center;
    padding-top: .5rem;
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color[2]};
  font-size: 26px;
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color[1]};
  }
  &.active {
    color: ${(props) => props.theme.color[1]};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    font-size: 22px;
  }
`

export default Nav
