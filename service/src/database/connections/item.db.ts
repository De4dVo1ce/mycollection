import { CollectionItem } from '../datastores.types'
import { DatabaseConnection } from './db'

export class ItemDatabase extends DatabaseConnection<CollectionItem> {
  constructor() {
    super('item')
  }

  getAllByCollectionId(
    collection_id: string,
    prop: string,
    search: string,
    callback?: (err: Error, docs: Array<CollectionItem>) => void
  ) {
    const regex = new RegExp(search, 'i')
    const template: any = { collection_id: collection_id }
    template[prop] = regex

    this.connection.find({ ...template }, {}, callback)
  }

  removeByCollectionId(
    collection_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove(
      { collection_id: collection_id },
      { multi: true },
      callback
    )
  }

  removeAllByUserId(
    user_id: string,
    callback?: (err: Error, numRemoved: number) => void
  ) {
    this.connection.remove({ user_id: user_id }, { multi: true }, callback)
  }
}
