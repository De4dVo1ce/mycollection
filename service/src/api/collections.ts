import { Router } from 'express'
import {
  createCollection,
  getAllCollectionsByUserId,
  getCollection,
  removeCollection,
  updateCollection,
} from '../logic/collection/collection'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/statusCodes'
import { Collection, CollectionColumn } from '../database/datastores.types'
import { router as columnRouter } from './columns'
import { router as itemsRouter } from './items'
import { updateMultipleColumns } from '../logic/collection/collectionColumn'

export const router = Router()

router.use('', columnRouter)
router.use('', itemsRouter)

router.post('/new', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const body = req.body
  const collection: Collection = body.collection as Collection

  if (access_token && collection) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      createCollection(
        { ...collection, user_id: access_owner_id, count: 0 },
        (err, collection) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          res.status(statusCodes.CREATED).json({ collection: collection })
        }
      )
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.get('', (req, res) => {
  const headers = req.headers
  const access_token = headers.authorization

  const missingParams: Array<any> = [access_token].filter((param) => !param)

  if (missingParams.length === 0) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      getAllCollectionsByUserId(access_owner_id, (err, collections) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        collections.sort((c1, c2) => c1.created - c2.created)

        res.status(statusCodes.OK).json({ collections: collections })
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

        res.status(statusCodes.OK).json({ collection: collection })
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
  const columns: Array<CollectionColumn> =
    body.columns as Array<CollectionColumn>

  const params = req.params
  const collectionId = params.collectionId

  if (access_token && collectionId && collection && columns) {
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

        updateMultipleColumns(collectionId, columns, (err) => {
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
