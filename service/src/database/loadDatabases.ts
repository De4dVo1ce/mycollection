import { CollectionDatabase } from './connections/collection.db'
import { CollectionItemDatabase } from './connections/collectionItem.db'
import { CollectionCollumnDatabase } from './connections/collectionCollumn.db'
import { ShareDatabase } from './connections/share.db'
import { UserDatabase } from './connections/user.db'
import { UserPwDatabase } from './connections/userPw.db'

type DatastorePool = {
  collection: CollectionDatabase
  collectionItem: CollectionItemDatabase
  collectionCollumn: CollectionCollumnDatabase
  share: ShareDatabase
  user: UserDatabase
  user_pw: UserPwDatabase
}

export const datastorePool: DatastorePool = {
  collection: undefined,
  collectionItem: undefined,
  collectionCollumn: undefined,
  share: undefined,
  user: undefined,
  user_pw: undefined,
}

export const loadDatastores = () => {
  datastorePool.collection = new CollectionDatabase()
  datastorePool.collectionItem = new CollectionItemDatabase()
  datastorePool.collectionCollumn = new CollectionCollumnDatabase()
  datastorePool.share = new ShareDatabase()
  datastorePool.user = new UserDatabase()
  datastorePool.user_pw = new UserPwDatabase()
}
