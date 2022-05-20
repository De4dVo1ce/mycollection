import React from 'react'
import { Paper, Header } from '../../shared'
import { ComingSoonText } from '../../shared/components/ComingSoonText'
import { Page, documentNames } from '../AppBase'

interface SharedProps {}
const Shared: React.FC<SharedProps> = () => {
  document.title = documentNames.shared

  return (
    <Page>
      <Header text="Shared" variant="h4" />
      <Paper>
        <ComingSoonText />
      </Paper>
    </Page>
  )
}

export default Shared
