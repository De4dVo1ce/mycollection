import { datastorePool } from '../../database/loadDatabases'
import { CollectionColumn } from '../../database/datastores.types'

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
  columns: Array<CollectionColumn>,
  callback: (err: Error, numUpdated?: number) => void
) => {
  removeColumnsByCollectionId(collection_id, (err) => {
    if (err) {
      callback(err)
      return
    }

    createMultipleColumns(
      columns.map((column) => {
        column.collection_id = collection_id
        return column
      }),
      (err) => {
        if (err) {
          callback(err)
          return
        }
      }
    )
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
