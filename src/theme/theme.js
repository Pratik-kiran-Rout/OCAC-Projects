import React, { useState, useEffect, createContext, useContext } from 'react';
import './test.css';

// Create a context for theme
export const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeSwitcher = () => {
    // Get stored theme preference or default to false (light mode)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        // Apply the theme when component mounts and when theme changes
        document.body.classList.toggle('dark-theme', isDarkMode);
        document.body.classList.toggle('light-theme', !isDarkMode);
        // Save theme preference
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <div className="theme-switcher">
                <button onClick={toggleTheme} className="theme-button">
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>
        </ThemeContext.Provider>
    );
};

export default ThemeSwitcher;
