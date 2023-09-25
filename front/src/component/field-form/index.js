import React, { memo, useContext, useState, useRef } from 'react'
import './index.css'
import { ThemeContext } from '../../App'

function Component({ placeholder, button, onSubmit }) {
  const theme = useContext(ThemeContext)
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const handleChange = (e) => {
    setText(e.target.value)
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  const handleSubmit = () => {
    if (text.length === 0) return

    onSubmit ? onSubmit(text) : console.error('onSubmit prop is undefined')

    const textarea = textareaRef.current
    textarea.style.height = '50px'
    setText('')
  }

  const isDisabled = text.length === 0

  return (
    <div className="field-form">
      <textarea
        value={text}
        rows={2}
        placeholder={placeholder}
        className="field-form__field"
        onInput={handleChange}
        ref={textareaRef}
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
