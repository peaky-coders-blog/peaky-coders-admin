import MDEditor from '@uiw/react-md-editor'
import { Button, Col, Form, Input, Row, Select, Space, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import { articlesAPI } from 'services/articles'
import * as C from 'styles/components'

export const FormUpdateArticle = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [editorValue, setEditorValue] = useState('')

  const handleChangeEditorValue = (value: string | undefined) => {
    setEditorValue(value || '')
  }

  // Получение статьи
  const {
    data: articleData,
    isLoading: isArticleLoading,
    isSuccess: isArticleSuccess,
  } = articlesAPI.useGetArticleQuery(params.articleId!)

  useEffect(() => {
    if (isArticleSuccess && articleData.data) {
      setEditorValue(articleData.data.content)
    }
  }, [articleData, isArticleSuccess])

  const handleCancel = () => {
    navigate(-1)
  }

  if (isArticleLoading) return <Loader relative />

  if (articleData?.data) {
    return (
      <Form layout='vertical'>
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
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
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
                allowClear
                style={{ width: '100%' }}
                placeholder='Please select'
                defaultValue={['a10', 'c12']}
              />
            </Form.Item>
          </Col>
        </Row>
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
