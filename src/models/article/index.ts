import { T_ArticleId } from 'models/shared/article'
import { I_User } from 'models/user'

enum E_ArticleStatus {
  DRAFT = 'DRAFT',
  CHECKED = 'CHECKED',
  PUBLISHED = 'PUBLISHED',
}

export interface I_Article {
  id: T_ArticleId
  title: string
  content: string
  status: E_ArticleStatus
  author: I_User
  tags: any
  comments: any
  reactions: any
  createdAt: Date
  updatedAt: Date
}

export type T_ArticleRecord = I_Article & {
  key: string
}
