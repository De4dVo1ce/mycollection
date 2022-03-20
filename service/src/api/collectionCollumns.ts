import { Router } from 'express'
import { getCollection } from '../logic/collection/collection'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/constances'
import { CollectionCollumn } from '../database/datastores.types'
import {
  createMultipleCollectionCollumns,
  getCollumnsByCollectionId,
  removeCollumn,
  updateCollumnByCollectionId,
} from '../logic/collection/collectionCollumn'

export const router = Router()

router.post('/:collectionId/collumns/new', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const body = req.body
  const user_id: string = body.user_id

  const params = req.params
  const collectionId = params.collectionId

  const collumns: Array<CollectionCollumn> =
    body.collumns as Array<CollectionCollumn>

  if (access_token) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid || user_id !== access_owner_id) {
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

        createMultipleCollectionCollumns(collumns, (err) => {
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

router.get('/:collectionId/collumns', (req, res) => {
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

      getCollumnsByCollectionId(collectionId, (err, collumns) => {
        if (err) {
          res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
          return
        }

        if (
          collumns.filter((collumn) => collumn.user_id !== access_owner_id)
            .length > 0
        ) {
          res.status(statusCodes.UNAUTHORIZED).end()
          return
        }

        res.status(statusCodes.OK).json({ collumns: collumns })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.post('/:collectionId/collumns/:collumnId', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const body = req.body
  const collumn: CollectionCollumn = body.collumn as CollectionCollumn

  const params = req.params
  const collectionId = params.collectionId
  const collumnId = params.collumnId

  if (access_token && collumn && collectionId) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid || collumn.user_id !== access_owner_id) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      updateCollumnByCollectionId(
        collumnId,
        collectionId,
        collumn,
        (err, numUpdated) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          if (numUpdated < 1) {
            res.status(statusCodes.NOT_FOUND).end()
            return
          }

          res.status(statusCodes.OK).end()
        }
      )
    })
  } else {
    res.status(statusCodes.BAD_REQUEST).end()
  }
})

router.delete('/:collectionId/collumns/:collumnId', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const params = req.params
  const collectionId = params.collectionId
  const collumnId = params.collumnId

  if (access_token && collectionId && collumnId) {
    checkAccess(access_token, (isValid, access_owner_id) => {
      if (!isValid) {
        res.status(statusCodes.UNAUTHORIZED).end()
        return
      }

      removeCollumn(collumnId, collectionId, (err, numRemoved) => {
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
    res.status(statusCodes.BAD_REQUEST).end()
  }
})
