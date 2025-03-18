import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {ThemeContextProps} from "../context/helper";

export const useTheme = (): ThemeContextProps => {
    const context = useContext<ThemeContextProps | undefined>(ThemeContext);
    if (!context) {
        throw new Error("UseTheme must be used within context provider");
    }
    return context;
};
