import { Button, Input, Typography, Form, Divider } from 'antd'
import { useEffect } from 'react'

import { I_AuthForm } from './models/form'
import * as S from './styles'

import { useStoreDispatch } from 'hooks/useStoreDispatch'
import { t } from 'languages'
import { authAPI } from 'services/auth'
import { profileActions } from 'store/profile'

export const AuthLayout = () => {
  const dispatch = useStoreDispatch()
  const [fetchSignIn, { data, isSuccess }] = authAPI.useSignInMutation()

  const [form] = Form.useForm<I_AuthForm>()

  const handleSingIn = (values: I_AuthForm) => {
    fetchSignIn(values)
  }

  // Успешная аутентификация
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(profileActions.signIn(data))
    }
  }, [data, dispatch, isSuccess])

  return (
    <S.Layout>
      <S.AuthForm>
        <Typography.Title level={3}>{t('app.title')}</Typography.Title>
        <Divider />
        <Form autoComplete='off' layout='vertical' form={form} onFinish={handleSingIn}>
          <Form.Item label={t('auth.form.email.label')} name='email' rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label={t('auth.form.password.label')}
            name='password'
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Divider />

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              {t('auth.form.signIn')}
            </Button>
          </Form.Item>
        </Form>
      </S.AuthForm>
    </S.Layout>
  )
}
