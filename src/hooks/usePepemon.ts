import { useContext } from 'react'
import { Context } from '../contexts/PepemonProvider'

const usePepemon = () => {
  const [pepemon] = useContext(Context)
  return pepemon
}

export default usePepemon
