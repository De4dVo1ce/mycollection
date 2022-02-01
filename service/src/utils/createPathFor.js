const databasesDirectory = './db'

const createPathFor = () => ({
  users: `${databasesDirectory}/users.db`,
  collections: `${databasesDirectory}/collections.db`,
  collection: (collectionId) =>
    `${databasesDirectory}/collection/${collectionId}.db`,
  collectionSettings: `${databasesDirectory}/collectionSettings.db`,
  shared: `${databasesDirectory}/shared.db`,
  accesses: `${databasesDirectory}/accesses.db`,
})

exports.createPathFor = createPathFor
