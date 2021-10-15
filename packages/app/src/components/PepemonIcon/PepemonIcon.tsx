import React from 'react'

interface PepemonIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const PepemonIcon: React.FC<PepemonIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    {/*🍣*/}
      <img src={'pepeballImg'} style={{ height: 32 }} alt="pepeballImg"/>
  </span>
)

export default PepemonIcon
