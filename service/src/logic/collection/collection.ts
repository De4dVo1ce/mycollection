import { Collection } from '../../database/datastores.types'
import { datastorePool } from '../../database/loadDatabases'

export const createCollection = (
  collection: Collection,
  callback: (err: Error, collection?: Collection) => void
) => {
  datastorePool.collection.create(collection, callback)
}

export const getCollection = (
  collection_id: string,
  callback: (err: Error, collection: Collection) => void
) => {
  datastorePool.collection.get(collection_id, callback)
}

export const getAllCollectionsByUserId = (
  user_id: string,
  callback: (err: Error, collections: Array<Collection>) => void
) => {
  datastorePool.collection.getAllByUserId(user_id, callback)
}

export const updateCollection = (
  collection_id: string,
  collection: Collection,
  callback: (err: Error, numUpdated?: number) => void
) => {
  datastorePool.collection.update(collection_id, collection, callback)
}

export const removeCollection = (
  collection_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.collection.remove(collection_id, callback)
}

export const removeCollectionsByUserId = (
  user_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.collection.removeByUserId(user_id, callback)
}
