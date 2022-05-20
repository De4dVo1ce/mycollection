import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCollectionColumns } from '../../connection/api.columns'
import { createCollectionItem } from '../../connection/api.items'
import { createUrlFor } from '../../createUrlFor'
import {
  CollectionColumn,
  CollectionItem,
  Loading,
  statusCodes,
} from '../../shared'
import ItemDetailsForm from './ItemDetailsForm'

interface NewItemProps {}

export const NewItem: React.FC<NewItemProps> = () => {
  const { collectionId, itemId } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = React.useState<CollectionItem>({} as CollectionItem)
  const [columns, setColumns] = React.useState<
    Array<CollectionColumn> | undefined
  >(undefined)

  const onChangeProperty = (propName: string, newValue: string) => {
    const temp: CollectionItem = { ...item } as CollectionItem
    temp[propName] = newValue

    setItem({ ...temp })
  }

  const getCollectionColumnsData = React.useCallback(
    async (collectionId: string) => {
      await getCollectionColumns(collectionId, (status, columns) => {
        switch (status) {
          case statusCodes.OK:
            setColumns(columns)
            break

          default:
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const saveItemCallback = React.useCallback(
    () => {
      createCollectionItem(collectionId ?? '', item, (status, item) => {
        switch (status) {
          case statusCodes.CREATED:
            if (item) {
              navigate(
                createUrlFor()
                  .collections.withId(item.collection_id)
                  .items.withId(item._id)
              )
            }
            break

          default:
            alert('MEEP')
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      getCollectionColumnsData(collectionId ?? '')
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, itemId]
  )

  const onSaveClick = () => {
    if (collectionId) {
      saveItemCallback()
    }
  }

  const onCloseClick = () => {
    navigate(createUrlFor().collections.withId(collectionId ?? '').page)
  }

  const onSaveAndCloseClick = () => {
    if (collectionId) {
      onSaveClick()
      onCloseClick()
    }
  }

  return !item || !columns ? (
    <Loading />
  ) : (
    <ItemDetailsForm
      item={item}
      columns={columns}
      isNew={true}
      onSave={onSaveClick}
      dialog={null}
      setDialog={(dialog) => {}}
      changeProperty={onChangeProperty}
      onClose={onCloseClick}
      onSaveAndClose={onSaveAndCloseClick}
      onDelete={() => {}}
    />
  )
}

export default NewItem
