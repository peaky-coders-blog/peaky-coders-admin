import { ColumnsType } from 'antd/es/table/interface'

import { t } from 'languages'
import { I_User } from 'models/user'

export const getColumns = (): ColumnsType<I_User> => [
  {
    title: t('articleReactionsTable.table.id'),
    dataIndex: 'id',
  },
  {
    title: t('articleReactionsTable.table.username'),
    dataIndex: 'username',
  },
]
