import { useContext } from 'react'
import './index.css'
import { ThemeContext } from '../../App'
import Toggle from '../toggle'

export default function Component({ children }) {
  const theme = useContext(ThemeContext)

  return (
    <div className={`page page--${theme.value}`}>
      <Toggle />
      <div className={`page__section`}>{children}</div>
    </div>
  )
}
