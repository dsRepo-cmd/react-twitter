import { memo, useContext, useState } from 'react'
import './index.css'
import { ThemeContext } from '../../App'

function Component({ placeholder, button, onSubmit }) {
  const [value, setValue] = useState('')

  const theme = useContext(ThemeContext)

  const handleChange = (e) => setValue(e.target.value)

  const handleSubmit = () => {
    if (value.length === 0) return null

    if (onSubmit) {
      onSubmit(value)
    } else {
      throw Error('onSubmit props is undefined')
    }

    setValue('')
  }

  const isDisabled = value.length === 0

  return (
    <div className="field-form">
      <textarea
        onChange={handleChange}
        value={value}
        rows={2}
        placeholder={placeholder}
        className="field-form__field"
      ></textarea>

      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className={`field-form__button field-form__button--${theme.value}`}
      >
        {button}
      </button>
    </div>
  )
}

export default memo(Component)
