import { SearchOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Space, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { TagStatus } from 'components/TagStatus'
import { t } from 'languages'
import { E_ArticleStatus, T_ArticleRecord } from 'models/article'
import { I_Tag } from 'models/tags'
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
    title: t('articlesTable.table.tags'),
    dataIndex: ['tags'],
    render: (value: I_Tag[]) => (
      <Space size='small'>
        {value &&
          value.map((item) => {
            return <Tag key={item.id}>{item.name}</Tag>
          })}
      </Space>
    ),
  },
  {
    title: t('articlesTable.table.activity'),
    dataIndex: ['_count', 'ArticleComment'],
    render: (commentsCount: number, record: T_ArticleRecord) => (
      <Space size='small'>
        <Tag>{commentsCount}💬</Tag>
        {record.ArticleReaction &&
          record.ArticleReaction.map((item) => {
            if (item.reaction) {
              return (
                <Tag key={item.reactionId + item.articleId}>
                  {item.counter}
                  {item.reaction.icon}
                </Tag>
              )
            }
          })}
      </Space>
    ),
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
  {
    key: 'action',
    fixed: 'right',
    render: (record: T_ArticleRecord) => (
      <Space size='middle'>
        <Tooltip title={t('tooltip.view')} placement='topLeft'>
          <Link to={`/articles/${record.id}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
