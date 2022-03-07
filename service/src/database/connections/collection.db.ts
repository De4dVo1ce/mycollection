import Datastore = require('nedb')
import { Collection } from '../datastores.types'
import { DatabaseConnection } from './databaseConnection'

export class CollectionDatabase extends DatabaseConnection<Collection> {
  constructor() {
    super('collection')
  }

  getAllByUserId(
    user_id: string,
    callback?: (err: Error, docs: Array<Collection>) => void
  ) {
    this.connection.find({ user_id: user_id }, {}, callback)
  }

  removeByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }
}
