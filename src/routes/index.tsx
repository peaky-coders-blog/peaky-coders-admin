import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'

import useScrollToTop from 'hooks/useScrollToTop'
import { E_Routes } from 'models/routes'
import * as Pages from 'pages'

export const AppRoutes = () => {
  useScrollToTop()
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={E_Routes.users} element={<Pages.Users />} />
        <Route path={E_Routes.createUser} element={<Pages.CreateUser />} />
        <Route path={E_Routes.updateUser} element={<Pages.UpdateUser />} />
        <Route path={E_Routes.admins} element={<Pages.Admins />} />
        <Route path={E_Routes.createAdmin} element={<Pages.CreateAdmin />} />
        <Route path={E_Routes.updateAdmin} element={<Pages.UpdateAdmin />} />
        <Route path={E_Routes.articles} element={<Pages.Articles />} />
        <Route path={E_Routes.createArticle} element={<Pages.CreateArticle />} />
        <Route path={E_Routes.updateArticle} element={<Pages.UpdateArticle />} />
        <Route path={E_Routes.viewArticle} element={<Pages.ViewArticle />} />
        <Route path={E_Routes.tags} element={<Pages.Tags />} />
        <Route path={E_Routes.createTags} element={<Pages.CreateTag />} />
        <Route path={E_Routes.reactions} element={<Pages.Reactions />} />
      </Route>
      <Route path='*' element={<Navigate to={E_Routes.articles} />} />
    </Routes>
  )
}
