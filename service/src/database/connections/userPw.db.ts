import Datastore = require('nedb')
import { User_PW } from '../datastores.types'
import { createDatastorePath } from '../createDatastoreFilePath'

export class UserPwDatabase {
  private connection: Datastore<User_PW>

  constructor() {
    this.connection = new Datastore<User_PW>({
      filename: createDatastorePath(`user_pw`),
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  createNewUserPw(
    user_id: string,
    password: string,
    callback?: (err: Error, doc: User_PW) => void
  ) {
    this.connection.insert(
      { _id: undefined, user_id: user_id, password: password },
      callback
    )
  }

  updateUserPw(
    user_id: string,
    newPassword: string,
    callback?: (err: Error, numberOfUpdated: number) => void
  ) {
    this.connection.update(
      { user_id: user_id },
      { password: newPassword },
      {},
      callback
    )
  }

  removeUserPw(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, {}, callback)
  }
}
