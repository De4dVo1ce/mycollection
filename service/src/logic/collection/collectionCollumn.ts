import { datastorePool } from '../../database/loadDatabases'
import { CollectionCollumn } from '../../database/datastores.types'

export const createCollectionCollumn = (
  collectionCollumn: CollectionCollumn,
  callback: (err: Error) => void
) => {
  datastorePool.collectionCollumn.create(collectionCollumn, callback)
}

export const createMultipleCollectionCollumns = (
  collectionCollumns: Array<CollectionCollumn>,
  callback: (err: Error) => void
) => {
  datastorePool.collectionCollumn.createMultiple(collectionCollumns, callback)
}

export const getCollectionCollumn = (
  collumn_id: string,
  callback: (err: Error, doc: CollectionCollumn) => void
) => {
  datastorePool.collectionCollumn.get(collumn_id, callback)
}

export const getCollumnsByCollectionId = (
  collection_id: string,
  callback: (err: Error, docs: Array<CollectionCollumn>) => void
) => {
  datastorePool.collectionCollumn.getAllByCollectionId(collection_id, callback)
}

export const updateCollumnByCollectionId = (
  collumn_id: string,
  collection_id: string,
  collumn: CollectionCollumn,
  callback: (err: Error, numUpdated?: number) => void
) => {
  datastorePool.collectionCollumn.updateByCollectionId(
    collumn_id,
    collection_id,
    collumn,
    callback
  )
}

export const removeCollumn = (
  collumn_id: string,
  collection_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.collectionCollumn.removeByCollectionId(
    collumn_id,
    collection_id,
    callback
  )
}
