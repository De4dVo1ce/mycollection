import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { createUrlFor } from '../../../createUrlFor'
import { useAuth } from '../AuthProvider'

interface RequireAuthProps {}
export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  if (auth.user === undefined) {
    return (
      <Navigate to={createUrlFor().login} state={{ from: location }} replace />
    )
  }

  return <>{children}</>
}

export default RequireAuth
