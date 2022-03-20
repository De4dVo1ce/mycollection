import { User } from '../../database/datastores.types'
import { createUser, getUserByName, removeUser } from '../user/user'
import { createUserPw, verifyPassword } from '../user/userPw'
import {
  addNewAccess,
  existAccess,
  getUserIdByAccessToken,
  removeAccess,
  updateAccess,
} from './accessManaging'

export const createNewLoginData = (
  name: string,
  password: string,
  callback: (err: Error, user?: User) => void
) => {
  getUserByName(name, (err, user) => {
    if (err || user) {
      callback(err, user)
      return
    }

    createUser({ _id: undefined, name: name }, (err, user) => {
      if (err) {
        callback(err)
        return
      }

      createUserPw(
        { _id: undefined, user_id: user._id, password: password },
        (err) => {
          if (err) {
            removeUser(user._id, callback)
            return
          }

          callback(err)
        }
      )
    })
  })
}

export const checkLoginData = (
  name: string,
  password: string,
  callback: (err: Error, user?: User, access_token?: string) => void
) => {
  getUserByName(name, (err, user) => {
    if (err || !user) {
      callback(err, user)
      return
    }
    verifyPassword(user._id, password, (err, isValid) => {
      if (err || !isValid) {
        callback(err, undefined)
        return
      }
      callback(err, user, addNewAccess(user._id))
    })
  })
}

export const checkAccess = (
  access_token: string,
  callback: (isValid: boolean, user_id?: string) => void
) => {
  if (existAccess(access_token)) {
    updateAccess(access_token)
    callback(true, getUserIdByAccessToken(access_token))
  } else {
    callback(false)
  }
}

export const logoutAccess = (access_token: string, callback: () => void) => {
  removeAccess(access_token)
  callback()
}
