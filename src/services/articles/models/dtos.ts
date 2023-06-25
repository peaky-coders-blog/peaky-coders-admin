import { E_ArticleStatus } from 'models/article'
import { T_TagId } from 'models/tags'
import { T_UserId } from 'models/user'

export type T_GetArticlesDto = {
  page?: unknown
  limit?: unknown
  sort?: unknown
  filter?: unknown
}

export type T_CreateArticleDto = {
  title: string
  content: string
  status: E_ArticleStatus
  tags: T_TagId[]
  authorId: T_UserId
}

export type T_UpdateArticleDto = {
  title: string
  status: E_ArticleStatus
  tags: T_TagId[]
  content: string
}
