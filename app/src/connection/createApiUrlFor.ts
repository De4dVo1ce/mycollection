import { apiConfig } from './api.config'

const { url, port } = apiConfig()

export const createApiUrlFor = () => ({
  status: `${url}:${port}/auth/status`,
  register: `${url}:${port}/auth/register`,
  login: `${url}:${port}/auth/login`,
  logout: `${url}:${port}/auth/logout`,
  collections: `${url}:${port}/collections`,
  collection: (collection_id: string) =>
    `${url}:${port}/collections/${collection_id}`,
  columns: (collection_id: string) =>
    `${url}:${port}/collections/${collection_id}/columns`,
  items: (collection_id: string) =>
    `${url}:${port}/collections/${collection_id}/items`,
})
