import { Col, Form, Input, Row } from 'antd'

import { t } from 'languages'

export const PasswordSection = () => {
  return (
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item
          name='password'
          label={t('adminForm.fields.password')}
          hasFeedback
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password />
        </Form.Item>
      </Col>
      <Col xs={24} lg={9} xl={6}>
        <Form.Item
          name='confirm'
          label={t('adminForm.fields.rePassword')}
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
      </Col>
    </Row>
  )
}
