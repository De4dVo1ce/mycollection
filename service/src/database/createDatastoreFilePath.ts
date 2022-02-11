const databasesDirectory = './db'

export const createDatastorePath = (datastoreName: string): string => {
  return `${databasesDirectory}/${datastoreName}.db`
}
