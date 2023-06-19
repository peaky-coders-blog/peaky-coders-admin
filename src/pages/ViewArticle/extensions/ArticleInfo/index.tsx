import {
  UserOutlined,
  CommentOutlined,
  CalendarOutlined,
  FontSizeOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { Button, Col, Row, Statistic } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

import { useTheme } from 'styled-components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import * as C from 'styles/components'
import { E_FormatDate } from 'utils/helpers/date'

export const ArticleInfo = () => {
  const params = useParams<T_Params>()
  const theme = useTheme()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    params.articleId!,
  )

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data) {
    return (
      <>
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title='Название'
              value={articleData.data.title}
              prefix={<FontSizeOutlined />}
            />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic title='Статус' value={articleData.data.status} prefix={<CheckOutlined />} />
          </Col>
        </Row>
        <C.Brick />
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
        <C.Brick />
        <Row>
          <Col xl={24} xxl={12}>
            <MDEditor hideToolbar preview='preview' height={800} value={articleData.data.content} />
          </Col>
        </Row>
        <C.Brick />
        <Button size='large' type='default' htmlType='button'>
          Редактировать
        </Button>
      </>
    )
  }

  return <ErrorFeedback />
}
