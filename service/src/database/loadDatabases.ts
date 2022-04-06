import { CollectionDatabase } from './connections/collection.db'
import { ItemDatabase } from './connections/item.db'
import { ColumnDatabase } from './connections/column.db'
import { ShareDatabase } from './connections/share.db'
import { UserDatabase } from './connections/user.db'
import { UserPwDatabase } from './connections/userPw.db'

type DatastorePool = {
  collection: CollectionDatabase
  collectionItem: ItemDatabase
  collectionColumn: ColumnDatabase
  share: ShareDatabase
  user: UserDatabase
  user_pw: UserPwDatabase
}

export const datastorePool: DatastorePool = {
  collection: undefined,
  collectionItem: undefined,
  collectionColumn: undefined,
  share: undefined,
  user: undefined,
  user_pw: undefined,
}

export const loadDatastores = () => {
  datastorePool.collection = new CollectionDatabase()
  datastorePool.collectionItem = new ItemDatabase()
  datastorePool.collectionColumn = new ColumnDatabase()
  datastorePool.share = new ShareDatabase()
  datastorePool.user = new UserDatabase()
  datastorePool.user_pw = new UserPwDatabase()
}
