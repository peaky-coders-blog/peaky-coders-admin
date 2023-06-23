import { I_Comment } from 'models/comment'
import { I_Reaction } from 'models/reaction'
import { I_Tag } from 'models/tags'
import { I_User, T_UserId } from 'models/user'

export type T_ArticleId = number

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
  ArticleReaction?: T_ArticleReaction[]
  ArticleComment?: I_Comment[]
  authorId: T_UserId
  createdAt: Date
  updatedAt: Date
  _count?: {
    ArticleComment: number
  }
}

export interface T_ArticleReaction {
  id: number
  counter: number
  reactionId: number
  articleId: number
  createdAt: Date
  updatedAt: Date
  reaction?: I_Reaction
  authors?: I_User[]
}

export type T_ArticleReactionRecord = T_ArticleReaction & {
  key: string
}

export type T_ArticleRecord = I_Article & {
  key: string
}
