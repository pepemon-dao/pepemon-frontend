import { useContext } from 'react'
import { Context } from '../contexts/PepemonProvider'

const usePepemon = () => {
  const [pepemon, dispatch] = useContext(Context)
  return pepemon
}

export default usePepemon
