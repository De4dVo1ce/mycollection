import { User } from '../datastores.types'
import { DatabaseConnection } from './db'

export class UserDatabase extends DatabaseConnection<User> {
  constructor() {
    super('user')
  }

  getByName(name: string, callback?: (err: Error, doc: User) => void) {
    this.connection.findOne({ name: name }, callback)
  }

  getAllByName(
    name: string,
    callback?: (err: Error, docs: Array<User>) => void
  ) {
    this.connection.find({ name: name }, {}, callback)
  }
}
