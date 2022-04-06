import React from 'react'
import { Paper, Header } from '../../shared'
import { Page, documentNames } from '../AppBase'

interface SharedProps {}
const Shared: React.FC<SharedProps> = () => {
  document.title = documentNames.shared

  return (
    <Page>
      <Header text="Shared" variant="h4" />
      <Paper></Paper>
    </Page>
  )
}

export default Shared
