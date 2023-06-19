import { Table } from 'antd'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import { formatArticleCommentsToDataSource, formatToDataSource } from 'utils/helpers/table'

export const ArticleCommentsTable = () => {
  const params = useParams<T_Params>()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    params.articleId!,
  )

  console.log('articleData', articleData?.data?.ArticleComment)
  if (isArticleLoading) return <Loader relative />

  if (articleData?.data?.ArticleComment) {
    const dataTable = formatArticleCommentsToDataSource(articleData?.data?.ArticleComment)
    console.log('dataTable', dataTable)
    return <Table columns={getColumns()} dataSource={dataTable} bordered />
  }

  return <ErrorFeedback relative />
}
