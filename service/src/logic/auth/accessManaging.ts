import { accessFilterIntervalMs } from '../../resources/constances'
import { Access } from './class_access'

let accesses: Array<Access> = []

export const startAccessManaging = () => {
  while (accesses.length > 0) {
    accesses.pop()
  }

  setInterval(() => {
    accesses = accesses.filter((a) => a.checkValidity())
  }, accessFilterIntervalMs)
}

export const existAccess = (access_token: string): boolean => {
  return (
    accesses
      .find((access) => access.getAccessToken() === access_token)
      ?.checkValidity() ?? false
  )
}

export const addNewAccess = (user_id: string): string => {
  const newAccess = new Access(user_id)
  accesses.push(newAccess)
  return newAccess.getAccessToken()
}

export const removeAccess = (access_token: string) => {
  accesses.find((a) => a.getAccessToken() === access_token)?.remove()
  console.log(accesses)
}

export const updateAccess = (access_token: string) => {
  accesses.find((a) => a.getAccessToken() === access_token)?.updateTimestamp()
}

export const getUserIdByAccessToken = (access_token: string): string => {
  return accesses.find((a) => a.getAccessToken() === access_token)?.getUserId()
}
