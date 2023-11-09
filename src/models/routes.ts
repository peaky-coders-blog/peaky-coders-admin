export enum E_Routes {
  users = '/users',
  createUser = '/users/create',
  updateUser = '/users/update/:userId',
  admins = '/admins',
  createAdmin = '/admins/create',
  updateAdmin = '/admins/update/:adminId',
  articles = '/articles',
  createArticle = '/articles/create',
  viewArticle = '/articles/:articleId',
  updateArticle = '/articles/:articleId/update',
  tags = '/tags',
  createTags = '/tags/create',
  reactions = '/reactions',
}

export type T_Params = {
  userId: string
  adminId: string
  articleId: string
}
