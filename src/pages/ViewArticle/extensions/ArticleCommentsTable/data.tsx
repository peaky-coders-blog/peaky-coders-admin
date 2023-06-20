import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'

import { t } from 'languages'
import { T_ArticleComment } from 'models/article'

export const getColumns = (): ColumnsType<T_ArticleComment> => [
  {
    title: t('articleReactionsTable.table.id'),
    dataIndex: 'id',
  },
  {
    title: t('articleReactionsTable.table.username'),
    dataIndex: ['author', 'username'],
  },
  {
    title: t('articleReactionsTable.table.text'),
    dataIndex: 'text',
  },
  {
    title: t('articleReactionsTable.table.votes'),
    dataIndex: 'votes',
  },
  {
    key: 'action',
    render: () => (
      <Space size='middle'>
        <Tooltip title={t('usersTable.tooltip.delete')} placement='topLeft'>
          <Button icon={<DeleteOutlined />} onClick={() => null} />
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
