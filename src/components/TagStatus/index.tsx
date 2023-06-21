import { Tag } from 'antd'

import { E_ArticleStatus } from 'models/article'

type T_TagStatus = {
  value: E_ArticleStatus
}

const tagColors: Record<E_ArticleStatus, string> = {
  CHECKED: 'processing',
  DRAFT: 'default',
  PUBLISHED: 'success',
}

export const tagStatusText: Record<E_ArticleStatus, string> = {
  CHECKED: 'Проверяется',
  DRAFT: 'Черновик',
  PUBLISHED: 'Опубликован',
}

export const TagStatus = ({ value }: T_TagStatus) => {
  return <Tag color={tagColors[value]}>{tagStatusText[value]}</Tag>
}
