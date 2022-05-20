export const setToStorage = (key: string, value: object): void => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getFromStorage = (key: string): object => {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : value
}

export const removeFromStorage = (key: string): void => {
  window.localStorage.removeItem(key)
}
