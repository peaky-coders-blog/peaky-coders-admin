import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'

import { t } from 'languages'
import { I_User } from 'models/user'

type T_GetColumnsProps = {
  onDelete: (authorId: number) => void
}

export const getColumns = ({ onDelete }: T_GetColumnsProps): ColumnsType<I_User> => [
  {
    title: t('articleReactionsTable.table.id'),
    dataIndex: 'id',
  },
  {
    title: t('articleReactionsTable.table.username'),
    dataIndex: 'username',
    render: (value: string, record) => (
      <a href={`https://${record.from}.com/${value}`} target='_blank' rel='noreferrer'>
        {value}
      </a>
    ),
  },
  {
    key: 'action',
    render: (record) => (
      <Space size='middle'>
        <Tooltip title={t('tooltip.delete')} placement='topLeft'>
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
