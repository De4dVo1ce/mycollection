import { CollectionDatabase } from './connections/collection.db'
import { CollectionItemDatabase } from './connections/collectionItem.db'
import { CollectionCollumnDatabase } from './connections/collectionsCollumn.db'
import { SharedDatabase } from './connections/shared.db'
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

export let datastorePool: DatastorePool = undefined

export const loadDatastores = () => {
  datastorePool = {
    collection: new CollectionDatabase(),
    collectionItem: new CollectionItemDatabase(),
    collectionCollumn: new CollectionCollumnDatabase(),
    shared: new SharedDatabase(),
    user: new UserDatabase(),
    user_pw: new UserPwDatabase(),
  }
}
