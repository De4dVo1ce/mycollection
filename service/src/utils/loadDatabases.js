const Datastore = require('nedb')

const { createPathFor } = require('./createPathFor')
const { getAllData } = require('./getAllData')

const loadDatabases = async () => {
  const datastores = []

  const databaseNames = [
    'users',
    'collections',
    'collectionSettings',
    'shared',
    'accesses',
  ]

  databaseNames.forEach((name) => {
    const newDatabase = new Datastore({
      filename: createPathFor()[name],
      autoload: true,
    })
    datastores.push({ id: name, connection: newDatabase })
  })

  const collectionsDb = datastores.find(
    (db) => db.id === 'collections'
  ).connection

  getAllData(collectionsDb, (collections) => {
    collections.forEach((collection) => {
      const collectionId = collection._id
      console.log(collection)

      const newDatabase = new Datastore({
        filename: createPathFor().collection(collectionId),
        autoload: true,
      })
      datastores.push({ id: collectionId, connection: newDatabase })
    })
  })
}

const databases = loadDatabases()

module.exports = { databases }
