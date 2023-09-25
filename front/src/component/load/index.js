import { useContext } from 'react'
import './index.css'
import { ThemeContext } from '../../App'

export function Alert({ message, status = 'default' }) {
  const theme = useContext(ThemeContext)
  return (
    <div className={`alert alert--${theme.value} alert--${status}`}>
      {message}
    </div>
  )
}

export function Loader() {
  return <div className="loader"></div>
}

export function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
      <div className="skeleton__item"></div>
    </div>
  )
}
