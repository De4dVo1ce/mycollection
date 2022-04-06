import { CollectionColumn } from '../datastores.types'
import { DatabaseConnection } from './db'

export class ColumnDatabase extends DatabaseConnection<CollectionColumn> {
  constructor() {
    super('column')
  }

  getAllByCollectionId(
    collection_id: string,
    callback?: (err: Error, docs: Array<CollectionColumn>) => void
  ) {
    this.connection.find({ collection_id: collection_id }, {}, callback)
  }

  updateWithCollectionId(
    column_id: string,
    collection_id: string,
    column: CollectionColumn,
    callback: (err: Error, numUpdated: number) => void
  ) {
    const dateTime = Date.now()
    this.connection.update(
      { _id: column_id, collection_id: collection_id },
      { $set: { ...column, modified: dateTime } },
      {},
      callback
    )
  }

  removeWithCollectionId(
    column_id: string,
    collection_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { _id: column_id, collection_id: collection_id },
      { multi: false },
      callback
    )
  }

  removeAllByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
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
