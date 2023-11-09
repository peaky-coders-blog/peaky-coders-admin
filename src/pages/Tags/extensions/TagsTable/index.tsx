import { Table } from 'antd'

import { getColumns } from './data'

import { tagsAPI } from 'services/tags'

export const TagsTable = () => {
  const { data: tagsData, isLoading: isTagsLoading } = tagsAPI.useGetTagsQuery()

  return (
    <Table
      bordered
      loading={isTagsLoading}
      columns={getColumns()}
      dataSource={tagsData?.data?.map((item) => ({ ...item, key: item.id }))}
      scroll={{ x: 'max-content' }}
      expandable={{
        expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
        rowExpandable: (record) => !!record.description,
      }}
    />
  )
}
