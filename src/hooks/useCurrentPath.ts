import { matchRoutes, useLocation } from 'react-router-dom'

import { E_Routes } from 'models/routes'

const routes = Object.values(E_Routes).map((route) => ({ path: route }))

export const useCurrentPath = (): E_Routes => {
  const location = useLocation()
  const match = matchRoutes(routes, location)

  if (match) {
    if (match[0].route.path) return match[0].route.path as E_Routes
  }
  return E_Routes.users
}
