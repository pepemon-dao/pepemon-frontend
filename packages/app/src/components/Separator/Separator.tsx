import React, { useMemo } from 'react'
import styled from 'styled-components'

type SeparatorOrientation = 'horizontal' | 'vertical'

interface SeparatorProps {
  orientation?: SeparatorOrientation,
  stretch?: boolean
}

const Separator: React.FC<SeparatorProps> = ({ orientation, stretch }) => {
  const Content = useMemo(() => {
    return <StyledSeparator boxShadow={'true'} orientation={orientation} />
  }, [orientation])

  if (stretch) {
    return (
      <div style={{ alignSelf: 'stretch' }}>
        {Content}
      </div>
    )
  }

  return Content
}

interface StyledSeparatorProps {
  boxShadow: string,
  orientation?: SeparatorOrientation
}

const StyledSeparator = styled.div<StyledSeparatorProps>`

  box-shadow: ${props => props.boxShadow};
  height: ${props => props.orientation === 'vertical' ? '100%' : '1px'};
  width: ${props => props.orientation === 'vertical' ? '1px' : '100%'};
`

export default Separator
