import { I_Comment, T_CommentRecord } from 'models/comment'

export const formatToDataSource = <T extends { id: number }>(data: T[]) =>
  data.map((item) => ({ ...item, key: String(item.id) }))

export const formatArticleCommentsToDataSource = (data: I_Comment[]): T_CommentRecord[] =>
  data.reduce<T_CommentRecord[]>((acc, cur) => {
    if (cur.parentId) {
      const parentCommentIndex = acc.findIndex((item) => item.id === cur.parentId)
      if (parentCommentIndex >= 0) {
        acc[parentCommentIndex].children = [
          ...(acc[parentCommentIndex].children || []),
          { ...cur, key: String(cur.id) },
        ]
      }
    } else {
      acc.push({ ...cur, key: String(cur.id) })
    }
    return acc
  }, [])
