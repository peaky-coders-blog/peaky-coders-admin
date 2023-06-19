import { Descriptions, Divider, Modal, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'

import * as S from './styles'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_UserId } from 'models/shared/user'
import { usersAPI } from 'services/users'
import { E_FormatDate } from 'utils/helpers/date'

interface I_ViewUserModalProps {
  isOpen: boolean
  handleClose: () => void
  userId: T_UserId | null
}

export const ViewUserModal = ({ isOpen, handleClose, userId }: I_ViewUserModalProps) => {
  // Получение пользователей
  const [fetchGetUser, { data: userData, isFetching: isUserFetching }] =
    usersAPI.useLazyGetUserQuery()

  useEffect(() => {
    if (userId) {
      fetchGetUser(userId)
    }
  }, [fetchGetUser, userId])

  return (
    <Modal title={t('modal.viewUser.title')} open={isOpen} footer={null} onCancel={handleClose}>
      {isUserFetching ? (
        <Loader relative />
      ) : userData?.data ? (
        <div>
          <S.TopSection>
            <S.UserAvatar src={userData.data.avatar} />
            <Space direction='vertical'>
              <b>{userData.data.username}</b>
              <span>{userData.data.email}</span>
            </Space>
          </S.TopSection>
          <Divider />
          <Descriptions bordered>
            <Descriptions.Item span={3} label={t('modal.viewUser.created')}>
              {dayjs(userData.data.createdAt).format(E_FormatDate.default)}
            </Descriptions.Item>
            <Descriptions.Item span={3} label={t('modal.viewUser.updated')}>
              {dayjs(userData.data.updatedAt).format(E_FormatDate.default)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <ErrorFeedback relative />
      )}
    </Modal>
  )
}
