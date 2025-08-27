import { useCallback, useState } from "react";
import { useTheme } from "next-themes";

export const useThemes = () => {
    const { theme, setTheme } = useTheme();
    const [checkToggle, setCheckToggle] = useState(false);
    const iconVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
    };

    const toggleTheme = useCallback(() => {
        setCheckToggle(!checkToggle);
        setTheme(theme === "dark" ? "light" : "dark");
    }, [checkToggle, setCheckToggle, setTheme, theme]);

    return { theme, setTheme, toggleTheme, checkToggle, iconVariants };
};
