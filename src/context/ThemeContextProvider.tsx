import React, {useState} from 'react'
import { AppTheme, ThemeContext,  getDefaultTheme } from './theme'



function ThemeContextProvider({children}: {children: React.ReactNode}) {
  const [ theme, setTheme ] = useState<AppTheme>(getDefaultTheme());

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
  )
}

export default ThemeContextProvider
