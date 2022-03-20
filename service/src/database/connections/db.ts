import Datastore = require('nedb')

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

  create(item: T, callback?: (err: Error, doc?: T) => void) {
    this.connection.insert({ ...item, _id: undefined }, callback)
  }

  createMultiple(
    items: Array<T>,
    callback?: (err: Error, docs?: Array<T>) => void
  ) {
    this.connection.insert(
      items.map((item) => ({ ...item, _id: undefined })),
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
    this.connection.update(
      { _id: _id },
      { $set: item },
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
