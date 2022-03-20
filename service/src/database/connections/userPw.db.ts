import { User_PW } from '../datastores.types'
import { DatabaseConnection } from './db'

export class UserPwDatabase extends DatabaseConnection<User_PW> {
  constructor() {
    super('user_pw')
  }

  getByUserId(user_id: string, callback?: (err: Error, doc: User_PW) => void) {
    this.connection.findOne({ user_id: user_id }, callback)
  }

  removeByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved?: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, {}, callback)
  }
}
