import React from 'react'
import { Paper, Header } from '../../shared'
import { Page, documentNames } from '../AppBase'

interface ProfileProps {}
const Profile: React.FC<ProfileProps> = () => {
  document.title = documentNames.profile

  return (
    <Page>
      <Header text="Profile" variant="h4" />
      <Paper></Paper>
    </Page>
  )
}

export default Profile
