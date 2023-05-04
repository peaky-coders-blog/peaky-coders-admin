import { useEffect } from 'react'

import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { AppRoutes } from 'routes'
import { authAPI } from 'services/auth'
import { profileActions } from 'store/profile'

export const App = () => {
  const dispatch = useStoreDispatch()
  const { isSuccess, data, isFetching } = authAPI.useCheckQuery()

  // Успешная аутентификация
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(profileActions.signIn(data))
    }
  }, [data, dispatch, isSuccess])

  if (isFetching) return null
  return <AppRoutes />
}
