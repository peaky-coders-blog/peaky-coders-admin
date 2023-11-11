import {
  UserOutlined,
  CommentOutlined,
  CalendarOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import MDEditor from '@uiw/react-md-editor'
import { App, Button, Col, Modal, Row, Space, Statistic, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_Params } from 'models/routes'
import { tagsAPI } from 'services/tags'
import * as C from 'styles/components'

export const TagInfo = () => {
  const params = useParams<T_Params>()
  const { notification } = App.useApp()
  const navigate = useNavigate()

  // Получение тэга
  const { data: tagData, isLoading: isTagLoading } = tagsAPI.useGetTagQuery(Number(params.tagId))

  // Удаление тэга
  const [fetchDeleteTag, { isSuccess: isDeleteTagSuccess }] = tagsAPI.useDeleteTagMutation()

  const handleRemove = () => {
    Modal.confirm({
      title: 'Удаление тэга',
      icon: <ExclamationCircleOutlined />,
      content: 'Все привязанные статьи избавятся от этого тэга. Вы уверены, что хотите удалить?',
      okText: 'Подтверждаю',
      cancelText: 'Отмена',
      maskClosable: true,
      onOk: () => {
        fetchDeleteTag(Number(params.tagId))
      },
    })
  }

  // Если удаление тэга прошло успешно
  useEffect(() => {
    if (isDeleteTagSuccess) {
      notification.open({
        message: 'Тэг успешно удалён',
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      navigate(`/tags`)
    }
  }, [isDeleteTagSuccess, navigate, notification])

  if (isTagLoading) return <Loader relative />

  if (tagData?.data) {
    return (
      <>
        <Row gutter={[16, 4]}>
          <Col xs={24} lg={12} xl={6}>
            <Statistic title='Название' value={tagData.data.name} />
          </Col>
          <Col xs={24} lg={12} xl={6}>
            <Typography.Text type='secondary'>Иконка</Typography.Text>
            <C.Brick h={4} />
            <div>{tagData.data.icon ? <i className={tagData.data.icon}></i> : '-'}</div>
          </Col>
          <Col xs={24} lg={12} xl={12}>
            <Typography.Text type='secondary'>Описание</Typography.Text>
            <C.Brick h={4} />
            <div>
              <Typography.Text>{tagData.data.description || '-'}</Typography.Text>
            </div>
          </Col>
        </Row>
        <C.Brick />
        <Space>
          <Link to='update'>
            <Button type='primary' size='large'>
              Изменить
            </Button>
          </Link>
          <Button onClick={handleRemove} type='primary' size='large'>
            Удалить
          </Button>
        </Space>
      </>
    )
  }

  return <ErrorFeedback />
}
