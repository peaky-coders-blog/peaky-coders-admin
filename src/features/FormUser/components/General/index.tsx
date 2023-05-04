import { Col, Form, Input, Row, Select } from 'antd'

import { t } from 'languages'
import { E_UserFrom } from 'models/user'

export const GeneralSection = () => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='email' label={t('userForm.fields.email')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item
          name='username'
          label={t('userForm.fields.username')}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='avatar' label={t('userForm.fields.avatar')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='from' label={t('userForm.fields.from')} rules={[{ required: true }]}>
          <Select>
            {[E_UserFrom.GITHUB, E_UserFrom.GITLAB].map((from) => (
              <Select.Option key={from} value={from}>
                {from}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </>
)
