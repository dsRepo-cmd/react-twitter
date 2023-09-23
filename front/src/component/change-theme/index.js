import { memo, useContext } from 'react'
import './index.css'
import { ThemeContext } from '../../App'

function ChangeTheme() {
  const theme = useContext(ThemeContext)

  return (
    <>
      <button
        onClick={theme.toggle}
        className={`field-form__button field-form__button--${theme.value}`}
      >
        Change theme
      </button>
    </>
  )
}

export default memo(ChangeTheme)
