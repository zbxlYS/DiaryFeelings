// context/themeContext.js
import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import  { ReactNode } from 'react';
interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const defaultContextValue: ThemeContextType = {
  theme: 'light',
  setTheme: () => {} 
};

const ThemeContext = createContext(defaultContextValue);
interface ThemeProviderProps {
    children: ReactNode;
  }

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
