import { UserOutlined, CommentOutlined, CalendarOutlined } from '@ant-design/icons'
import { Col, Row, Statistic } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import { E_FormatDate } from 'utils/helpers/date'

export const ArticleStatistic = () => {
  const params = useParams<T_Params>()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    params.articleId!,
  )

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data) {
    return (
      <Row gutter={[16, 4]}>
        <Col xs={24} lg={12} xl={6}>
          <Statistic
            title='Автор'
            value={articleData.data.author.username}
            prefix={<UserOutlined />}
          />
        </Col>

        <Col xs={24} lg={12} xl={6}>
          <Statistic
            title='Комментарии'
            value={articleData.data._count?.ArticleComment}
            prefix={<CommentOutlined />}
          />
        </Col>
        <Col xs={24} lg={12} xl={6}>
          <Statistic
            title='Дата создания'
            value={dayjs(articleData.data.createdAt).format(E_FormatDate.extend)}
            prefix={<CalendarOutlined />}
          />
        </Col>

        <Col xs={24} lg={12} xl={6}>
          <Statistic
            title='Дата последнего обновления'
            value={dayjs(articleData.data.updatedAt).format(E_FormatDate.extend)}
            prefix={<CalendarOutlined />}
          />
        </Col>
      </Row>
    )
  }

  return <ErrorFeedback />
}
