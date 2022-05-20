import { ENV } from './app.config'

const SERVICE_PORT = ENV.SERVICEPORT

interface ApiConfig {
  url: string
  port: number
}

export const apiConfig = (): ApiConfig => ({
  url: document.location.origin.replace(`:${document.location.port}`, ``),
  port: SERVICE_PORT,
})

export const requestInitTemplate = (method: string): RequestInit => ({
  method: method,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
})
