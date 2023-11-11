import { CheckOutlined } from '@ant-design/icons'
import { App, Button, Col, Form, Input, Row, Space } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { T_CreateTagForm } from 'models/tags/forms'
import { tagsAPI } from 'services/tags'
import * as C from 'styles/components'

export const FormCreateTag = () => {
  const navigate = useNavigate()
  const { notification } = App.useApp()

  const [tagForm] = Form.useForm<T_CreateTagForm>()

  // Создание тэга
  const [fetchCreateTag, { isSuccess: isTagCreatedSuccess }] = tagsAPI.useCreateTagMutation()

  // Успешное добавление тэга
  useEffect(() => {
    if (isTagCreatedSuccess) {
      notification.open({
        message: 'Тэг успешно создан',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/tags`)
    }
  }, [isTagCreatedSuccess, navigate, notification])

  const handleFinish = (values: T_CreateTagForm) => {
    console.log(values)
    fetchCreateTag(values)
  }

  return (
    <Form form={tagForm} layout='vertical' onFinish={handleFinish}>
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
          <Link to='/tags'>
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
