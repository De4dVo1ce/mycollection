import { User } from '../../database/datastores.types'
import { datastorePool } from '../../database/loadDatabases'
import { removeCollectionsByUserId } from '../collection/collection'
import { removeColumnsByUserId } from '../collection/collectionColumn'
import { removeAllItemsByUserId } from '../collection/collectionItem'
import { removeSharesByUserId } from '../share/share'
import { removeUserPwByUserId } from './userPw'

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
  user_id: string,
  callback: (err: Error, numRemoved?: number) => void
) => {
  removeSharesByUserId(user_id, (err) => {
    if (err) {
      callback(err)
      return
    }

    removeAllItemsByUserId(user_id, (err) => {
      if (err) {
        callback(err)
        return
      }

      removeColumnsByUserId(user_id, (err) => {
        if (err) {
          callback(err)
          return
        }

        removeCollectionsByUserId(user_id, (err) => {
          if (err) {
            callback(err)
            return
          }

          removeUserPwByUserId(user_id, (err) => {
            if (err) {
              callback(err)
              return
            }

            datastorePool.user.remove(user_id, callback)
          })
        })
      })
    })
  })
}
