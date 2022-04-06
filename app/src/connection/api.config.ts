interface ApiConfig {
  url: string
  port: number
}

export const apiConfig = (): ApiConfig => ({
  url: window.location.origin.replace(`:${window.location.port}`, ``),
  port: 4001,
})

export const requestInitTemplate = (): RequestInit => ({
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
})
