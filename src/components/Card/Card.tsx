import React from 'react'
import styled from 'styled-components'

interface CardProps {
    children?: React.ReactNode,
    disabled?: boolean,
    boosted?: boolean,
}

const Card: React.FC<CardProps> = (
    {
        children ,
        disabled,
        boosted,
    }) => {
    return disabled || boosted ? (disabled ? <StyledDisabledCard>{children}</StyledDisabledCard> :
        <StyledBoostedCard>{children}</StyledBoostedCard>) : <StyledCard>{children}</StyledCard>
}

const StyledCard = styled.div`
  background: ${(props) => props.theme.color.gray[300]};
  border: 1px solid ${(props) => props.theme.color.gray[300]}ff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.gray[300]};
  display: flex;
  flex: 1;
  flex-direction: column;
`

const StyledDisabledCard = styled.div`
  background: ${(props) => props.theme.color.gray[300]};
  border: 1px solid ${(props) => props.theme.color.gray[300]}ff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.gray[300]};
  display: flex;
  flex: 1;
  flex-direction: column;
  opacity: 0.4;
`

const StyledBoostedCard = styled.div`
  background: ${(props) => props.theme.color.gray[300]};
  border-radius: 12px;
  margin: -.3rem;
  box-shadow: 0 0 10px rgb(239,0,111,.9);
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
