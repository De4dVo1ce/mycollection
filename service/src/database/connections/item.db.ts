import { CollectionItem } from '../datastores.types'
import { DatabaseConnection } from './db'

export class ItemDatabase extends DatabaseConnection<CollectionItem> {
  constructor() {
    super('item')
  }

  getAllByCollectionId(
    collection_id: string,
    callback?: (err: Error, docs: Array<CollectionItem>) => void
  ) {
    this.connection.find({ collection_id: collection_id }, {}, callback)
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

  removeAllByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }
}
