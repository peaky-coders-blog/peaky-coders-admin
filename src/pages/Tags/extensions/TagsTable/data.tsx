import { EyeOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { T_TagRecord } from 'models/tags'
import { E_FormatDate } from 'utils/helpers/date'

export const getColumns = (): ColumnsType<T_TagRecord> => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Иконка',
    dataIndex: 'icon',
    width: 32,
    render: (value: string) => (value ? <i className={value}></i> : '-'),
  },
  {
    title: 'Кол-во связей',
    dataIndex: ['_count', 'articles'],
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    render: (value: string) => (
      <Space size='middle'>{dayjs(value).format(E_FormatDate.extend)}</Space>
    ),
  },
  {
    title: 'Дата обновления',
    dataIndex: 'updatedAt',
    render: (value: string) => (
      <Space size='middle'>{dayjs(value).format(E_FormatDate.extend)}</Space>
    ),
  },
  {
    key: 'action',
    fixed: 'right',
    render: (record: T_TagRecord) => (
      <Space size='middle'>
        <Tooltip title='Просмотреть' placement='topLeft'>
          <Link to={`/tags/${record.id}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
