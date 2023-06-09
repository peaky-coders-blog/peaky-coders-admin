import { CheckOutlined } from '@ant-design/icons'
import { Button, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { GeneralSection } from '../../components'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UpdateAdminForm } from 'models/admin/forms'
import { T_Params } from 'models/routes'
import { adminsAPI } from 'services/admins'
import * as C from 'styles/components'
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

  // Получение админа
  const { data: adminData, isLoading: isAdminLoading } = adminsAPI.useGetAdminQuery(
    Number(params.adminId),
  )

  const handleFinish = (values: T_UpdateAdminForm) => {
    fetchUpdateAdmin({ body: values, adminId: params.adminId! })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (isAdminLoading) return <Loader relative />

  if (adminData?.data) {
    return (
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        initialValues={adminToFormUpdate(adminData.data)}
      >
        <GeneralSection />
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
