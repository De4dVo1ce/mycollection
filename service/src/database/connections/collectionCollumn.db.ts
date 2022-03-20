import { CollectionCollumn } from '../datastores.types'
import { DatabaseConnection } from './db'

export class CollectionCollumnDatabase extends DatabaseConnection<CollectionCollumn> {
  constructor() {
    super('collectionCollumn')
  }

  getAllByCollectionId(
    collection_id: string,
    callback?: (err: Error, docs: Array<CollectionCollumn>) => void
  ) {
    this.connection.find({ collection_id: collection_id }, {}, callback)
  }

  updateByCollectionId(
    collumn_id: string,
    collection_id: string,
    collumn: CollectionCollumn,
    callback: (err: Error, numUpdated: number) => void
  ) {
    this.connection.update(
      { _id: collumn_id, collection_id: collection_id },
      { $set: { ...collumn } },
      {},
      callback
    )
  }

  removeByCollectionId(
    collumn_id: string,
    collection_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { _id: collumn_id, collection_id: collection_id },
      { multi: false },
      callback
    )
  }

  removeAllByCollectionId(
    collection_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { collection_id: collection_id },
      { multi: true },
      callback
    )
  }
}
