import { User } from '../../database/datastores.types'
import { datastorePool } from '../../database/loadDatabases'

export const createUser = (
  user: User,
  callback: (err: Error, user: User) => void
) => {
  datastorePool.user.create(user, callback)
}

export const getUser = (
  user_id: string,
  callback: (err: Error, user: User) => void
) => {
  datastorePool.user.get(user_id, callback)
}

export const getUserByName = (
  name: string,
  callback: (err: Error, user?: User) => void
) => {
  datastorePool.user.getByName(name, callback)
}

export const updateUser = (
  user_id: string,
  user: User,
  callback: (err: Error) => void
) => {
  datastorePool.user.update(user_id, user, callback)
}

export const removeUser = (
  usre_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  datastorePool.user.remove(usre_id, callback)
}
