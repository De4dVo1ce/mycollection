import Datastore = require('nedb')
import { User } from '../datastores.types'
import { DatabaseConnection } from './databaseConnection'

export class UserDatabase extends DatabaseConnection<User> {
  constructor() {
    super('user')
  }

  getAllByName(
    user_name: string,
    callback?: (err: Error, docs: Array<User>) => void
  ) {
    this.connection.find({ name: user_name }, {}, callback)
  }
}
