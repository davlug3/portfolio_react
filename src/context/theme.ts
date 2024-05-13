import { createContext, useContext } from "react";

export type AppTheme = "light" | "dark";

export const getDefaultTheme = ():  AppTheme =>  {
    let theme : AppTheme = "light"
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "dark" 
    }

    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") return "dark"
        if (localStorage.getItem("theme") == "light") return "light"
    }
    else {
        return theme
    }
}

export const ThemeContext = createContext<[AppTheme,React.Dispatch<React.SetStateAction<AppTheme>> ] | null>(null);


export const useTheme = () => {
    const themeContext = useContext(ThemeContext)
    if (!themeContext) {
        throw new Error("useTheme has to be declared within theme provider");
    }

    return themeContext
}