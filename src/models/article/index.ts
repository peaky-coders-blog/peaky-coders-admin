import { I_ArticleReaction } from 'models/reaction'
import { T_ArticleId } from 'models/shared/article'
import { T_UserId } from 'models/shared/user'
import { I_Tag } from 'models/tags'
import { I_User } from 'models/user'

export enum E_ArticleStatus {
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
  tags?: I_Tag[]
  ArticleReaction?: I_ArticleReaction[]
  authorId: T_UserId
  createdAt: Date
  updatedAt: Date
  _count?: {
    ArticleComment: number
  }
}

export type T_ArticleRecord = I_Article & {
  key: string
}
