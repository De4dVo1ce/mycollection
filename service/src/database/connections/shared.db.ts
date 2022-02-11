import Datastore = require('nedb')
import { Share } from '../datastores.types'
import { createDatastorePath } from '../createDatastoreFilePath'

export class SharedDatabase {
  private connection: Datastore<Share>

  constructor() {
    this.connection = new Datastore<Share>({
      filename: createDatastorePath(`share`),
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  createNewShare(
    newShared: Share,
    callback?: (err: Error, doc: Share) => void
  ) {
    this.connection.insert({ ...newShared, _id: undefined }, callback)
  }

  createMultipleShares(
    newShares: Array<Share>,
    callback?: (err: Error, docs: Array<Share>) => void
  ) {
    this.connection.insert(
      newShares.map((share) => ({ ...share, _id: undefined })),
      callback
    )
  }

  getSharesByUserId(
    user_id: string,
    callback?: (err: Error, docs: Array<Share>) => void
  ) {
    this.connection.find({ user_id: user_id }, {}, callback)
  }

  getSharesByCollectionId(
    collection_id: string,
    callback?: (err: Error, docs: Array<Share>) => void
  ) {
    this.connection.find({ collection_id: collection_id }, {}, callback)
  }

  removeShare(
    share_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ _id: share_id }, {}, callback)
  }

  removeMultipleSharesByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }

  removeMultipleSharesByCollectionId(
    collection_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { collection_id: collection_id },
      { multi: true },
      callback
    )
  }
}
