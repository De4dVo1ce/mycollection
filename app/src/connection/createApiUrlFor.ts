import { apiConfig } from '../config/api.config'

const { url, port } = apiConfig()

export const createApiUrlFor = () => ({
  status: `${url}:${port}/auth/status`,
  register: `${url}:${port}/auth/register`,
  login: `${url}:${port}/auth/login`,
  logout: `${url}:${port}/auth/logout`,
  collections: `${url}:${port}/collections`,
  collection_new: `${url}:${port}/collections/new`,
  collection: (collection_id: string) =>
    `${url}:${port}/collections/${collection_id}`,
  columns: (collection_id: string) =>
    `${url}:${port}/collections/${collection_id}/columns`,
  items: (collection_id: string) =>
    `${url}:${port}/collections/${collection_id}/items`,
  item: (collection_id: string, item_id: string) =>
    `${url}:${port}/collections/${collection_id}/items/${item_id}`,
})
