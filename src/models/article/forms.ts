import { I_Article } from '.'

export type T_ArticleForm = Pick<I_Article, 'title' | 'status' | 'content'>

export type T_UpdateArticleForm = T_ArticleForm & {
  tags: number[]
}
