import { CheckOutlined } from '@ant-design/icons'
import { Button, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { GeneralSection, PasswordSection } from '../../components'

import { t } from 'languages'
import { T_CreateAdminForm } from 'models/admin/forms'
import { adminsAPI } from 'services/admins'
import * as C from 'styles/components'
import { formCreateToAdmin } from 'utils/forms/admins'

export const FormCreateAdmin = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<T_CreateAdminForm>()

  // Создание админа
  const [fetchCreateAdmin, { data, isSuccess }] = adminsAPI.useCreateAdminMutation()

  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.createAdmin.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/admins`)
    }
  }, [isSuccess, data, navigate])

  const handleFinish = (values: T_CreateAdminForm) => {
    const body = formCreateToAdmin(values)
    fetchCreateAdmin(body)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFinish}>
      <GeneralSection />
      <PasswordSection />

      <C.Brick />
      <Form.Item>
        <Space>
          <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
            {t('adminForm.actions.cancel')}
          </Button>
          <Button size='large' type='primary' htmlType='submit'>
            {t('adminForm.actions.create')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
