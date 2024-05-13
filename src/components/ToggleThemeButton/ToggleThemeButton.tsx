import React, { useMemo } from 'react'
import { useTheme } from '../../context/theme'
import { Button } from 'primereact/button';

function ToggleThemeButton({className}: {className: string}) {
    const [theme, setTheme] = useTheme();
    
    const icon = useMemo(()=> {
        return theme == "dark" ? "🌞" : "🌙"
    }, [theme])

    const toggle = () => {
        if (theme=="dark") setTheme("light")
        if (theme=="light") setTheme("dark")
    }
    return (
        <Button className={`${className}`} severity="secondary" onClick={toggle}>{icon}</Button>
    )
}

export default ToggleThemeButton
