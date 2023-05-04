import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { Table, Modal, InputRef, notification } from 'antd'
import { ColumnsType, FilterConfirmProps } from 'antd/lib/table/interface'
import { useEffect, useRef, useState } from 'react'

import { getColumns } from './data'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { ViewUserModal } from 'components/Modals'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { T_UserRecord } from 'models/user'
import { usersAPI } from 'services/users'
import { formatToDataSource } from 'utils/helpers/table'

export const UsersTable = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalUserOpen, setIsModalUserOpen] = useState(false)
  const [modalUserId, setModalUserId] = useState<T_UserId | null>(null)

  const searchInput = useRef<InputRef>(null)

  // Удаление пользователя
  const [fetchDeleteUser, { isSuccess: isDeleteUserSuccess }] = usersAPI.useDeleteUserMutation()

  // Получение пользователей
  const { data: usersData, isFetching: isUsersFetching } = usersAPI.useGetUsersQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const handleRemove = (userId: T_UserId) => {
    Modal.confirm({
      title: t('modal.confirm.removeUser.title'),
      icon: <ExclamationCircleOutlined />,
      content: t('modal.confirm.removeUser.content'),
      okText: t('modal.confirm.removeUser.ok'),
      cancelText: t('modal.confirm.removeUser.cancel'),
      maskClosable: true,
      onOk: () => {
        fetchDeleteUser(userId)
      },
    })
  }

  useEffect(() => {
    if (isDeleteUserSuccess) {
      notification.open({
        message: t('notifications.deleteUser.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
    }
  }, [isDeleteUserSuccess])

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

  // Закрытие модального окна пользователя
  const handleCloseModalUser = () => {
    setIsModalUserOpen(false)
  }

  const handleOpenModalUser = (userId: T_UserId) => () => {
    setIsModalUserOpen(true)
    setModalUserId(userId)
  }

  if (isUsersFetching) {
    return <Loader />
  }

  if (usersData?.data) {
    const dataTable = usersData.data.length ? formatToDataSource(usersData.data) : []
    return (
      <>
        <Table
          scroll={{ x: 'max-content' }}
          columns={
            getColumns({
              handleRemove,
              handleSearch,
              handleReset,
              searchInput,
              searchText,
              handleOpenModalUser,
            }) as ColumnsType<T_UserRecord>
          }
          dataSource={dataTable}
        />
        <ViewUserModal
          userId={modalUserId}
          isOpen={isModalUserOpen}
          handleClose={handleCloseModalUser}
        />
      </>
    )
  }

  return <ErrorFeedback relative />
}
