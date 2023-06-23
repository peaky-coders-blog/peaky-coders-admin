import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, InputRef, Space, Tooltip } from 'antd'
import { FilterConfirmProps, FilterDropdownProps } from 'antd/lib/table/interface'
import dayjs from 'dayjs'
import { RefObject } from 'react'
import { Link } from 'react-router-dom'

import { t } from 'languages'
import { T_AdminId, T_AdminRecord } from 'models/admin'
import { E_FormatDate } from 'utils/helpers/date'

interface I_GetColumnsProps {
  handleRemove: (adminId: T_AdminId) => void
  handleSearch: (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => void
  handleReset: (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => void
  searchInput: RefObject<InputRef>
  handleOpenModalUser: (adminId: T_AdminId) => () => void
}

export const getColumns = ({
  handleRemove,
  handleSearch,
  handleReset,
  searchInput,
  handleOpenModalUser,
}: I_GetColumnsProps) => [
  {
    title: t('adminsTable.table.id'),
    dataIndex: 'id',
    sorter: (a: T_AdminRecord, b: T_AdminRecord) => a.id - b.id,
  },
  {
    title: t('adminsTable.table.email'),
    dataIndex: 'email',
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder='Поиск админа'
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            size='small'
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
        </Space>
      </div>
    ),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },

    onFilter: (value: string | number | boolean, record: T_AdminRecord) =>
      record.email.toLowerCase().includes(String(value).toLowerCase()),
  },
  {
    title: t('adminsTable.table.createdAt'),
    dataIndex: 'createdAt',
    sorter: (a: T_AdminRecord, b: T_AdminRecord) =>
      dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    render: (value: string) => (
      <Space size='middle'>{dayjs(value).format(E_FormatDate.default)}</Space>
    ),
  },
  {
    key: 'action',
    render: (record: T_AdminRecord) => (
      <Space size='middle'>
        <Tooltip title={t('adminsTable.tooltip.delete')} placement='topLeft'>
          <Button icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
        </Tooltip>
        <Tooltip title={t('adminsTable.tooltip.update')} placement='topLeft'>
          <Link to={`/admins/update/${record.id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </Tooltip>
        <Tooltip title={t('adminsTable.tooltip.view')} placement='topLeft'>
          <Button onClick={handleOpenModalUser(record.id)} icon={<EyeOutlined />} />
        </Tooltip>
      </Space>
    ),
    align: 'center',
  },
]
