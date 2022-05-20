import React from 'react'
import { Paper, Header } from '../../shared'
import { ComingSoonText } from '../../shared/components/ComingSoonText'
import { Page, documentNames } from '../AppBase'

interface ProfileProps {}
const Profile: React.FC<ProfileProps> = () => {
  document.title = documentNames.profile

  return (
    <Page>
      <Header text="Profile" variant="h4" />
      <Paper>
        <ComingSoonText />
      </Paper>
    </Page>
  )
}

export default Profile
