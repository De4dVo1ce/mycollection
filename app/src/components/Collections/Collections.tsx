import { Add as AddIcon } from '@mui/icons-material'
import { Divider as MuiDivider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createUrlFor } from '../../createUrlFor'
import { Header, labels, Loading, messages, Paper } from '../../shared'
import { NothingHereDiv } from './Collections.styles'
import { CollectionTile } from './CollectionTile'
import { documentNames, Page } from '../AppBase'
import { useSnackbar } from '../AppBase/SnackbarProvider'
import { useGetCollections } from '../../connection/api'

interface CollectionsProps {}
const Collections: React.FC<CollectionsProps> = () => {
  document.title = documentNames.collections

  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()

  const { loading, collections } = useGetCollections(
    document.location.pathname,
    true,
    (status) => {
      setSnackbar(messages.SOMETHING_WENT_WRONG(status), 'error')
    }
  )

  const onCreateClick = () => {
    navigate(createUrlFor().collections.new)
  }

  return (
    <Page>
      <Header
        text={labels.HEADER_COLLECTIONS}
        variant="h4"
        primary={{
          type: 'button',
          props: {
            text: labels.BUTTON_CREATE,
            startIcon: <AddIcon />,
            onClick: onCreateClick,
          },
        }}
      />
      <Paper>
        {loading || !collections ? (
          <Loading />
        ) : collections.length > 0 ? (
          collections.map((collection, index) => (
            <div key={index}>
              <CollectionTile collection={collection} />
              {index < collections.length - 1 && (
                <MuiDivider
                  orientation="horizontal"
                  variant="middle"
                  sx={{ mx: 0, my: 2 }}
                />
              )}
            </div>
          ))
        ) : (
          <NothingHereDiv>{messages.COLLECTIONS_NOTHING_HERE}</NothingHereDiv>
        )}
      </Paper>
    </Page>
  )
}

export default Collections
