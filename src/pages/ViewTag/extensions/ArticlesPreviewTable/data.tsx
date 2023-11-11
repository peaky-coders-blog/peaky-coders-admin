import { ColumnsType } from 'antd/es/table/interface'

import React from 'react'
import { Link } from 'react-router-dom'

export const getColumns = (): ColumnsType<{ id: number; title: string; key: React.Key }> => [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Название',
    dataIndex: 'title',
    render: (value: string, record) => (
      <Link to={`/articles/${record.id}`} target='_blank' rel='noreferrer'>
        {value}
      </Link>
    ),
  },
]
