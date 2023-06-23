import { I_User } from 'models/user'

export type T_CommentId = number

export type I_Comment = {
  articleId: number
  authorId: number
  createdAt: Date
  updatedAt: Date
  id: T_CommentId
  parentId: number
  text: string
  votes: number
  author?: I_User
}

export type T_CommentRecord = I_Comment & {
  key: string
  children?: T_CommentRecord[]
}
