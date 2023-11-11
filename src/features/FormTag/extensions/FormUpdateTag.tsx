import { CheckOutlined } from '@ant-design/icons'
import { App, Button, Col, Form, Input, Row, Space } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_Params } from 'models/routes'
import { T_UpdateTagForm } from 'models/tags/forms'
import { tagsAPI } from 'services/tags'
import * as C from 'styles/components'

export const FormUpdateTag = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()
  const { notification } = App.useApp()

  const [tagForm] = Form.useForm<T_UpdateTagForm>()

  // Получение тэга
  const { data: tagData, isLoading: isTagLoading } = tagsAPI.useGetTagQuery(Number(params.tagId))

  // Обновление тэга
  const [fetchUpdateTag, { isSuccess: isTagUpdateSuccess }] = tagsAPI.useUpdateTagMutation()

  // Успешное добавление тэга
  useEffect(() => {
    if (isTagUpdateSuccess) {
      notification.open({
        message: 'Тэг успешно обновлён',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/tags/${params.tagId}`)
    }
  }, [isTagUpdateSuccess, navigate, notification, params.tagId])

  const handleFinish = (values: T_UpdateTagForm) => {
    fetchUpdateTag({ tagId: Number(params.tagId), body: values })
  }

  if (isTagLoading) return <Loader relative />

  if (tagData?.data) {
    return (
      <Form
        form={tagForm}
        layout='vertical'
        onFinish={handleFinish}
        initialValues={{
          name: tagData.data.name,
          icon: tagData.data.icon,
          description: tagData.data.description,
        }}
      >
        <Row gutter={[32, 16]}>
          <Col span={12}>
            <Form.Item name='name' label='Заголовок' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='icon'
              label='Иконка'
              help={
                <a href='https://devicon.dev' target='_blank' rel='noreferrer'>
                  devicon.dev
                </a>
              }
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='description' label='Описание'>
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <C.Brick />

        <Form.Item>
          <Space>
            <Link to={`/articles/${params.articleId}`}>
              <Button size='large' type='default' htmlType='button'>
                Отмена
              </Button>
            </Link>
            <Button size='large' type='primary' htmlType='submit'>
              Сохранить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }

  return <ErrorFeedback />
}
