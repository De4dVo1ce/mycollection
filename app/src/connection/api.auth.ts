import { AccessToken } from '../components/AppBase/appValues'
import { STORAGE_KEY_ACCESS_TOKEN } from '../components/AppBase/resources'
import { User } from '../shared/resources/datastores.types'
import { getFromStorage } from '../shared/resources/storage'
import { requestInitTemplate } from './api.config'
import { createApiUrlFor } from './createApiUrlFor'

export const status = async (
  callback: (status: number, user?: User) => void
) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'GET'
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().status

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = (await res?.json()) ?? {}

  callback(status, json.user)
}

export const register = async (
  username: string,
  password: string,
  callback: (status: number) => void
) => {
  const requestInit: RequestInit = requestInitTemplate()
  requestInit.method = 'POST'

  const body = {
    name: username,
    password: password,
  }
  requestInit.body = JSON.stringify(body)

  const url = createApiUrlFor().register

  const res = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  callback((await res)?.status ?? 0)
}

export const login = async (
  username: string,
  password: string,
  callback: (status: number, access_token: string, user: User) => void
) => {
  const requestInit: RequestInit = requestInitTemplate()
  requestInit.method = 'POST'

  const body = {
    name: username,
    password: password,
  }
  requestInit.body = JSON.stringify(body)

  const url = createApiUrlFor().login

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0
  const json: any = status === 200 ? await res.json() : {}

  callback(status, json.access_token, json.user)
}

export const logout = async (callback: (status: number) => void) => {
  const { access_token } = getFromStorage(
    STORAGE_KEY_ACCESS_TOKEN
  ) as AccessToken

  const requestInit: any = requestInitTemplate()
  requestInit.method = 'POST'
  requestInit.headers!.authorization = access_token

  const url = createApiUrlFor().logout

  const res: any = await fetch(url, requestInit).catch((err) =>
    console.error(`ERROR:`, err)
  )

  const status = (await res?.status) ?? 0

  callback(status)
}
