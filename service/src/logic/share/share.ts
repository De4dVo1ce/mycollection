import { datastorePool } from '../../database/loadDatabases'
import { Share } from '../../database/datastores.types'

export const createShare = (share: Share, callback: (err: Error) => void) => {
  datastorePool.share.create(share, callback)
}

export const createMultipleShare = (
  shares: Array<Share>,
  callback: (err: Error) => void
) => {
  datastorePool.share.createMultiple(shares, callback)
}

export const getSharesByCollectionId = (
  collection_id: string,
  callback: (err: Error, shares: Array<Share>) => void
) => {
  datastorePool.share.getAllByCollectionId(collection_id, callback)
}

export const getSharesByUserId = (
  user_id: string,
  callback: (err: Error, shares: Array<Share>) => void
) => {
  datastorePool.share.getAllByUserId(user_id, callback)
}

export const removeShare = (
  share_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.share.remove(share_id, callback)
}

export const removeMultipleShares = (
  share_ids: Array<string>,
  callback: (err: Error) => void
) => {
  datastorePool.share.removeMultiple(share_ids, callback)
}

export const removeSharesByUserId = (
  user_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.share.removeMultipleByUserId(user_id, callback)
}

export const removeSharesByCollectionId = (
  collection_id: string,
  callback: (err: Error) => void
) => {
  datastorePool.share.removeMultipleByCollectionId(collection_id, callback)
}
