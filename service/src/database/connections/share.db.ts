import { Share } from '../datastores.types'
import { DatabaseConnection } from './db'

export class ShareDatabase extends DatabaseConnection<Share> {
  constructor() {
    super('share')
  }

  getAllByUserId(
    user_id: string,
    callback?: (err: Error, docs: Array<Share>) => void
  ) {
    this.connection.find({ user_id: user_id }, {}, callback)
  }

  getAllByCollectionId(
    collection_id: string,
    callback?: (err: Error, docs: Array<Share>) => void
  ) {
    this.connection.find({ collection_id: collection_id }, {}, callback)
  }

  removeMultipleByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }

  removeMultipleByCollectionId(
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
