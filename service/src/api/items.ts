import { Router } from 'express'
import { getCollection } from '../logic/collection/collection'
import { checkAccess } from '../logic/auth/authentication'
import { statusCodes } from '../resources/statusCodes'
import { getAllCollectionItemsByCollectionId } from '../logic/collection/collectionItem'
import { CollectionItem } from '../database/datastores.types'

export const router = Router()

router.get('/:collectionId/items', (req, res) => {
  const headers = req.headers
  const access_token: string = headers.authorization

  const params = req.params
  const collectionId = params.collectionId

  const query = req.query
  const prop = query.searchby?.toString()
  const search = query.search?.toString()

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

        getAllCollectionItemsByCollectionId(collectionId, (err, items) => {
          if (err) {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).end()
            return
          }

          if (prop && search) {
            const regex = new RegExp(search, 'i')
            const responseItems: Array<CollectionItem> = items.filter(
              (item) => {
                return item[prop].toString().match(regex)
              }
            )
            res.status(statusCodes.OK).json({ items: responseItems })
          } else {
            res.status(statusCodes.OK).json({ items: items })
          }
        })
      })
    })
  } else {
    res.status(statusCodes.BAD_REQUEST)
  }
})
