import { datastorePool } from '../../database/loadDatabases'
import {
  CollectionColumn,
  CollectionItem,
} from '../../database/datastores.types'
import {
  createMultipleCollectionItems,
  getAllCollectionItemsByCollectionId,
  removeAllItemsByCollectionId,
} from './collectionItem'
import { areColumnsEqual, areEqual } from '../areEqual'

export const createColumn = (
  collectionColumn: CollectionColumn,
  callback: (err: Error) => void
) => {
  datastorePool.collectionColumn.create(collectionColumn, callback)
}

export const createMultipleColumns = (
  collectionColumns: Array<CollectionColumn>,
  callback: (err: Error) => void
) => {
  datastorePool.collectionColumn.createMultiple(collectionColumns, callback)
}

export const getColumn = (
  column_id: string,
  callback: (err: Error, doc: CollectionColumn) => void
) => {
  datastorePool.collectionColumn.get(column_id, callback)
}

export const getMultipleColumnsByCollectionId = (
  collection_id: string,
  callback: (err: Error, docs: Array<CollectionColumn>) => void
) => {
  datastorePool.collectionColumn.getAllByCollectionId(collection_id, callback)
}

export const updateMultipleColumns = (
  collection_id: string,
  new_columns: Array<CollectionColumn>,
  callback: (err: Error) => void
) => {
  getMultipleColumnsByCollectionId(collection_id, (err, columns) => {
    if (err) {
      callback(err)
      return
    }

    if (areColumnsEqual(new_columns, columns)) {
      callback(undefined)
      return
    }

    removeColumnsByCollectionId(collection_id, (err) => {
      if (err) {
        callback(err)
        return
      }

      createMultipleColumns(
        new_columns.map((column) => {
          column.collection_id = collection_id
          return column
        }),
        (err) => {
          if (err) {
            callback(err)
            return
          }

          getAllCollectionItemsByCollectionId(
            collection_id,
            '_id',
            '',
            (err, items) => {
              if (err) {
                callback(err)
                return
              }

              const newItems: Array<CollectionItem> = []
              items.forEach((item) => {
                const newItem: CollectionItem = {
                  _id: item._id,
                  collection_id: item.collection_id,
                  created: item.created,
                } as CollectionItem
                new_columns.forEach((column) => {
                  let value = item[column.name] ?? ''
                  if (
                    column.type === 'enum' &&
                    !column.enum.includes(`${value}`)
                  ) {
                    value = ''
                  }
                  newItem[column.name] = value
                })

                newItems.push(newItem)
              })

              removeAllItemsByCollectionId(collection_id, (err) => {
                if (err) {
                  callback(err)
                  return
                }

                createMultipleCollectionItems(collection_id, newItems, callback)
              })
            }
          )
        }
      )
    })
  })
}

export const removeColumn = (
  column_id: string,
  collection_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.collectionColumn.removeWithCollectionId(
    column_id,
    collection_id,
    callback
  )
}

export const removeColumnsByUserId = (
  user_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.collectionColumn.removeAllByUserId(user_id, callback)
}

export const removeColumnsByCollectionId = (
  collection_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.collectionColumn.removeAllByCollectionId(
    collection_id,
    callback
  )
}
