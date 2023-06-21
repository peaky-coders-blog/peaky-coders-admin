import { UserOutlined, CommentOutlined, CalendarOutlined, CheckOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { Button, Col, Row, Space, Statistic, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { Link, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { tagStatusText } from 'components/TagStatus'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import * as C from 'styles/components'
import { E_FormatDate } from 'utils/helpers/date'

export const ArticleInfo = () => {
  const params = useParams<T_Params>()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    Number(params.articleId),
  )

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data) {
    return (
      <>
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={12} xl={12}>
            <Statistic title={t('viewArticle.info.fields.name')} value={articleData.data.title} />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title={t('viewArticle.info.fields.status')}
              value={tagStatusText[articleData.data.status]}
              prefix={<CheckOutlined />}
            />
          </Col>
        </Row>
        <C.Brick />
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title={t('viewArticle.info.fields.author')}
              value={articleData.data.author.username}
              prefix={<UserOutlined />}
            />
          </Col>

          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title={t('viewArticle.info.fields.comments')}
              value={articleData.data._count?.ArticleComment}
              prefix={<CommentOutlined />}
            />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title={t('viewArticle.info.fields.dateCreated')}
              value={dayjs(articleData.data.createdAt).format(E_FormatDate.extend)}
              prefix={<CalendarOutlined />}
            />
          </Col>

          <Col xs={24} lg={12} xl={6}>
            <Statistic
              title={t('viewArticle.info.fields.dateUpdated')}
              value={dayjs(articleData.data.updatedAt).format(E_FormatDate.extend)}
              prefix={<CalendarOutlined />}
            />
          </Col>
        </Row>
        <C.Brick />
        {articleData.data.tags && (
          <>
            <Typography.Text type='secondary'>{t('viewArticle.info.fields.tags')}</Typography.Text>
            <C.Brick h={8} md={4} />
            <Row>
              <Col xs={24}>
                {articleData.data.tags.map((tag) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </Col>
            </Row>
            <C.Brick />
          </>
        )}
        <Row>
          <Col xs={24} xxl={16}>
            <MDEditor hideToolbar preview='preview' height={800} value={articleData.data.content} />
          </Col>
        </Row>
        <C.Brick />
        <Space>
          <Link to='update'>
            <Button type='primary' size='large'>
              {t('viewArticle.info.actions.update')}
            </Button>
          </Link>
          <Button type='primary' size='large'>
            {t('viewArticle.info.actions.remove')}
          </Button>
        </Space>
      </>
    )
  }

  return <ErrorFeedback />
}
