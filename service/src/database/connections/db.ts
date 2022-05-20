import Datastore = require('nedb')
import { DatastoreType } from '../datastores.types'

export abstract class DatabaseConnection<T> {
  protected connection: Datastore<T>

  constructor(name: string) {
    this.connection = new Datastore<T>({
      filename: `./db/${name}.db`,
      autoload: true,
      onload: (err) => {
        if (err) {
          console.error(err)
        }
      },
    })
  }

  create(item: any, callback?: (err: Error, doc?: T) => void) {
    const dateTime = Date.now()
    this.connection.insert(
      { created: dateTime, modified: dateTime, ...item },
      callback
    )
  }

  createMultiple(
    items: Array<T & DatastoreType>,
    callback?: (err: Error, docs?: Array<T>) => void
  ) {
    const dateTime = Date.now()
    this.connection.insert(
      items.map((item) => ({
        created: item.created ?? dateTime,
        modified: dateTime,
        ...item,
      })),
      callback
    )
  }

  get(_id: string, callback?: (err: Error, doc: T) => void) {
    this.connection.findOne({ _id: _id }, {}, callback)
  }

  getAll(callback?: (err: Error, docs: Array<T>) => void) {
    this.connection.find({}, {}, callback)
  }

  update(
    _id: string,
    item: T,
    callback?: (err: Error, numOfUpdated?: number) => void
  ) {
    const dateTime = Date.now()
    this.connection.update(
      { _id: _id },
      { $set: { ...item, modified: dateTime } },
      { multi: false },
      callback
    )
  }

  remove(_id: string, callback?: (err: Error, numRemoved?: number) => void) {
    this.connection.remove({ _id: _id }, { multi: false }, callback)
  }

  removeMultiple(
    _ids: Array<string>,
    callback?: (err: Error, numRemoved?: number) => void
  ) {
    this.connection.remove({ _id: { $in: _ids } }, { multi: true }, callback)
  }
}
