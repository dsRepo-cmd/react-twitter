import { memo, useContext } from 'react'
import './index.css'
import { ThemeContext } from '../../App'

function ToggleTheme() {
  const theme = useContext(ThemeContext)

  return (
    <>
      <div className="container">
        <div className={`btn btn--${theme.value}`}>
          <div
            onClick={theme.toggle}
            className={`btn-box btn-box--${theme.value}`}
          >
            <div className={`ball ball--${theme.value}`}></div>
            <div className="scenary">
              <div className="sun"></div>
              <div className="moon"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ToggleTheme)
