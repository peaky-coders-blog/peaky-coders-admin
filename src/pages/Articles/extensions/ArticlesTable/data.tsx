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
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      multiple: 1,
    },
  },
  {
    title: 'Название',
    dataIndex: 'title',
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    ...getColumnSearch({ ...searchOptions, dataIndex: ['title'] }),
  },
  {
    title: 'Статус',
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
    title: 'Тэги',
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
    title: 'Активность',
    dataIndex: ['views'],
    sorter: {
      multiple: 1,
    },
    render: (views: number, record) => {
      const reactions = [...(record.ArticleReaction || [])].sort((a, b) =>
        a.reaction!.name.localeCompare(b.reaction!.name),
      )
      return (
        <Space size='small'>
          <Tag>{record._count?.ArticleComment || 0}💬</Tag>
          <Tag>{views}👁️</Tag>
          {record.ArticleReaction &&
            reactions.map((item) => {
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
      )
    },
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
