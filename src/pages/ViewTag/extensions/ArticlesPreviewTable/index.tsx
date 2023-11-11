import { Table } from 'antd'
import { useParams } from 'react-router-dom'

import { getColumns } from './data'

import { T_Params } from 'models/routes'
import { tagsAPI } from 'services/tags'

export const ArticleCommentsTable = () => {
  const params = useParams<T_Params>()

  // Получение тега
  const { data: tagData, isLoading: isTagLoading } = tagsAPI.useGetTagQuery(params.tagId || '')

  return (
    <Table
      loading={isTagLoading}
      columns={getColumns()}
      dataSource={tagData?.data?.articles?.map((item) => ({ ...item, key: item.id }))}
      bordered
    />
  )
}
