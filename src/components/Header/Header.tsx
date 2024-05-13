import React, { useContext } from 'react'
import { ThemeContext, getDefaultTheme, useTheme } from '../../context/theme'
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
function Header() {
    const [theme, setTheme] = useTheme();

    const set_theme = () => {
        if (theme==="dark") setTheme("light")
        else setTheme("dark")
    }

  return (
    <div>
      This is the header, {theme}
      <ToggleThemeButton></ToggleThemeButton>
    </div>
  )
}

export default Header
