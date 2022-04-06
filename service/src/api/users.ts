import { Router } from 'express'
import { getUser, getUserByName, removeUser } from '../logic/user/user'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/statusCodes'

export const router = Router()

router.get('/', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const query = req.query
  const search = query?.name

  const missingParams: Array<any> = [access_token, search].filter(
    (param) => !param
  )

  if (missingParams.length === 0) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      getUserByName(search.toString(), (err, user) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        res.status(statusCodes.OK).json({ user: user })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.get('/:userId', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const params = req.params
  const userId = params.userId

  const missingParams: Array<any> = [access_token, userId].filter(
    (param) => !param
  )

  if (missingParams.length === 0) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid || access_owner_id !== userId) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      getUser(userId, (err, user) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        if (!user) {
          res.status(statusCodes.NOT_FOUND).end()
          return
        }

        res.status(statusCodes.OK).json({ user: user })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).json({ message: `Missing parameters` })
  }
})

router.delete('/:userId', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const params = req.params
  const userId = params.userId

  const missingParams: Array<any> = [access_token, userId].filter(
    (param) => !param
  )
  if (missingParams.length === 0) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid || access_owner_id !== userId) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      removeUser(userId, (err, numRemoved) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        if (numRemoved < 1) {
          res.status(statusCodes.NOT_FOUND).end()
          return
        }

        res.status(statusCodes.OK).end()
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).json({ message: `Missing parameters` })
  }
})
