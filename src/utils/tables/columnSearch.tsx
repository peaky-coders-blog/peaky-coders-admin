import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space } from 'antd'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface'
import { RefObject } from 'react'
import Highlighter from 'react-highlight-words'

export interface I_ColumnSearch {
  searchInput: RefObject<InputRef>
  searchText: string
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string[],
  ) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
}

export const getColumnSearch = <T,>({
  dataIndex,
  searchInput,
  searchText,
  handleSearch,
  handleReset,
}: I_ColumnSearch & { dataIndex: string[] }): ColumnType<T> => ({
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
          Поиск
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters, confirm)}
          size='small'
          style={{ width: 90 }}
        >
          Сбросить
        </Button>
        <Button
          type='link'
          size='small'
          onClick={() => {
            close()
          }}
        >
          Закрыть
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  render: (text) => (
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[searchText]}
      autoEscape
      textToHighlight={text ? text.toString() : ''}
    />
  ),
})
