import React, {createContext, useState, ReactNode, useEffect} from "react";
import {Theme, ThemeContextProps} from "./helper";

export const ThemeContext = createContext<ThemeContextProps | undefined>(
    undefined
);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>("dark");
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        document.querySelector("html")?.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{theme, toggleTheme, isSidebarVisible, toggleSidebar}}
        >
            {children}
        </ThemeContext.Provider>
    );
};
