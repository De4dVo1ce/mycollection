import {
  Category,
  HelpOutline as Help,
  Login,
  Logout,
  Person,
  Settings,
  Share,
  VpnKey as Register,
} from '@mui/icons-material'
import { NavigationEntry } from './components/AppBase/appValues'
import { createUrlFor } from './createUrlFor'

export const navigationEntries: Array<NavigationEntry> = [
  {
    id: 'login',
    title: 'Login',
    path: createUrlFor().login,
    icon: <Login />,
    showLoggedIn: false,
    showLoggedOut: true,
  },
  {
    id: 'register',
    title: 'Register',
    path: createUrlFor().register,
    icon: <Register />,
    showLoggedIn: false,
    showLoggedOut: true,
  },
  {
    id: 'collections',
    title: 'Collections',
    path: createUrlFor().collections.page,
    icon: <Category />,
    showLoggedOut: false,
    showLoggedIn: true,
  },
  {
    id: 'shared',
    title: 'Shared',
    path: createUrlFor().shares.page,
    icon: <Share />,
    showLoggedOut: false,
    showLoggedIn: true,
  },
  {
    id: 'profile',
    title: 'Profile',
    path: createUrlFor().profile,
    icon: <Person />,
    showLoggedOut: false,
    showLoggedIn: true,
  },
  {
    id: 'settings',
    title: 'Settings',
    path: createUrlFor().settings,
    icon: <Settings />,
    showLoggedOut: true,
    showLoggedIn: true,
  },
  {
    id: 'about',
    title: 'About',
    path: createUrlFor().about,
    icon: <Help />,
    showLoggedOut: true,
    showLoggedIn: true,
  },
  {
    id: 'logout',
    title: 'Logout',
    path: createUrlFor().logout,
    icon: <Logout />,
    showLoggedOut: false,
    showLoggedIn: true,
  },
]
