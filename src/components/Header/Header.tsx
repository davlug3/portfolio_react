import React, { useContext } from 'react'
import { ThemeContext, getDefaultTheme, useTheme } from '../../context/theme'
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
function Header() {


  return (
    <div className='flex align-items-center surface-ground p-1 '>
      <div className='font-bold'>THIS IS THE HEADER</div>
      <ToggleThemeButton className='p-1 mr-0 ml-auto'></ToggleThemeButton>
    </div>
  )
}

export default Header
