import { Router } from 'express'
import { statusCodes } from '../resources/constances'
import {
  checkAccess,
  checkLoginData,
  createNewLoginData,
  logoutAccess,
} from '../logic/auth/authentication'

export const router = Router()

router.get('/status', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  if (access_token) {
    checkAccess(access_token, (isValid) => {
      res.status(isValid ? statusCodes.OK : statusCodes.UNAUTHORIZED).end()
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.post('/register', (req, res) => {
  const body = req.body
  const name = body.name
  const password = body.password

  if (name && password) {
    createNewLoginData(name, password, (err, user) => {
      if (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
        return
      }

      if (user) {
        res.status(statusCodes.CONFLICT).end()
        return
      }

      res.status(statusCodes.CREATED).end()
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.post('/login', (req, res) => {
  const body = req.body
  const name = body.name
  const password = body.password

  if (name && password) {
    checkLoginData(name, password, (err, user, access_token) => {
      if (err) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
        return
      }

      if (!user) {
        res.status(statusCodes.NOT_FOUND).end()
        return
      }

      res.status(statusCodes.OK).json({
        access_token: access_token,
        user: user,
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.post('/logout', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const body = req.body
  const user_id = body.user_id

  checkAccess(access_token, (isValid, access_owner_id) => {
    if (!access_token || !isValid) {
      res.status(statusCodes.BAD_REQUEST).end()
      return
    }

    if (access_owner_id !== user_id) {
      res.status(statusCodes.UNAUTHORIZED).end()
      return
    }

    logoutAccess(access_token, () => {
      res.status(statusCodes.OK).end()
    })
  })
})
