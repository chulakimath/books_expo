import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { Themes } from "./colors";
export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Themes["LightTheme"]);
    useEffect(() => {
        const getTheme = async () => {
            
            try {
                const theme = await AsyncStorage.getItem("theme");
                if (theme) {
                    setTheme(Themes[theme]);
                } else {
                    setTheme(Themes["ForestTheme"]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTheme();
    }, [])

    const toggleTheme = async (themeKey) => {
        if (Themes[themeKey]) {
            setTheme(Themes[themeKey]);
            await AsyncStorage.setItem("theme", themeKey);
        } else {
            console.warn(`Theme '${themeKey}' not found in Themes.`);
        }
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;