import { AccessToken } from '../components/AppBase/appValues'
import { STORAGE_KEY_ACCESS_TOKEN } from '../components/AppBase/resources'
import { CollectionItem, getFromStorage } from '../shared'
import { requestInitTemplate } from '../config/api.config'
import { createApiUrlFor } from './createApiUrlFor'

export const createCollectionItem = async (
  collection_id: string,
  item: CollectionItem,
  callback: (status: number, item?: CollectionItem) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('POST')
  requestInit.headers!.authorization = access_token

  const body = { item: item }
  requestInit.body = JSON.stringify(body)

  const url = createApiUrlFor().item(collection_id, 'new')

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    items: CollectionItem
  }

  callback(status, json.items)
}

export type ItemsResponse = {
  items: Array<CollectionItem> | undefined
}

export const getCollectionItems = async (
  collection_id: string,
  searchProp: string | undefined,
  search: string | undefined,
  callback: (status: number, res: ItemsResponse) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('GET')
  requestInit.headers!.authorization = access_token

  const url =
    createApiUrlFor().items(collection_id) +
    '?' +
    (searchProp && search ? `searchby=${searchProp}&search=${search}&` : '')

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as ItemsResponse

  callback(status, json)
}

export const getCollectionItem = async (
  collection_id: string,
  item_id: string,
  callback: (status: number, item: CollectionItem) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('GET')
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().item(collection_id, item_id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    item: CollectionItem
  }

  callback(status, json.item)
}

export const updateCollectionItem = async (
  collection_id: string,
  item: CollectionItem,
  callback: (status: number, item?: CollectionItem) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('POST')
  requestInit.headers!.authorization = access_token

  const body = { item: item }
  requestInit.body = JSON.stringify(body)

  const url = createApiUrlFor().item(collection_id, item._id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    items: CollectionItem
  }

  callback(status, json.items)
}

export const deleteCollectionItem = async (
  collection_id: string,
  item_id: string,
  callback: (status: number) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate('DELETE')
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().item(collection_id, item_id)

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0

  callback(status)
}
