import { datastorePool } from '../../database/loadDatabases'
import { CollectionItem } from '../../database/datastores.types'
import { getCollection, updateCollection } from './collection'

export const createCollectionItem = (
  collection_id: string,
  collectionItem: CollectionItem,
  callback: (err: Error, item?: CollectionItem) => void
) => {
  const newItem = {
    ...collectionItem,
    collection_id: collection_id,
  } as CollectionItem

  for (var prop in newItem) {
    if (!newItem[prop]) {
      newItem[prop] = ''
    }
  }

  datastorePool.collectionItem.create(newItem, (err, item) => {
    if (err) {
      callback(err)
      return
    }

    getCollection(collection_id, (err, collection) => {
      if (err) {
        callback(err)
        return
      }

      updateCollection(
        collection._id,
        { ...collection, count: collection.count + 1 },
        (err) => {
          if (err) {
            callback(err)
            return
          }

          callback(undefined, item)
        }
      )
    })
  })
}

export const createMultipleCollectionItems = (
  collection_id: string,
  collectionItems: Array<CollectionItem>,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.createMultiple(
    collectionItems.map((item) => {
      item.collection_id = collection_id
      return item
    }),
    callback
  )
}

export const getAllCollectionItemsByCollectionId = (
  collection_id: string,
  prop: string,
  search: string,
  callback: (err: Error, items: Array<CollectionItem>) => void
) => {
  datastorePool.collectionItem.getAllByCollectionId(
    collection_id,
    prop,
    search,
    callback
  )
}

export const getCollectionItem = (
  item_id: string,
  callback: (err: Error, item: CollectionItem) => void
) => {
  datastorePool.collectionItem.get(item_id, callback)
}

export const updateCollectionItem = (
  item_id: string,
  item: CollectionItem,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.update(item_id, item, callback)
}

export const removeItem = (item_id: string, callback: (err: Error) => void) => {
  datastorePool.collectionItem.remove(item_id, callback)
}

export const removeAllItemsByUserId = (
  user_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.removeAllByUserId(user_id, callback)
}

export const removeAllItemsByCollectionId = (
  collection_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.collectionItem.removeByCollectionId(collection_id, callback)
}
