import { CollectionDatabase } from './connections/collection.db'
import { CollectionItemDatabase } from './connections/collectionItem.db'
import { CollectionCollumnDatabase } from './connections/collectionsCollumn.db'
import { SharedDatabase } from './connections/share.db'
import { UserDatabase } from './connections/user.db'
import { UserPwDatabase } from './connections/userPw.db'

type DatastorePool = {
  collection: CollectionDatabase
  collectionItem: CollectionItemDatabase
  collectionCollumn: CollectionCollumnDatabase
  shared: SharedDatabase
  user: UserDatabase
  user_pw: UserPwDatabase
}

export const datastorePool: DatastorePool = {
  collection: undefined,
  collectionItem: undefined,
  collectionCollumn: undefined,
  shared: undefined,
  user: undefined,
  user_pw: undefined,
}

export const loadDatastores = () => {
  datastorePool.collection = new CollectionDatabase()
  datastorePool.collectionItem = new CollectionItemDatabase()
  datastorePool.collectionCollumn = new CollectionCollumnDatabase()
  datastorePool.shared = new SharedDatabase()
  datastorePool.user = new UserDatabase()
  datastorePool.user_pw = new UserPwDatabase()
}
