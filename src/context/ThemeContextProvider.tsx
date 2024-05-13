import React, {useEffect, useState} from 'react'
import { AppTheme, ThemeContext,  getDefaultTheme } from './theme'



function ThemeContextProvider({children}: {children: React.ReactNode}) {
  const [ theme, setTheme ] = useState<AppTheme>(getDefaultTheme());

  useEffect(()=> {
    console.log(theme);
    const el: HTMLLinkElement = document.getElementById('theme-link');
    el.href = `themes/lara-${theme}-teal/theme.css`;
    localStorage.setItem("theme", theme);
  }, [theme] )

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
  )
}

export default ThemeContextProvider
