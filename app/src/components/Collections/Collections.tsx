import { Add as AddIcon } from '@mui/icons-material'
import { Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCollections } from '../../connection/api.collection'
import { createUrlFor } from '../../createUrlFor'
import { Header, Loading, Paper } from '../../shared'
import { Collection, statusCodes } from '../../shared'
import { NothingHereDiv } from './Collections.styles'
import { CollectionTile } from './CollectionTile'
import { documentNames, NOTHING_HERE_COLLECTIONS, Page } from '../AppBase'
import { useSnackbar } from '../AppBase/SnackbarProvider'

interface CollectionsProps {}
const Collections: React.FC<CollectionsProps> = () => {
  document.title = documentNames.collections

  const [collections, setCollections] = React.useState<
    Array<Collection> | undefined
  >(undefined)

  const navigate = useNavigate()
  const snackbar = useSnackbar()

  const getCollectionsList = React.useCallback(
    async () => {
      await getCollections((status, collections) => {
        switch (status) {
          case statusCodes.OK:
            setCollections(collections)
            break
          case statusCodes.UNAUTHORIZED:
            navigate(createUrlFor().logout)
            break
          default:
            snackbar.setSnackbar('Something went wrong.', 'error')
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      getCollectionsList()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Page>
      <Header
        text="Collections"
        variant="h4"
        primary={{
          type: 'button',
          props: {
            startIcon: <AddIcon />,
            children: 'Create',
          },
        }}
      />
      <Paper>
        {collections ? (
          collections.length > 0 ? (
            collections.map((collection, index) => (
              <div key={index}>
                <CollectionTile collection={collection} />
                {index < collections.length - 1 && (
                  <Divider
                    orientation="horizontal"
                    variant="middle"
                    sx={{ mx: 0, my: 2 }}
                  />
                )}
              </div>
            ))
          ) : (
            <NothingHereDiv>{NOTHING_HERE_COLLECTIONS}</NothingHereDiv>
          )
        ) : (
          <Loading />
        )}
      </Paper>
    </Page>
  )
}

export default Collections
