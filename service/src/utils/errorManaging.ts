import { ServiceCallbackFunction } from '../types'

export const callError = (
  status: number,
  callback: ServiceCallbackFunction,
  err: Error
) => {
  console.error(new Date(), `${status}: ${err}`)
  callback(status)
}
