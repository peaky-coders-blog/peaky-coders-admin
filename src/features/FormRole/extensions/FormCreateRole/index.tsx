import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, message, notification, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GeneralSection, PermissionsSection } from '../../components'

import { t } from 'languages'
import { T_CreateRoleForm } from 'models/roles/form'
import { rolesAPI } from 'services/roles'

export const FormCreateRole = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<T_CreateRoleForm>()
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  // Создание роли
  const [fetchCreateRole, { data, isSuccess }] = rolesAPI.useCreateRoleMutation()

  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.createRole.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/roles`)
    }
  }, [isSuccess, data, navigate])

  const handleFinish = (values: T_CreateRoleForm) => {
    if (!selectedPermissions.length) {
      message.info(t('roleForm.messages.select'))
      return
    }
    const permissions = selectedPermissions.filter((value) => value.includes('.'))
    const body = { ...values, permissions }
    fetchCreateRole(body)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handlePermissionsChange = (permissions: string[]) => {
    setSelectedPermissions(permissions)
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFinish}>
      <GeneralSection />
      <PermissionsSection onChange={handlePermissionsChange} value={selectedPermissions} />
      <Divider />
      <Form.Item>
        <Space>
          <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
            {t('roleForm.actions.cancel')}
          </Button>
          <Button size='large' type='primary' htmlType='submit'>
            {t('roleForm.actions.create')}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
