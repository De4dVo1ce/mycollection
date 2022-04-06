import React from 'react'
import { PaletteOptions } from '@mui/material'
import type { RouteObject } from 'react-router-dom'

/**
 * Document name
 */
export const appName = `MyCollection`
export const documentNames = {
  app: `${appName}`,
  login: `${appName} - Login`,
  register: `${appName} - Register`,
  logout: `${appName} - Logout`,
  collections: `${appName} - Collections`,
  collection: (collectionName: string) => `${appName} - ${collectionName}`,
  shared: `${appName} - Shared`,
  sharedCollection: (collectionName: string) =>
    collectionName.length > 0 ? `${appName} - ${collectionName}` : `${appName}`,
  profile: `${appName} - Profile`,
  settings: `${appName} - Settings`,
  about: `${appName} - About`,
  pageNotFound: `${appName} - Page not found`,
}

/**
 * Type definitions
 */
export interface NavigationEntry {
  showLoggedIn: Boolean
  showLoggedOut?: boolean
  id: string
  title: string
  path: string
  icon: JSX.Element
}

export type RoutingEntry = RouteObject & {
  authRequired: boolean
  element: React.ReactNode
  path: string
}

export type AccessToken = { access_token: string }

/**
 * Objects definitions
 */
export interface CustomTheme {
  light: PaletteOptions
  dark: PaletteOptions
}
export const themes: CustomTheme = {
  light: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    background: {
      paper: '#ffffff',
      default: '#eeeeee',
    },
    text: {
      primary: '#0a1929',
    },
  },
  dark: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    background: {
      paper: '#555555',
      default: '#000000',
    },
  },
}

/**
 * Global Variables
 */
export const Global: { [key: string]: any } = {
  statusIntervalTimer: undefined,
}
