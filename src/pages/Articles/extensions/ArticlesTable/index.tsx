import { InputRef, Table, TablePaginationConfig } from 'antd'
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { T_ArticleRecord } from 'models/article'
import { E_SortBy } from 'models/shared/app'
import { articlesAPI } from 'services/articles'
import { formatToDataSource } from 'utils/helpers/table'

export const ArticlesTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)
  const { data: articlesData, isLoading: isArticlesLoading } = articlesAPI.useGetArticlesQuery(
    {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      sort: searchParams.getAll('sort'),
      filter: searchParams.getAll('filter'),
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  // Поиск по таблице
  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  // Сброс поиска по таблице
  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
    clearFilters()
    confirm()
    setSearchText('')
  }

  // Изменение состояния таблицы
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T_ArticleRecord> | SorterResult<T_ArticleRecord>[],
  ) => {
    const params = new URLSearchParams()

    params.append('page', String(pagination.current))
    params.append('limit', String(pagination.pageSize))

    if (sorter) {
      const arraySorter = Array.isArray(sorter) ? sorter : [sorter]
      arraySorter.forEach((sort) => {
        if (sort.order) {
          const field = Array.isArray(sort.field) ? sort.field.join('.') : String(sort.field)
          const param = {
            field,
            order: sort.order === 'ascend' ? E_SortBy.asc : E_SortBy.desc,
          }
          params.append('sort', JSON.stringify(param))
        }
      })
    }
    if (filters) {
      Object.entries(filters).forEach(([field, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            const param = {
              field,
              value: item,
            }
            params.append('filter', JSON.stringify(param))
          })
        } else if (value) {
          const param = {
            field,
            value: value[0],
          }
          params.append('filter', JSON.stringify(param))
        }
      })
    }

    setSearchParams(params)
  }

  if (isArticlesLoading) {
    return <Loader relative />
  }

  if (articlesData?.data && articlesData?.info) {
    const dataTable = formatToDataSource(articlesData.data)

    return (
      <Table
        bordered
        loading={isArticlesLoading}
        columns={getColumns({
          searchOptions: { searchInput, searchText, handleReset, handleSearch },
        })}
        dataSource={dataTable}
        pagination={{
          current: Number(searchParams.get('page')) || 1,
          total: articlesData.info.total,
          pageSize: Number(searchParams.get('limit')) || 10,
        }}
        scroll={{ x: 'max-content' }}
        onChange={handleTableChange}
      />
    )
  }

  return <ErrorFeedback relative />
}
