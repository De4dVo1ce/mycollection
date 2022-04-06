import { AccessToken } from '../components/AppBase/appValues'
import { STORAGE_KEY_ACCESS_TOKEN } from '../components/AppBase/resources'
import { CollectionItem } from '../shared/resources/datastores.types'
import { getFromStorage } from '../shared/resources/storage'
import { requestInitTemplate } from './api.config'
import { createApiUrlFor } from './createApiUrlFor'

export const getCollectionItems = async (
  collection_id: string,
  searchProp: string | undefined,
  search: string | undefined,
  callback: (status: number, items: Array<CollectionItem>) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'GET'
  requestInit.headers!.authorization = access_token

  const url =
    createApiUrlFor().items(collection_id) +
    (searchProp && search ? `?searchby=${searchProp}&search=${search}` : '')

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (status === 200 ? await res.json() : {}) as {
    items: Array<CollectionItem>
  }

  callback(status, json.items)
}
