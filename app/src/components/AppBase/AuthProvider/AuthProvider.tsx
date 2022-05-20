import React from 'react'
import { useNavigate } from 'react-router-dom'
import { status } from '../../../connection/api.auth'
import { createUrlFor } from '../../../createUrlFor'
import { User, removeFromStorage, statusCodes } from '../../../shared'
import { Global } from '../appValues'
import {
  REQUEST_INTEVAL_MS_STATUS,
  STORAGE_KEY_ACCESS_TOKEN,
} from '../resources'

const authProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    authProvider.isAuthenticated = true
    callback()
  },
  signout(callback: VoidFunction) {
    authProvider.isAuthenticated = false
    callback()
  },
}

interface AuthContextType {
  user: User | undefined
  signin: (user: User, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

export const AuthContext = React.createContext<AuthContextType>(null!)

interface AuthProviderProps {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined)

  const navigate = useNavigate()

  const signin = (user: User, callback?: VoidFunction) => {
    return authProvider.signin(() => {
      setUser(user)
      Global.statusIntervalTimer = setInterval(async () => {
        if (user) {
          await status((status) => {
            switch (status) {
              case statusCodes.UNAUTHORIZED:
                setUser(undefined)
                navigate(createUrlFor().login, {
                  replace: true,
                })
                break

              default:
                break
            }
          })
        }
      }, REQUEST_INTEVAL_MS_STATUS)

      if (callback) {
        callback()
      }
    })
  }

  const signout = (callback?: VoidFunction) => {
    return authProvider.signout(() => {
      removeFromStorage(STORAGE_KEY_ACCESS_TOKEN)
      setUser(undefined)

      if (callback) {
        callback()
      }
    })
  }

  React.useEffect(
    () => {
      status((status, user) => {
        if (status === statusCodes.OK) {
          signin(user!)
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
  return React.useContext(AuthContext)
}
