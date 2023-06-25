import { CheckOutlined } from '@ant-design/icons'
import { App, Button, Col, Divider, Form, Input, Row, Select } from 'antd'

import { useEffect } from 'react'

import { tagStatusText } from 'components/TagStatus'
import { t } from 'languages'
import { I_Tag } from 'models/tags'
import { T_CreateTagArticleForm } from 'models/tags/forms'
import { tagsAPI } from 'services/tags'

type T_GeneralSectionProps = {
  tags: I_Tag[]
}

export const GeneralSection = ({ tags }: T_GeneralSectionProps) => {
  const [tagForm] = Form.useForm<T_CreateTagArticleForm>()
  const { notification } = App.useApp()

  // Создание тэга
  const [fetchCreateTag, { isSuccess: isTagCreatedSuccess }] = tagsAPI.useCreateTagMutation()

  // Успешное добавление тэга
  useEffect(() => {
    if (isTagCreatedSuccess) {
      notification.open({
        message: t('notifications.createTag.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isTagCreatedSuccess, notification])

  const handleFinishTag = (values: T_CreateTagArticleForm) => {
    fetchCreateTag(values)
    tagForm.resetFields()
  }

  return (
    <Row gutter={[16, 4]}>
      <Col xs={24} lg={14} xl={6}>
        <Form.Item name='title' label={t('articleForm.fields.title')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} lg={10} xl={4}>
        <Form.Item
          name='status'
          label={t('articleForm.fields.status')}
          rules={[{ required: true }]}
        >
          <Select
            options={Object.entries(tagStatusText).map((status) => ({
              value: status[0],
              label: status[1],
            }))}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} xl={14}>
        <Form.Item name='tags' label={t('articleForm.fields.tags')} rules={[{ required: true }]}>
          <Select
            mode='multiple'
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Form form={tagForm} onFinish={handleFinishTag}>
                  <Row gutter={[16, 4]} style={{ padding: '0 8px 4px' }}>
                    <Col xs={14} lg={10}>
                      <Form.Item name='name' rules={[{ required: true }]}>
                        <Input onKeyDown={(e) => e.stopPropagation()} placeholder='Название' />
                      </Form.Item>
                    </Col>
                    <Col xs={10} lg={4}>
                      <Button type='primary' htmlType='submit'>
                        Добавить
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </>
            )}
            options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
            allowClear
            style={{ width: '100%' }}
            placeholder='Тэги'
          />
        </Form.Item>
      </Col>
    </Row>
  )
}
