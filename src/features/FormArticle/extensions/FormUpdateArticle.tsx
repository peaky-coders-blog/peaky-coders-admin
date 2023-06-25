import { CheckOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { App, Button, Form, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { GeneralSection } from '../components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UpdateArticleForm } from 'models/article/forms'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import { tagsAPI } from 'services/tags'
import * as C from 'styles/components'
import { articleToFormUpdate } from 'utils/forms/articles'

export const FormUpdateArticle = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()
  const { notification } = App.useApp()

  const [articleForm] = Form.useForm<T_UpdateArticleForm>()
  const [editorValue, setEditorValue] = useState('')

  // Обновление статьи
  const [fetchUpdateArticle, { isSuccess: isArticleUpdatedSuccess }] =
    articlesAPI.useUpdateArticleMutation()

  // Успешное обновление статьи
  useEffect(() => {
    if (isArticleUpdatedSuccess) {
      notification.open({
        message: t('notifications.updateArticle.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/articles/${params.articleId}`)
    }
  }, [isArticleUpdatedSuccess, navigate, params.articleId, notification])

  // Получение статьи
  const {
    data: articleData,
    isLoading: isArticleLoading,
    isSuccess: isArticleSuccess,
  } = articlesAPI.useGetArticleQuery(Number(params.articleId))

  // Получение тэгов
  const { data: tagsData, isLoading: isTagsLoading } = tagsAPI.useGetTagsQuery(null)

  // Присвоение контента md редактору
  useEffect(() => {
    if (isArticleSuccess && articleData.data) {
      setEditorValue(articleData.data.content)
    }
  }, [articleData, isArticleSuccess])

  const handleChangeEditorValue = (value: string | undefined) => {
    setEditorValue(value || '')
  }

  const handleFinishArticle = (values: T_UpdateArticleForm) => {
    fetchUpdateArticle({
      articleId: Number(params.articleId),
      body: {
        ...values,
        content: editorValue,
      },
    })
  }

  if (isArticleLoading || isTagsLoading) return <Loader relative />

  if (articleData?.data && tagsData?.data) {
    return (
      <Form
        form={articleForm}
        layout='vertical'
        initialValues={articleToFormUpdate(articleData.data)}
        onFinish={handleFinishArticle}
      >
        <GeneralSection tags={tagsData.data} />
        <C.Brick />
        <MDEditor height={800} value={editorValue} onChange={handleChangeEditorValue} />
        <C.Brick />
        <Form.Item>
          <Space>
            <Link to={`/articles/${params.articleId}`}>
              <Button size='large' type='default' htmlType='button'>
                {t('adminForm.actions.cancel')}
              </Button>
            </Link>
            <Button size='large' type='primary' htmlType='submit'>
              {t('adminForm.actions.save')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }

  return <ErrorFeedback />
}
