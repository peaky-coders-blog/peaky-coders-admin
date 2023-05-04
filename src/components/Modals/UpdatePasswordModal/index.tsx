import { Button, Form, Input, Modal } from 'antd'

import { t } from 'languages'
import { T_ChangePassword } from 'models/user/forms'

interface UpdatePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onOk: (value: string) => void
  isLoading: boolean
}

export const UpdatePasswordModal = ({
  isOpen,
  onClose,
  onOk,
  isLoading,
}: UpdatePasswordModalProps) => {
  const [form] = Form.useForm<T_ChangePassword>()

  const handleFinish = (values: T_ChangePassword) => {
    console.log('values', values)
    onOk(values.password)
  }

  return (
    <Modal
      title={t('modal.updatePassword.title')}
      open={isOpen}
      onOk={form.submit}
      onCancel={onClose}
      footer={[
        <Button key='cancel' disabled={isLoading} onClick={onClose}>
          {t('modal.updatePassword.actions.cancel')}
        </Button>,
        <Button key='updateRole' loading={isLoading} onClick={form.submit}>
          {t('modal.updatePassword.actions.update')}
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <Form.Item
          name='password'
          label={t('userForm.fields.password')}
          hasFeedback
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirm'
          label={t('userForm.fields.rePassword')}
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}
