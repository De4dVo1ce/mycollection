import React from 'react'
import AppBase from '../AppBase/AppBase'
import { navigationEntries } from '../../navigationEntries'
import { routingEntries } from '../../routingEntries'
import { documentNames } from '../AppBase'

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  document.title = documentNames.app

  return (
    <AppBase
      navigationEntries={navigationEntries}
      customRoutes={routingEntries}
    />
  )
}

export default App
