import { CheckOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { Button, Col, Divider, Form, Input, Row, Select, Space, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { tagStatusText } from 'components/TagStatus'
import { t } from 'languages'
import { T_UpdateArticleForm } from 'models/article/forms'
import { T_Params } from 'models/routes'
import { T_CreateTagArticleForm } from 'models/tags/forms'
import { articlesAPI } from 'services/articles'
import { tagsAPI } from 'services/tags'
import * as C from 'styles/components'
import { articleToFormUpdate } from 'utils/forms/articles'

export const FormUpdateArticle = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [articleForm] = Form.useForm<T_UpdateArticleForm>()
  const [tagForm] = Form.useForm<T_CreateTagArticleForm>()
  const [editorValue, setEditorValue] = useState('')

  // Обновление статьи
  const [fetchUpdateArticle, { data, isSuccess: isArticleUpdatedSuccess }] =
    articlesAPI.useUpdateArticleMutation()

  // Создание тэга
  const [fetchCreateTag, { isSuccess: isTagCreatedSuccess }] = tagsAPI.useCreateTagMutation()

  // Успешное обновление админа
  useEffect(() => {
    if (data && isArticleUpdatedSuccess) {
      notification.open({
        message: t('notifications.updateArticle.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/articles${params.articleId}`)
    }
  }, [isArticleUpdatedSuccess, data, navigate, params.articleId])

  // Успешное добавление тэга
  useEffect(() => {
    if (isTagCreatedSuccess) {
      notification.open({
        message: t('notifications.createTag.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isTagCreatedSuccess])

  // Получение статьи
  const {
    data: articleData,
    isLoading: isArticleLoading,
    isSuccess: isArticleSuccess,
  } = articlesAPI.useGetArticleQuery(Number(params.articleId))

  // Получение тэгов
  const { data: tagsData, isLoading: isTagsLoading } = tagsAPI.useGetTagsQuery(null)

  useEffect(() => {
    if (isArticleSuccess && articleData.data) {
      setEditorValue(articleData.data.content)
    }
  }, [articleData, isArticleSuccess])

  const handleChangeEditorValue = (value: string | undefined) => {
    setEditorValue(value || '')
  }

  const handleFinishArticle = (values: T_UpdateArticleForm) => {
    console.log('values', values)
    // fetchUpdateAdmin({ body: values, adminId: params.adminId! })
  }

  const handleFinishTag = (values: T_CreateTagArticleForm) => {
    fetchCreateTag(values)
    tagForm.resetFields()
  }

  const handleCancel = () => {
    navigate(`/articles`)
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
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={14} xl={6}>
            <Form.Item
              name='title'
              label={t('articleForm.fields.title')}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={10} xl={4}>
            <Form.Item
              name='status'
              label={t('articleForm.fields.status')}
              rules={[{ required: true }]}
            >
              <Select
                options={Object.entries(tagStatusText).map((status) => ({
                  value: status[0],
                  label: status[1],
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24} xl={14}>
            <Form.Item
              name='tags'
              label={t('articleForm.fields.tags')}
              rules={[{ required: true }]}
            >
              <Select
                mode='multiple'
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Form form={tagForm} onFinish={handleFinishTag}>
                      <Row gutter={[16, 4]} style={{ padding: '0 8px 4px' }}>
                        <Col xs={14} lg={10}>
                          <Form.Item name='name' rules={[{ required: true }]}>
                            <Input onKeyDown={(e) => e.stopPropagation()} placeholder='Название' />
                          </Form.Item>
                        </Col>
                        <Col xs={10} lg={4}>
                          <Button type='primary' htmlType='submit'>
                            Добавить
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </>
                )}
                options={tagsData.data.map((tag) => ({ value: tag.id, label: tag.name }))}
                allowClear
                style={{ width: '100%' }}
                placeholder='Тэги'
              />
            </Form.Item>
          </Col>
        </Row>
        <C.Brick />
        <MDEditor height={800} value={editorValue} onChange={handleChangeEditorValue} />
        <C.Brick />
        <Form.Item>
          <Space>
            <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
              {t('adminForm.actions.cancel')}
            </Button>
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
