import { Col, Table } from 'antd'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import { formatToDataSource } from 'utils/helpers/table'

export const ArticleReactionsTable = () => {
  const params = useParams<T_Params>()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    params.articleId!,
  )

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data?.ArticleReaction) {
    return (
      <>
        {articleData.data.ArticleReaction.map((item) => {
          if (item.authors) {
            const dataTable = formatToDataSource(item.authors)
            return (
              <Col xs={24} lg={12} xl={6} key={item.id}>
                <h4>
                  {item.reaction?.icon} ({item.counter})
                </h4>
                <Table columns={getColumns()} dataSource={dataTable} bordered />
              </Col>
            )
          }
        })}
      </>
    )
  }

  return <ErrorFeedback relative />
}
