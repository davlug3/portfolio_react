import React, { useMemo } from 'react'
import { useTheme } from '../../context/theme'

function ToggleThemeButton() {
    const [theme, setTheme] = useTheme();
    
    const icon = useMemo(()=> {
        return theme == "dark" ? "sun" : "moon"
    }, [theme])

    const toggle = () => {
        if (theme=="dark") setTheme("light")
        if (theme=="light") setTheme("dark")
    }
    return (
        <button onClick={toggle}>{icon}</button>
    )
}

export default ToggleThemeButton
