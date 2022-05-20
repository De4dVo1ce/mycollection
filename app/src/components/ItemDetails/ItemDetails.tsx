import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetColumns, useGetItem } from '../../connection/api'
import { deleteCollectionItem } from '../../connection/api.items'
import { createUrlFor } from '../../createUrlFor'
import {
  CollectionItem,
  ConfirmDeleteDialog,
  labels,
  Loading,
  messages,
  statusCodes,
} from '../../shared'
import { useSnackbar } from '../AppBase/SnackbarProvider'
import ItemDetailsForm from './ItemDetailsForm'

interface ItemDetailsProps {}

export const ItemDetails: React.FC<ItemDetailsProps> = () => {
  const { collectionId, itemId } = useParams()
  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()

  const [dialog, setDialog] = React.useState<React.ReactNode>(null)

  const [modItem, setModItem] = React.useState<CollectionItem | undefined>(
    undefined
  )

  const onChangeProperty = (propName: string, newValue: string) => {
    const temp: CollectionItem = { ...modItem } as CollectionItem
    temp[propName] = newValue

    setModItem({ ...temp })
  }

  const { columns } = useGetColumns(
    document.location.pathname,
    collectionId,
    () => {},
    () => {},
    '',
    () => {},
    false,
    (status) => {}
  )

  const { item } = useGetItem(
    document.location.pathname,
    collectionId ?? '',
    itemId ?? '',
    false,
    (status) => {}
  )

  React.useEffect(
    () => {
      setModItem(item)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item]
  )

  const deleteItemData = React.useCallback(
    () => {
      if (collectionId && itemId) {
        deleteCollectionItem(collectionId, itemId, (status) => {
          switch (status) {
            case statusCodes.OK:
              setSnackbar(messages.ITEM_DELETED(itemId), 'success')
              navigate(
                createUrlFor().collections.withId(collectionId ?? '').page,
                { replace: true }
              )
              break

            default:
              break
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, itemId]
  )

  const onSaveClick = () => {}

  const onCloseClick = () => {
    navigate(createUrlFor().collections.withId(collectionId ?? '').page)
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
      deleteItemData()
      setDialog(null)
      onCloseClick()
    }

    setDialog(
      <ConfirmDeleteDialog
        title={labels.HEADER_COLLECTION_DELETE}
        message={messages.ITEM_DELETE_CONFIRM(modItem?._id ?? '')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        onClose={onCloseDialog}
      />
    )
  }

  return !modItem || !columns ? (
    <Loading />
  ) : (
    <ItemDetailsForm
      item={modItem}
      columns={columns}
      isNew={false}
      dialog={dialog}
      setDialog={setDialog}
      onSave={onSaveClick}
      changeProperty={onChangeProperty}
      onClose={onCloseClick}
      onSaveAndClose={onSaveAndCloseClick}
      onDelete={onDeleteClick}
    />
  )
}

export default ItemDetails
