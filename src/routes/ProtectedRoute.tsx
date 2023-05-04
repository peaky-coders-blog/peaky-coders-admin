import { Outlet } from 'react-router-dom'

import { useStoreSelector } from 'hooks/useStoreSelector'
import { AuthLayout } from 'layouts/Auth'
import { DashboardLayout } from 'layouts/Dashboard'

export const ProtectedRoute = () => {
  const isAuth = useStoreSelector((state) => state.profile.isAuth)

  if (isAuth) {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    )
  }

  return <AuthLayout />
}
