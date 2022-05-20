import React from 'react'
import { PaletteOptions } from '@mui/material'
import type { RouteObject } from 'react-router-dom'
import {
  THEME_DARK_BACKGROUND_DEFAULT,
  THEME_DARK_BACKGROUND_PAPER,
  THEME_DARK_PRIMARY_MAIN,
  THEME_LIGHT_BACKGROUND_DEFAULT,
  THEME_LIGHT_BACKGROUND_PAPER,
  THEME_LIGHT_PRIMARY_MAIN,
  THEME_LIGHT_TEXT_PRIMARY,
} from './resources'

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
  collection: (collectionName: string) => ({
    page: `${appName} - ${collectionName}`,
    edit: `${appName} - ${collectionName} - Edit`,
  }),
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
      main: THEME_LIGHT_PRIMARY_MAIN,
    },
    background: {
      paper: THEME_LIGHT_BACKGROUND_PAPER,
      default: THEME_LIGHT_BACKGROUND_DEFAULT,
    },
    text: {
      primary: THEME_LIGHT_TEXT_PRIMARY,
    },
  },
  dark: {
    mode: 'dark',
    primary: {
      main: THEME_DARK_PRIMARY_MAIN,
    },
    background: {
      paper: THEME_DARK_BACKGROUND_PAPER,
      default: THEME_DARK_BACKGROUND_DEFAULT,
    },
  },
}

/**
 * Global Variables
 */
export const Global: { [key: string]: any } = {
  statusIntervalTimer: undefined,
}
