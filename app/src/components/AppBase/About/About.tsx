import React from 'react'
import { Header, Paper } from '../../../shared'
import { documentNames } from '../appValues'
import { Page } from '../Page'

interface AboutProps {}
export const About: React.FC<AboutProps> = () => {
  document.title = documentNames.about

  return (
    <Page>
      <Header text="About" variant="h4" />
      <Paper>
        <Header text="Impressum" variant="h5" />
      </Paper>
    </Page>
  )
}

export default About
