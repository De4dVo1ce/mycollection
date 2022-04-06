import { AccessToken } from '../components/AppBase/appValues'
import { STORAGE_KEY_ACCESS_TOKEN } from '../components/AppBase/resources'
import { Collection } from '../shared/resources/datastores.types'
import { getFromStorage } from '../shared/resources/storage'
import { requestInitTemplate } from './api.config'
import { createApiUrlFor } from './createApiUrlFor'

export const getCollections = async (
  callback: (status: number, collections?: Array<Collection>) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'GET'
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

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'GET'
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
