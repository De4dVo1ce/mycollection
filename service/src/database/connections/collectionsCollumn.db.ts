import Datastore = require('nedb')
import { CollectionCollumn } from '../datastores.types'
import { DatabaseConnection } from './databaseConnection'

export class CollectionCollumnDatabase extends DatabaseConnection<CollectionCollumn> {
  constructor() {
    super('collectionCollumn')
  }

  removeByCollectionId(
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
