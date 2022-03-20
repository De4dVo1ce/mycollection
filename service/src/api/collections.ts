import { Router } from 'express'
import {
  createCollection,
  getCollection,
  removeCollection,
  updateCollection,
} from '../logic/collection/collection'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/constances'
import { Collection } from '../database/datastores.types'
import { router as collumnRouter } from './collectionCollumns'

export const router = Router()

router.use('', collumnRouter)

router.post('/new', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const body = req.body
  const user_id: string = body.user_id
  const collection: Collection = body.collection as Collection

  if (access_token && user_id && collection) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid || user_id !== access_owner_id) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      createCollection(collection, (err) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        res.status(statusCodes.CREATED).end()
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.get('/:collectionId', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const params = req.params
  const collectionId = params.collectionId

  if (access_token && collectionId) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      getCollection(collectionId, (err, collection) => {
        if (!err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        if (collection.user_id !== access_owner_id) {
          res.status(statusCodes.UNAUTHORIZED).end()
          return
        }

        res.status(statusCodes.OK).json({ colelction: collection })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.post('/:collectionId', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const body = req.body
  const collection: Collection = body.collection as Collection

  const params = req.params
  const collectionId = params.collectionId

  if (access_token && collectionId) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid || access_owner_id !== collection.user_id) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      updateCollection(collectionId, collection, (err, numUpdated) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        if (numUpdated < 1) {
          res.status(statusCodes.NOT_FOUND).end()
          return
        }

        res.status(statusCodes.OK).end()
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.delete('/:collectionId', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const params = req.params
  const collectionId = params.collectionId

  if (access_token && collectionId) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      getCollection(collectionId, (err, collection) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        if (!collection) {
          res.status(statusCodes.NOT_FOUND).end()
          return
        }

        if (collection.user_id !== access_owner_id) {
          res.status(statusCodes.UNAUTHORIZED).end()
          return
        }

        removeCollection(collectionId, (err) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          res.status(statusCodes.OK).end()
        })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})
