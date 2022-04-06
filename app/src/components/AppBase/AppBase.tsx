import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom'
import { createUrlFor } from '../../createUrlFor'
import { ContentDiv, NavigationDiv, AppProviderDiv } from './AppBase.styles'
import { NavigationEntry, RoutingEntry } from './appValues'
import AuthProvider, { useAuth } from './AuthProvider/AuthProvider'
import { Loading } from '../../shared'
import { Navigation } from './Navigation'
import { RequireAuth } from './RequireAuth'
import ThemeProvider, { useTheme } from './ThemeProvider/ThemeProvider'
import WindowSizeProvider, {
  useWindowSize,
} from './WindowSizeProvider/WindowSizeProvider'
import SnackbarProvider, {
  useSnackbar,
} from './SnackbarProvider/SnackbarProvider'

const LoginPage = React.lazy(() => import('./Login/Login'))
const RegisterPage = React.lazy(() => import('./Register/Register'))
const LogoutPage = React.lazy(() => import('./Logout/Logout'))
const AboutPage = React.lazy(() => import('./About/About'))
const PageNotFoundPage = React.lazy(() => import('./PageNotFound/PageNotFound'))

interface NavigationAreaProps {
  navigationEntries: Array<NavigationEntry>
  isMobileView: boolean
}
const NavigationArea: React.FC<NavigationAreaProps> = ({
  navigationEntries,
  isMobileView,
}) => {
  const auth = useAuth()

  return (
    <NavigationDiv>
      <Navigation
        navigationEntries={navigationEntries.filter((entry) =>
          auth.user ? entry.showLoggedIn : entry.showLoggedOut
        )}
        isMobileView={isMobileView}
      />
    </NavigationDiv>
  )
}

interface ContentAreaProps {
  appRoutes: Array<RoutingEntry>
}

const ContentArea: React.FC<ContentAreaProps> = ({ appRoutes }) => {
  const snackbarContext = useSnackbar()
  const themeContext = useTheme()

  const routes = [
    ...appRoutes.map((route, index) => {
      if (route.authRequired) {
        return (
          <Route
            key={index}
            {...(route as RouteObject)}
            element={<RequireAuth>{route.element}</RequireAuth>}
          />
        )
      }

      return <Route key={index} {...(route as RouteObject)} />
    }),
  ]

  return (
    <ContentDiv backgroudColor={`${themeContext.theme.background!.default}`}>
      <React.Suspense fallback={<Loading />}>
        <Routes>{routes}</Routes>
      </React.Suspense>

      {snackbarContext.snackbar}
    </ContentDiv>
  )
}

interface BaseProps extends AppBaseProps {}
const Base: React.FC<BaseProps> = ({ navigationEntries, customRoutes }) => {
  const windowSize = useWindowSize()
  const themeContext = useTheme()

  const appRoutes: Array<RoutingEntry> = [
    {
      authRequired: false,
      path: createUrlFor().login,
      element: <LoginPage />,
    },
    {
      authRequired: false,
      path: createUrlFor().register,
      element: <RegisterPage />,
    },
    {
      authRequired: true,
      path: createUrlFor().logout,
      element: <LogoutPage />,
    },
    {
      authRequired: false,
      path: createUrlFor().about,
      element: <AboutPage />,
    },
    {
      authRequired: false,
      element: <PageNotFoundPage />,
      path: createUrlFor().noMatch,
    },
    ...customRoutes,
  ]

  return (
    <MuiThemeProvider
      theme={createTheme({
        palette: {
          mode: themeContext.theme.mode,
          primary: themeContext.theme.primary,
        },
      })}
    >
      <CssBaseline />
      <AppProviderDiv>
        <BrowserRouter>
          <AuthProvider>
            <NavigationArea
              navigationEntries={navigationEntries}
              isMobileView={windowSize.isMobileView}
            />
            <ContentArea appRoutes={appRoutes} />
          </AuthProvider>
        </BrowserRouter>
      </AppProviderDiv>
    </MuiThemeProvider>
  )
}

interface AppBaseProps {
  navigationEntries: Array<NavigationEntry>
  customRoutes: Array<RoutingEntry>
}
const AppBase: React.FC<AppBaseProps> = (props) => {
  return (
    <WindowSizeProvider>
      <SnackbarProvider>
        <ThemeProvider>
          <Base {...props} />
        </ThemeProvider>
      </SnackbarProvider>
    </WindowSizeProvider>
  )
}

export default AppBase
