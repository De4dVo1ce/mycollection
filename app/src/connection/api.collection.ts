import { AccessToken } from '../components/AppBase/appValues'
import { STORAGE_KEY_ACCESS_TOKEN } from '../components/AppBase/resources'
import { statusCodes, Collection, CollectionColumn } from '../shared'
import { getFromStorage } from '../shared/utils/storage'
import { requestInitTemplate } from '../config/api.config'
import { createApiUrlFor } from './createApiUrlFor'

export const createCollection = async (
  collection: Collection,
  callback: (status: number, collection?: Collection) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('POST')
  requestInit.headers!.authorization = access_token

  const body = { collection: collection }
  requestInit.body = JSON.stringify(body)

  const url = createApiUrlFor().collection_new

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error('ERROR:', err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (
    status === statusCodes.CREATED ? await res.json() : {}
  ) as { collection: Collection }

  callback(status, json.collection)
}

export const getCollections = async (
  callback: (status: number, collections?: Array<Collection>) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('GET')
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().collections

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    collections: Array<Collection>
  }

  callback(status, json.collections)
}

export const getCollection = async (
  collection_id: string,
  callback: (status: number, collection?: Collection) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('GET')
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().collection(collection_id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error('ERROR', err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    collection: Collection
  }

  callback(status, json.collection)
}

export const updateCollection = async (
  collection: Collection,
  columns: Array<CollectionColumn>,
  callback: (status: number) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('POST')
  requestInit.headers!.authorization = access_token

  const body = { collection: collection, columns: columns }
  requestInit.body = JSON.stringify(body)

  const url = createApiUrlFor().collection(collection._id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error('ERROR:', err)
  )

  const status = (await res?.status) ?? 0

  callback(status)
}

export const deleteCollection = async (
  collectionId: string,
  callback: (status: number) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('DELETE')
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().collection(collectionId)

  const res: any = await fetch(url, requestInit).catch((err) => {
    console.error('ERROR:', err)
    return { status: statusCodes.INTERNAL_SERVER_ERROR }
  })

  const status = (await res?.status) ?? 0

  callback(status)
}
