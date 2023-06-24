import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { App, Modal, Table } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_CommentId } from 'models/comment'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import { formatArticleCommentsToDataSource } from 'utils/helpers/table'

export const ArticleCommentsTable = () => {
  const params = useParams<T_Params>()
  const { notification } = App.useApp()

  // Получение статьи
  const { data: articleData, isLoading: isArticleLoading } = articlesAPI.useGetArticleQuery(
    Number(params.articleId!),
  )

  // Удаление комментария
  const [fetchDeleteArticleComment, { isSuccess: isDeleteArticleComment }] =
    articlesAPI.useDeleteArticleCommentMutation()

  const handleDelete = (commentId: T_CommentId) => {
    Modal.confirm({
      title: t('modal.confirm.deleteArticleComment.title') + ` ID:${commentId}`,
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.deleteArticleComment.content'),
      okText: t('modal.confirm.deleteArticleComment.ok'),
      cancelText: t('modal.confirm.deleteArticleComment.cancel'),
      maskClosable: true,
      onOk: () => {
        fetchDeleteArticleComment(commentId)
      },
    })
  }

  useEffect(() => {
    if (isDeleteArticleComment) {
      notification.open({
        message: t('notifications.deleteArticleComment.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isDeleteArticleComment, notification])

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data?.ArticleComment) {
    const dataTable = formatArticleCommentsToDataSource(articleData?.data?.ArticleComment)
    return (
      <Table columns={getColumns({ onDelete: handleDelete })} dataSource={dataTable} bordered />
    )
  }

  return <ErrorFeedback relative />
}
