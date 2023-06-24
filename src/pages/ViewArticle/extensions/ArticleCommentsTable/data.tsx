import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'

import { t } from 'languages'
import { I_Comment, T_CommentRecord } from 'models/comment'

type T_GetColumnsProps = {
  onDelete: (commentId: number) => void
}

export const getColumns = ({ onDelete }: T_GetColumnsProps): ColumnsType<I_Comment> => [
  {
    title: t('articleCommentsTable.table.id'),
    dataIndex: 'id',
  },
  {
    title: t('articleCommentsTable.table.username'),
    dataIndex: ['author', 'username'],
    render: (value: string, record) => (
      <a href={`https://${record.author?.from}.com/${value}`} target='_blank' rel='noreferrer'>
        {value}
      </a>
    ),
  },
  {
    title: t('articleCommentsTable.table.text'),
    dataIndex: 'text',
  },
  {
    title: t('articleCommentsTable.table.votes'),
    dataIndex: 'votes',
  },
  {
    key: 'action',
    render: (record: T_CommentRecord) => (
      <Space size='middle'>
        <Tooltip title={t('tooltip.delete')} placement='topLeft'>
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} />
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
