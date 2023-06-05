import { SearchOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import dayjs from 'dayjs'

import { TagStatus } from 'components/TagStatus'
import { t } from 'languages'
import { E_ArticleStatus, T_ArticleRecord } from 'models/article'
import { E_FormatDate } from 'utils/helpers/date'
import { I_ColumnSearch, getColumnSearch } from 'utils/tables/columnSearch'

interface I_GetColumns {
  searchOptions: I_ColumnSearch
}

export const getColumns = ({ searchOptions }: I_GetColumns): ColumnsType<T_ArticleRecord> => [
  {
    title: t('articlesTable.table.id'),
    dataIndex: 'id',
    sorter: {
      multiple: 1,
    },
  },
  {
    title: t('articlesTable.table.title'),
    dataIndex: 'title',
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    ...getColumnSearch({ ...searchOptions, dataIndex: ['title'] }),
  },
  {
    title: t('articlesTable.table.status'),
    dataIndex: 'status',
    filters: [
      { text: 'Опубликован', value: E_ArticleStatus.PUBLISHED },
      { text: 'Проверяется', value: E_ArticleStatus.CHECKED },
      { text: 'Черновик', value: E_ArticleStatus.DRAFT },
    ],
    render: (value: E_ArticleStatus) => (
      <Space size='middle'>
        <TagStatus value={value} />
      </Space>
    ),
  },
  {
    title: t('articlesTable.table.author'),
    dataIndex: ['author', 'username'],
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    sorter: {
      multiple: 1,
    },
    ...getColumnSearch({ ...searchOptions, dataIndex: ['author', 'username'] }),
  },
  {
    title: t('articlesTable.table.createdAt'),
    dataIndex: 'createdAt',
    render: (value: string) => (
      <Space size='middle'>{dayjs(value).format(E_FormatDate.extend)}</Space>
    ),
  },
  {
    title: t('articlesTable.table.updatedAt'),
    dataIndex: 'updatedAt',
    render: (value: string) => (
      <Space size='middle'>{dayjs(value).format(E_FormatDate.extend)}</Space>
    ),
  },
]
