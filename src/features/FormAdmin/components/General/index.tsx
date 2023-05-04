import { Col, Form, Input, Row } from 'antd'

import { t } from 'languages'

export const GeneralSection = () => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='email' label={t('adminForm.fields.email')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  </>
)
