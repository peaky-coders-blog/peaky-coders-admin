export enum E_Routes {
  users = '/users',
  createUser = '/users/create',
  updateUser = '/users/update/:userId',
  admins = '/admins',
  createAdmin = '/admins/create',
  updateAdmin = '/admins/update/:adminId',
  articles = '/articles',
  createArticle = '/articles/create',
  updateArticle = '/articles/update/:articleId',
  tags = '/tags',
  reactions = '/reactions',
}

export type T_Params = {
  userId: string
  adminId: string
  eventId: string
  roleId: string
}
