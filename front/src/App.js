import React, { createContext, useMemo, useState } from 'react'
import Page from './component/page'
import PostList from './container/post-list'
import ChangeTheme from './component/change-theme'

export const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const ThemeContext = createContext(null)

function App() {
  const [currentTheme, setTheme] = useState(THEME_TYPE.DARK)

  const handleChangeTheme = () => {
    setTheme((prewTheme) => {
      if (prewTheme === THEME_TYPE.DARK) {
        return THEME_TYPE.LIGHT
      } else {
        return THEME_TYPE.DARK
      }
    })
  }

  const theme = useMemo(
    () => ({ value: currentTheme, toggle: handleChangeTheme }),
    [currentTheme],
  )
  return (
    <ThemeContext.Provider value={theme}>
      <Page>
        <ChangeTheme />
        <PostList />
      </Page>
    </ThemeContext.Provider>
  )
}

export default App
