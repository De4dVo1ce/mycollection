import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCollection, useGetColumns } from '../../connection/api'
import {
  deleteCollection,
  updateCollection,
} from '../../connection/api.collection'
import { createUrlFor } from '../../createUrlFor'
import {
  Collection,
  CollectionColumn,
  ConfirmDeleteDialog,
  labels,
  messages,
  statusCodes,
} from '../../shared'
import { useSnackbar } from '../AppBase/SnackbarProvider'
import { CollectionEditForm } from './CollectionEditForm/CollectionEditForm'

interface CollectionEditProps {}

export const CollectionEdit: React.FC<CollectionEditProps> = () => {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()

  const [dialog, setDialog] = React.useState<React.ReactNode>(null)

  const [name, setName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')

  const [modColumns, setModColumns] = React.useState<
    Array<CollectionColumn> | undefined
  >(undefined)

  const { collection } = useGetCollection(
    document.location.pathname,
    collectionId ?? '',
    false,
    (status) => {}
  )

  const { columns } = useGetColumns(
    document.location.pathname,
    collection?._id,
    () => {},
    () => {},
    undefined,
    () => {},
    false,
    (status) => {}
  )

  const setCollectionData = React.useCallback(
    async () => {
      if (collection && modColumns) {
        const newCollection = {
          ...collection,
          name: name,
          description: description,
        } as Collection
        await updateCollection(newCollection, modColumns, (status) => {
          switch (status) {
            case statusCodes.OK:
              setSnackbar(
                messages.COLLECTION_SAVED(newCollection.name),
                'success'
              )
              break
            default:
              break
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, modColumns, name, description, columns]
  )

  const deleteCollectionData = React.useCallback(
    () => {
      if (collection) {
        deleteCollection(collection._id, (status) => {
          switch (status) {
            case statusCodes.OK:
              setSnackbar(
                messages.COLLECTION_DELETED(collection?.name ?? ''),
                'success'
              )
              break

            default:
              break
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection]
  )

  React.useEffect(
    () => {
      if (collection) {
        setName(collection.name)
        setDescription(collection.description)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection]
  )

  React.useEffect(() => {
    if (columns) {
      setModColumns(columns)
    }
  }, [columns])

  const onSaveClick = () => {
    if (collection && columns) {
      setCollectionData()
    }
  }

  const onCloseClick = () => {
    if (collection && columns) {
      navigate(createUrlFor().collections.withId(collection._id).page)
    }
  }

  const onSaveAndCloseClick = () => {
    onSaveClick()
    onCloseClick()
  }

  const onDeleteClick = () => {
    const onCloseDialog = () => {
      setDialog(null)
    }
    const onCancelDelete = () => {
      setDialog(null)
    }
    const onConfirmDelete = () => {
      deleteCollectionData()
      setDialog(null)
      navigate(createUrlFor().collections.page, { replace: true })
    }

    setDialog(
      <ConfirmDeleteDialog
        title={labels.HEADER_COLLECTION_DELETE}
        message={messages.COLLECTION_DELETE_CONFIRM(collection?.name ?? '')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        onClose={onCloseDialog}
      />
    )
  }

  return (
    <CollectionEditForm
      isNew={false}
      loading={!collection || !columns}
      name={name}
      description={description}
      setName={setName}
      setDescription={setDescription}
      columns={modColumns ?? []}
      setColumns={setModColumns}
      dialog={dialog}
      setDialog={setDialog}
      onSave={onSaveClick}
      onClose={onCloseClick}
      onSaveAndClose={onSaveAndCloseClick}
      onDelete={onDeleteClick}
    />
  )
}

export default CollectionEdit
