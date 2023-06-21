import { E_ArticleStatus } from 'models/article'
import { T_TagId } from 'models/tags'

export type T_GetArticlesDto = {
  page?: unknown
  limit?: unknown
  sort?: unknown
  filter?: unknown
}

export type T_UpdateArticleDto = {
  title: string
  status: E_ArticleStatus
  tags: T_TagId[]
  content: string
}
