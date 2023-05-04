import { Col, Form, Input, Row } from 'antd'

import { t } from 'languages'

export const GeneralSection = () => (
  <>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='name' label={t('roleForm.fields.name')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={6} xl={4}>
        <Form.Item name='tag' label={t('roleForm.fields.tag')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={18} xl={12}>
        <Form.Item
          name='description'
          label={t('roleForm.fields.description')}
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  </>
)
