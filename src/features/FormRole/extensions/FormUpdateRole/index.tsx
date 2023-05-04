import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, message, notification, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { GeneralSection, PermissionsSection } from '../../components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_CreateRoleForm } from 'models/roles/form'
import { T_Params } from 'models/routes'
import { rolesAPI } from 'services/roles'

export const FormUpdateRole = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [form] = Form.useForm<T_CreateRoleForm>()
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  // Обновление роли
  const [fetchUpdateRole, { data, isSuccess }] = rolesAPI.useUpdateRoleMutation()

  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.updateRole.success'),
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
    const body = {
      ...values,
      permissions,
    }
    fetchUpdateRole({ body, roleId: params.roleId! })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  // Получение роли
  const {
    data: roleData,
    isFetching: isRoleFetching,
    isSuccess: isRoleSuccess,
  } = rolesAPI.useGetRoleQuery(params.roleId!)

  const handlePermissionsChange = (permissions: string[]) => {
    setSelectedPermissions(permissions)
  }

  useEffect(() => {
    if (isRoleSuccess && roleData?.data) {
      setSelectedPermissions(roleData.data.permissions)
    }
  }, [isRoleSuccess, roleData])

  // Если параметр адресной строки не найден
  if (!params.roleId) return <Navigate to='/roles' />

  if (isRoleFetching) return <Loader relative />

  if (roleData) {
    return (
      <Form form={form} layout='vertical' onFinish={handleFinish} initialValues={roleData.data}>
        <GeneralSection />
        <PermissionsSection onChange={handlePermissionsChange} value={selectedPermissions} />
        <Divider />
        <Form.Item>
          <Space>
            <Button onClick={handleCancel} size='large' type='default' htmlType='button'>
              {t('roleForm.actions.cancel')}
            </Button>
            <Button size='large' type='primary' htmlType='submit'>
              {t('roleForm.actions.save')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }

  return <ErrorFeedback relative />
}
