import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { GeneralSection } from 'features/FormUser/components'
import { t } from 'languages'
import { T_UpdateUserForm } from 'models/user/forms'
import { usersAPI } from 'services/users'

export const FormCreateUser = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<T_UpdateUserForm>()

  // Обновление пользователя
  const [fetchCreateUser, { data, isSuccess }] = usersAPI.useCreateUserMutation()

  // Успешное обновление пользователя
  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.updateUser.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/users`)
    }
  }, [isSuccess, data, navigate])

  const handleFinish = (values: T_UpdateUserForm) => {
    fetchCreateUser(values)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFinish}>
      <GeneralSection />
      <Divider />

      <Form.Item>
        <Space>
          <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
            {t('userForm.actions.cancel')}
          </Button>
          <Button size='large' type='primary' htmlType='submit'>
            {t('userForm.actions.save')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
