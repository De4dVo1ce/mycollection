import { PaletteOptions } from '@mui/material'
import React from 'react'
import { getFromStorage, setToStorage } from '../../../shared'
import { themes } from '../appValues'
import { STORAGE_KEY_THEME } from '../resources'

const getThemeSettingFromStorage = (): PaletteOptions => {
  const storageSetting = getFromStorage(STORAGE_KEY_THEME)
  return storageSetting ? (storageSetting as PaletteOptions) : themes.light
}

interface ThemeContextType {
  theme: PaletteOptions
  isDark: boolean
  setLightTheme: VoidFunction
  setDarkTheme: VoidFunction
}

export const ThemeContext = React.createContext<ThemeContextType>(null!)

interface ThemeProviderProps {}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<PaletteOptions>(
    getThemeSettingFromStorage()
  )
  const [isDark, setIsDark] = React.useState<boolean>(theme.mode === 'dark')

  const setLightTheme = () => {
    setTheme(themes.light)
    setIsDark(false)
    setToStorage(STORAGE_KEY_THEME, themes.light)
  }

  const setDarkTheme = () => {
    setTheme(themes.dark)
    setIsDark(true)
    setToStorage(STORAGE_KEY_THEME, themes.dark)
  }

  const value: ThemeContextType = { theme, isDark, setLightTheme, setDarkTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

export const useTheme = () => {
  return React.useContext(ThemeContext)
}
