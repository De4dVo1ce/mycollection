import { Router } from 'express'
import { getCollection } from '../logic/collection/collection'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/statusCodes'
import { CollectionColumn } from '../database/datastores.types'
import {
  getMultipleColumnsByCollectionId,
  updateMultipleColumns,
} from '../logic/collection/collectionColumn'

export const router = Router()

router.get('/:collectionId/columns', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const params = req.params
  const collectionId = params.collectionId

  if (access_token && collectionId) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED)
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

        getMultipleColumnsByCollectionId(collectionId, (err, columns) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }
          res
            .status(statusCodes.OK)
            .json({ columns: columns.sort((a, b) => a.index - b.index) })
        })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.post('/:collectionId/columns', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const body = req.body
  const columns: Array<CollectionColumn> =
    body.columns as Array<CollectionColumn>

  const params = req.params
  const collectionId = params.collectionId

  if (access_token && columns && collectionId) {
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

        updateMultipleColumns(collectionId, columns, (err) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          res.status(statusCodes.CREATED).end()
        })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})
