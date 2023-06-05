import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space } from 'antd'
import { ColumnType } from 'antd/es/table'
import { FilterConfirmProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'

import { RefObject } from 'react'
import Highlighter from 'react-highlight-words'

import { t } from 'languages'
import { E_ArticleStatus, T_ArticleRecord } from 'models/article'
import { E_FormatDate } from 'utils/helpers/date'

const getColumnSearch = ({
  dataIndex,
  searchInput,
  searchText,
  handleSearch,
  handleReset,
}: I_GetColumns & { dataIndex: string[] }): ColumnType<T_ArticleRecord> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type='primary'
          onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters, confirm)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type='link'
          size='small'
          onClick={() => {
            close()
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  // onFilter: (value, record) =>
  //   record[dataIndex]
  //     .toString()
  //     .toLowerCase()
  //     .includes((value as string).toLowerCase()),
  // onFilterDropdownOpenChange: (visible) => {
  //   if (visible) {
  //     setTimeout(() => searchInput.current?.select(), 100)
  //   }
  // },
  render: (text) => (
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[searchText]}
      autoEscape
      textToHighlight={text ? text.toString() : ''}
    />
  ),
})

interface I_GetColumns {
  searchInput: RefObject<InputRef>
  searchText: string
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string[],
  ) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
}

export const getColumns = (searchOptions: I_GetColumns) => [
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
    render: (value: E_ArticleStatus) => <Space size='middle'>{value}</Space>,
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
