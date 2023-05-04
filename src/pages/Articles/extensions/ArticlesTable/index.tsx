import { InputRef, Table, TablePaginationConfig } from 'antd'
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { I_Article, T_ArticleRecord } from 'models/article'
import { E_SortBy } from 'models/shared/app'
import { articlesAPI } from 'services/articles'
import { formatToDataSource } from 'utils/helpers/table'

export const ArticleTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)

  // const params = useMemo(() => {
  //   const params = {}

  //   if(searchParams.get('page')) {
  //     params.page =
  //   }

  //   return {
  //     page:  || '1',
  //     limit: searchParams.get('size') || '10',
  //     sort: searchParams.get('sort') || 'createdAt',
  //     order: searchParams.get('order') || E_SortBy.desc,
  //   }
  // }, [searchParams])

  const {
    data: articlesData,
    isFetching: isArticlesFetching,
    isLoading: isArticlesLoading,
  } = articlesAPI.useGetArticlesQuery(
    {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('size') || '10',
      sort: searchParams.get('sort') || 'createdAt',
      order: searchParams.get('order') || E_SortBy.desc,
      // filters: searchParams.get('filters') || {},
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
    console.log('filters', filters)
    console.log('sorter', sorter)
    setSearchParams({
      page: String(pagination.current),
      size: String(pagination.pageSize),
      sort: sorter.field ? String(sorter.field) : 'createdAt',
      order: sorter.order?.startsWith('asc') ? E_SortBy.asc : E_SortBy.desc,
    })
  }

  if (isArticlesLoading) {
    return <Loader relative />
  }

  if (articlesData?.data && articlesData?.info) {
    const dataTable = formatToDataSource(articlesData.data)

    return (
      <Table
        bordered
        loading={isArticlesFetching}
        columns={getColumns({ searchInput, searchText, handleReset, handleSearch })}
        dataSource={dataTable}
        pagination={{
          current: Number(searchParams.get('page')) || 1,
          total: articlesData.info.total,
          pageSize: Number(searchParams.get('size') || 10),
        }}
        scroll={{ x: 'max-content' }}
        onChange={handleTableChange}
      />
    )
  }

  return <ErrorFeedback relative />
}
