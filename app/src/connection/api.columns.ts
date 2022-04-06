import { AccessToken } from '../components/AppBase/appValues'
import { STORAGE_KEY_ACCESS_TOKEN } from '../components/AppBase/resources'
import { CollectionColumn } from '../shared/resources/datastores.types'
import { getFromStorage } from '../shared/resources/storage'
import { requestInitTemplate } from './api.config'
import { createApiUrlFor } from './createApiUrlFor'

export const getCollectionColumns = async (
  collection_id: string,
  callback: (status: number, columns: Array<CollectionColumn>) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'GET'
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().columns(collection_id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    columns: Array<CollectionColumn>
  }

  callback(status, json.columns)
}

export const updateCollectionColumn = async (
  collection_id: string,
  callback: (status: number) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'POST'
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().columns(collection_id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0

  callback(status)
}
