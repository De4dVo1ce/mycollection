import Datastore = require('nedb')
import { CollectionItem } from '../datastores.types'
import { createDatastorePath } from '../createDatastoreFilePath'

export class CollectionItemDatabase {
  private connection: Datastore<CollectionItem>

  constructor() {
    this.connection = new Datastore<CollectionItem>({
      filename: createDatastorePath(`collectionItem`),
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  createNewItem(
    newItem: CollectionItem,
    callback?: (err: Error, doc: CollectionItem) => void
  ) {
    this.connection.insert(newItem, callback)
  }

  createMultipleItems(
    newItems: Array<CollectionItem>,
    callback?: (err: Error, docs: Array<CollectionItem>) => void
  ) {
    this.connection.insert(
      newItems.map((nI) => ({ ...nI, _id: undefined })),
      callback
    )
  }

  getItemsByCollectionId(
    collection_id: string,
    callback?: (err: Error, docs: Array<CollectionItem>) => void
  ) {
    this.connection.find({ collection_id: collection_id }, {}, callback)
  }

  getItemById(
    item_id: string,
    callback?: (err: Error, docs: Array<CollectionItem>) => void
  ) {
    this.connection.find({ _id: item_id }, {}, callback)
  }

  updateItem(
    item_id: string,
    item: CollectionItem,
    callback?: (err: Error, numberOfUpdated: number) => void
  ) {
    this.connection.update(
      { _id: item_id },
      { $set: { ...item } },
      {},
      callback
    )
  }

  removeItem(
    item_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ _id: item_id }, {}, callback)
  }

  removeMultipleItems(
    item_ids: Array<string>,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { _id: { $in: item_ids } },
      { multi: true },
      callback
    )
  }

  removeItemsByCollectionId(
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
