import { datastorePool } from '../../database/loadDatabases'
import { CollectionItem } from '../../database/datastores.types'

export const createCollectionItem = (
  collectionItem: CollectionItem,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.create(collectionItem, callback)
}

export const createMultipleCollectionItems = (
  collectionItems: Array<CollectionItem>,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.createMultiple(collectionItems, callback)
}

export const getAllCollectionItemsByCollectionId = (
  collection_id: string,
  callback: (err: Error, items: Array<CollectionItem>) => void
) => {
  datastorePool.collectionItem.getAllByCollectionId(collection_id, callback)
}

export const getCollectionItem = (
  item_id: string,
  callback: (err: Error, item: CollectionItem) => void
) => {
  datastorePool.collectionItem.get(item_id, callback)
}

export const removeItem = (item_id: string, callback: (err: Error) => void) => {
  datastorePool.collectionItem.remove(item_id, callback)
}

export const removeAllItemsByCollectionId = (
  collection_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.removeByCollectionId(collection_id, callback)
}
