import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createCollection } from '../../connection/api.collection'
import { createUrlFor } from '../../createUrlFor'
import { Collection, messages, statusCodes } from '../../shared'
import { useSnackbar } from '../AppBase/SnackbarProvider'
import { CollectionEditForm } from './CollectionEditForm/CollectionEditForm'

interface CollecitonNewProps {}

export const CollectionNew: React.FC<CollecitonNewProps> = () => {
  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()

  const [name, setName] = React.useState<string>('New Collection')
  const [description, setDescription] = React.useState<string>('')

  const onSaveCallback = React.useCallback(
    async (name: string, description: string, close: boolean) => {
      const newCollection: Collection = {
        name: name,
        description: description,
      } as Collection

      await createCollection(newCollection, (status, collection) => {
        if (collection) {
          switch (status) {
            case statusCodes.CREATED:
              setSnackbar(messages.COLLECTION_CREATED(name), 'success')
              navigate(
                close
                  ? createUrlFor().collections.withId(collection._id).page
                  : createUrlFor().collections.withId(collection._id).edit
              )
              break

            default:
              break
          }
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onSaveClick = () => {
    onSaveCallback(name, description, false)
  }

  const onSaveAndCloseClick = () => {
    onSaveCallback(name, description, true)
  }

  return (
    <CollectionEditForm
      isNew
      loading={false}
      name={name}
      description={description}
      setName={setName}
      setDescription={setDescription}
      columns={[]}
      setColumns={(columns) => {}}
      dialog={null}
      setDialog={(diaog) => {}}
      onSave={onSaveClick}
      onSaveAndClose={onSaveAndCloseClick}
      onClose={() => {}}
      onDelete={() => {}}
    />
  )
}

export default CollectionNew
