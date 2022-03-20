import { datastorePool } from '../../database/loadDatabases'
import { User_PW } from '../../database/datastores.types'
import { generate, verify } from 'password-hash'

export const createUserPw = (
  user_pw: User_PW,
  callback: (err: Error) => void
) => {
  datastorePool.user_pw.create(
    {
      ...user_pw,
      password: generate(user_pw.password),
    },
    callback
  )
}

const getUserPwByUserId = (
  user_id: string,
  callback: (err: Error, user_pw: User_PW) => void
) => {
  datastorePool.user_pw.getByUserId(user_id, callback)
}

export const verifyPassword = (
  user_id: string,
  password: string,
  callback: (err: Error, isValid: boolean) => void
) => {
  getUserPwByUserId(user_id, (err, user_pw) => {
    if (err || !user_pw) {
      callback(err, false)
      return
    }

    if (verify(password, user_pw.password)) {
      callback(err, true)
    } else {
      callback(err, false)
    }
  })
}

export const updateUserPw = (
  user_id: string,
  password: string,
  newPassword: string,
  callback: (err: Error) => {}
) => {
  verifyPassword(user_id, password, (err, isValid) => {
    if (err || !isValid) {
      callback(err ?? new Error())
      return
    }

    getUserPwByUserId(user_id, (err, user_pw) => {
      if (err) {
        callback(err)
        return
      }

      datastorePool.user_pw.update(user_pw._id, {
        ...user_pw,
        password: generate(newPassword),
      })
    })
  })
}

export const removeUserPwByUserId = (
  user_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.user_pw.removeByUserId(user_id, callback)
}
