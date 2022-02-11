import Datastore = require('nedb')
import { Collection } from '../datastores.types'
import { createDatastorePath } from '../createDatastoreFilePath'

export class CollectionDatabase {
  private connection: Datastore<Collection>

  constructor() {
    this.connection = new Datastore<Collection>({
      filename: createDatastorePath(`collection`),
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  createNewCollection(
    newCollection: Collection,
    callback?: (err: Error, doc: Collection) => void
  ) {
    this.connection.insert({ ...newCollection, _id: undefined }, callback)
  }

  createMultipleCollections(
    newCollections: Array<Collection>,
    callback?: (err: Error, docs: Array<Collection>) => void
  ) {
    this.connection.insert(
      newCollections.map((nC) => ({ ...nC, _id: undefined })),
      callback
    )
  }

  getAllCollectionsByUserId(
    user_id: string,
    callback?: (err: Error, docs: Array<Collection>) => void
  ) {
    this.connection.find({ user_id: user_id }, {}, callback)
  }

  getCollectionById(
    collection_id: string,
    callback?: (err: Error, doc: Collection) => void
  ) {
    this.connection.findOne({ _id: collection_id }, {}, callback)
  }

  updateCollection(
    collection_id: string,
    collection: Collection,
    callback?: (err: Error, numberOfUpdated: number) => void
  ) {
    this.connection.update(
      { _id: collection_id },
      { $set: { ...collection } },
      {},
      callback
    )
  }

  removeCollection(
    collection_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ _id: collection_id }, {}, callback)
  }

  removeMultipleCollections(
    collection_ids: Array<string>,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { _id: { $in: collection_ids } },
      { multi: true },
      callback
    )
  }

  removeCollectionsByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }
}
