import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { App, Col, Modal, Table } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import { formatToDataSource } from 'utils/helpers/table'

export const ArticleReactionsTable = () => {
  const params = useParams<T_Params>()
  const { notification } = App.useApp()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    Number(params.articleId!),
  )

  // Удаление комментария
  const [fetchDeleteArticleAuthorReaction, { isSuccess: isDeleteArticleComment }] =
    articlesAPI.useDeleteArticleAuthorReactionMutation()

  const handleDelete = (reactionId: number, authorId: number) => {
    Modal.confirm({
      title: t('modal.confirm.deleteArticleAuthorReaction.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.deleteArticleAuthorReaction.content'),
      okText: t('modal.confirm.deleteArticleAuthorReaction.ok'),
      cancelText: t('modal.confirm.deleteArticleAuthorReaction.cancel'),
      maskClosable: true,
      onOk: () => {
        fetchDeleteArticleAuthorReaction({ authorId, reactionId })
      },
    })
  }

  useEffect(() => {
    if (isDeleteArticleComment) {
      notification.open({
        message: t('notifications.deleteArticleAuthorReaction.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isDeleteArticleComment, notification])

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data?.ArticleReaction) {
    return (
      <>
        {articleData.data.ArticleReaction.map((item) => {
          if (item.authors) {
            const dataTable = formatToDataSource(item.authors)
            const onDelete = (authorId: number) => {
              handleDelete(item.id, authorId)
            }
            return (
              <Col xs={24} lg={12} xl={6} key={item.id}>
                <h4>
                  {item.reaction?.icon} ({item.counter})
                </h4>
                <Table columns={getColumns({ onDelete })} dataSource={dataTable} bordered />
              </Col>
            )
          }
        })}
      </>
    )
  }

  return <ErrorFeedback relative />
}
