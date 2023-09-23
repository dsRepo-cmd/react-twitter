import { useContext } from 'react'
import './index.css'
import { THEME_TYPE, ThemeContext } from '../../App'

export default function Component({ children }) {
  const theme = useContext(ThemeContext)

  return (
    <div
      style={{ background: theme.value === THEME_TYPE.DARK && '#979797' }}
      className="page"
    >
      {children}
    </div>
  )
}
