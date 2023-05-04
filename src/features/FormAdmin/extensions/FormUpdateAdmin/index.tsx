import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { GeneralSection } from '../../components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UpdateAdminForm } from 'models/admin/forms'
import { T_Params } from 'models/routes'
import { adminsAPI } from 'services/admins'
import { adminToFormUpdate } from 'utils/forms/admins'

export const FormUpdateAdmin = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [form] = Form.useForm<T_UpdateAdminForm>()

  // Обновление админа
  const [fetchUpdateAdmin, { data, isSuccess }] = adminsAPI.useUpdateAdminMutation()

  // Успешное обновление админа
  useEffect(() => {
    if (data && isSuccess) {
      notification.open({
        message: t('notifications.updateAdmin.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/admins`)
    }
  }, [isSuccess, data, navigate])

  // Если параметр адресной строки не найден
  if (!params.adminId) return <Navigate to='/admins' />

  // Получение админа
  const { data: adminData, isFetching: isAdminFetching } = adminsAPI.useGetAdminQuery(
    Number(params.adminId),
  )

  const handleFinish = (values: T_UpdateAdminForm) => {
    fetchUpdateAdmin({ body: values, adminId: params.adminId! })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (isAdminFetching) return <Loader relative />

  if (adminData?.data) {
    return (
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        initialValues={adminToFormUpdate(adminData.data)}
      >
        <GeneralSection />

        <Divider />
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
