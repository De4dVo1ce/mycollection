import { Router } from 'express'
import { getCollection } from '../logic/collection/collection'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/statusCodes'
import {
  createCollectionItem,
  getAllCollectionItemsByCollectionId,
  getCollectionItem,
} from '../logic/collection/collectionItem'
import { CollectionItem } from '../database/datastores.types'

export const router = Router()

router.post('/:collectionId/items/new', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const params = req.params
  const collectionId = params.collectionId

  const body = req.body
  const item: CollectionItem = body.item as CollectionItem

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

        createCollectionItem(collectionId, item, (err, item) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          res.status(statusCodes.CREATED).json({ item: item })
        })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST)
  }
})

router.get('/:collectionId/items', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const params = req.params
  const collectionId = params.collectionId

  const query = req.query
  const prop = query.searchby?.toString() ?? '_id'
  const search = query.search?.toString() ?? ''

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

        getAllCollectionItemsByCollectionId(
          collectionId,
          prop,
          search,
          (err, items) => {
            if (err) {
              res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
              return
            }

            res.status(statusCodes.OK).json({
              items: items,
            })
          }
        )
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST)
  }
})

router.get('/:collectionId/items/:itemId', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const params = req.params
  const collectionId = params.collectionId
  const itemId = params.itemId

  if (access_token && collectionId && itemId) {
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

        getCollectionItem(itemId, (err, item) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          if (!collection) {
            res.status(statusCodes.NOT_FOUND).end()
            return
          }

          res.status(statusCodes.OK).json({ item: item })
        })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST)
  }
})

router.post(`/:collectionId/items/:itemId`, (req, res) => {})
router.delete(`/:collectionId/items/:itemId`, (req, res) => {})
