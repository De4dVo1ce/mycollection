import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import { Header, Paper } from '../../shared'
import { documentNames, Page } from '../AppBase'
import { useTheme } from '../AppBase/ThemeProvider'

interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  document.title = documentNames.settings

  const themeContext = useTheme()

  const onSwitch = (checked: boolean) => {
    checked ? themeContext.setDarkTheme() : themeContext.setLightTheme()
  }

  return (
    <Page>
      <Header text="Settings" variant="h4" />
      <Paper>
        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Switch
              checked={themeContext.isDark}
              onChange={(event) => onSwitch(event.target.checked)}
            />
          }
          label="Dark Mode"
          labelPlacement="start"
        />
      </Paper>
    </Page>
  )
}

export default Settings
