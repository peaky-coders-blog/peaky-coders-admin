import { CheckOutlined } from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { App, Button, Col, Divider, Form, Input, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

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

export const FormCreateArticle = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()
  const { notification } = App.useApp()

  const [articleForm] = Form.useForm<T_UpdateArticleForm>()
  const [tagForm] = Form.useForm<T_CreateTagArticleForm>()
  const [editorValue, setEditorValue] = useState('')

  // Создание статьи
  const [fetchCreateArticle, { isSuccess: isArticleCreatedSuccess }] =
    articlesAPI.useCreateArticleMutation()

  // Создание тэга
  const [fetchCreateTag, { isSuccess: isTagCreatedSuccess }] = tagsAPI.useCreateTagMutation()

  // Успешное обновление статьи
  useEffect(() => {
    if (isArticleCreatedSuccess) {
      notification.open({
        message: 'Статья успешно создана!',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/articles`)
    }
  }, [isArticleCreatedSuccess, navigate, params.articleId, notification])

  // Успешное добавление тэга
  useEffect(() => {
    if (isTagCreatedSuccess) {
      notification.open({
        message: 'Тэг успешно создан',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isTagCreatedSuccess, notification])

  // Получение тэгов
  const { data: tagsData, isLoading: isTagsLoading } = tagsAPI.useGetTagsQuery(null)

  const handleChangeEditorValue = (value: string | undefined) => {
    setEditorValue(value || '')
  }

  const handleFinishArticle = (values: T_UpdateArticleForm) => {
    fetchCreateArticle({
      ...values,
      authorId: 1,
      content: editorValue,
    })
  }

  const handleFinishTag = (values: T_CreateTagArticleForm) => {
    fetchCreateTag(values)
    tagForm.resetFields()
  }

  if (isTagsLoading) return <Loader relative />

  if (tagsData?.data) {
    return (
      <Form form={articleForm} layout='vertical' onFinish={handleFinishArticle}>
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={14} xl={6}>
            <Form.Item name='title' label='Название' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} lg={10} xl={4}>
            <Form.Item name='status' label='Статус' rules={[{ required: true }]}>
              <Select
                options={Object.entries(tagStatusText).map((status) => ({
                  value: status[0],
                  label: status[1],
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24} xl={14}>
            <Form.Item name='tags' label='Тэги' rules={[{ required: true }]}>
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
            <Link to={`/articles/${params.articleId}`}>
              <Button size='large' type='default' htmlType='button'>
                Отмена
              </Button>
            </Link>
            <Button size='large' type='primary' htmlType='submit'>
              Создать
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }

  return <ErrorFeedback />
}
