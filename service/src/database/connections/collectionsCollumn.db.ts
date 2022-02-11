import Datastore = require('nedb')
import { CollectionCollumn } from '../datastores.types'
import { createDatastorePath } from '../createDatastoreFilePath'

export class CollectionCollumnDatabase {
  private connection: Datastore<CollectionCollumn>

  constructor() {
    this.connection = new Datastore<CollectionCollumn>({
      filename: createDatastorePath(`collectionCollumn`),
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  createNewCollumn(
    collumn: CollectionCollumn,
    callback?: (err: Error, doc: CollectionCollumn) => void
  ) {
    this.connection.insert(collumn, callback)
  }

  createMultipleCollumns(
    collumns: Array<CollectionCollumn>,
    callback?: (err: Error, doc: Array<CollectionCollumn>) => void
  ) {
    this.connection.insert(
      collumns.map((c) => ({ ...c, _id: undefined })),
      callback
    )
  }

  updateCollumn(
    collumn_id: string,
    collumn: CollectionCollumn,
    callback?: (err: Error, numberOfUpdated: number) => void
  ) {
    this.connection.update(
      { _id: collumn_id },
      { $set: { ...collumn } },
      {},
      callback
    )
  }

  removeCollumn(
    collumn_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ _id: collumn_id }, {}, callback)
  }

  removeMultipleCollumns(
    collumn_ids: Array<string>,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { _id: { $in: collumn_ids } },
      { multi: true },
      callback
    )
  }

  removeCollumnsByCollectionId(
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
