import { CheckOutlined } from '@ant-design/icons'
import { Button, Divider, Form, notification, Space } from 'antd'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { GeneralSection } from 'features/FormUser/components'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import { T_UpdateUserForm } from 'models/user/forms'
import { usersAPI } from 'services/users'

export const FormUpdateUser = () => {
  const navigate = useNavigate()
  const params = useParams<T_Params>()

  const [form] = Form.useForm<T_UpdateUserForm>()

  // Обновление пользователя
  const [fetchUpdateUser, { data, isSuccess }] = usersAPI.useUpdateUserMutation()

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

  // Если параметр адресной строки не найден
  if (!params.userId) return <Navigate to='/users' />

  // Получение пользователя
  const { data: userData, isFetching: isUserFetching } = usersAPI.useGetUserQuery(
    Number(params.userId),
  )

  const handleFinish = (values: T_UpdateUserForm) => {
    fetchUpdateUser({ user: values, userId: Number(params.userId) })
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (isUserFetching) return <Loader relative />

  if (userData?.data) {
    return (
      <Form form={form} layout='vertical' onFinish={handleFinish} initialValues={userData.data}>
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
  return <ErrorFeedback relative />
}
