import Datastore = require('nedb')
import { Share } from '../datastores.types'
import { DatabaseConnection } from './databaseConnection'

export class SharedDatabase extends DatabaseConnection<Share> {
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

  removeMultipleSharesByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }

  removeMultipleSharesByCollectionId(
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
