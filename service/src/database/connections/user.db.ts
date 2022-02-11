import Datastore = require('nedb')
import { User } from '../datastores.types'
import { createDatastorePath } from '../createDatastoreFilePath'

export class UserDatabase {
  private connection: Datastore<User>

  constructor() {
    this.connection = new Datastore<User>({
      filename: createDatastorePath(`user`),
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  createNewUser(newUser: User, callback?: (err: Error, doc: User) => void) {
    this.connection.insert({ ...newUser, _id: undefined }, callback)
  }

  createMultipleUsers(
    newUsers: Array<User>,
    callback?: (err: Error, docs: Array<User>) => void
  ) {
    this.connection.insert(
      newUsers.map((nU) => ({ ...nU, _id: undefined })),
      callback
    )
  }

  getUser(user_id: string, callback?: (err: Error, doc: User) => void) {
    this.connection.findOne({ _id: user_id }, {}, callback)
  }

  getUsersByName(
    user_name: string,
    callback?: (err: Error, docs: Array<User>) => void
  ) {
    this.connection.find({ name: user_name }, {}, callback)
  }

  updateUser(
    user_id: string,
    user: User,
    callback?: (err: Error, numberOfUpdated: number) => void
  ) {
    this.connection.update({ _id: user_id }, { $set: user }, {}, callback)
  }

  removeUser(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ _id: user_id }, {}, callback)
  }

  removeMultipleUsers(
    user_ids: Array<string>,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { _id: { $in: user_ids } },
      { multi: true },
      callback
    )
  }
}
