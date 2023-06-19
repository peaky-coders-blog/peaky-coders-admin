import { T_ArticleComment, T_ArticleCommentRecord } from 'models/article'

export const formatToDataSource = <T extends { id: number }>(data: T[]) =>
  data.map((item) => ({ ...item, key: String(item.id) }))

export const formatArticleCommentsToDataSource = (
  data: T_ArticleComment[],
): T_ArticleCommentRecord[] =>
  data.reduce<T_ArticleCommentRecord[]>((acc, cur) => {
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
    console.log('acc', acc)
    return acc
  }, [])
