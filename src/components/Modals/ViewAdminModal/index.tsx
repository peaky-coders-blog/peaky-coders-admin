import { CheckOutlined } from '@ant-design/icons'
import { Button, Descriptions, Divider, Modal, notification, Space, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import * as S from './styles'

import { UpdatePasswordModal } from '..'

import { ErrorFeedback } from 'components/ErrorFeedback'
import { Loader } from 'components/Loader'
import { t } from 'languages'
import { T_AdminId } from 'models/shared/admin'
import { adminsAPI } from 'services/admins'
import { E_FormatDate } from 'utils/helpers/date'

interface I_ViewAdminModalProps {
  isOpen: boolean
  handleClose: () => void
  adminId: T_AdminId | null
}

export const ViewAdminModal = ({ isOpen, handleClose, adminId }: I_ViewAdminModalProps) => {
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false)

  // Получение админа
  const [fetchGetAdmin, { data: adminData, isFetching: isAdminFetching }] =
    adminsAPI.useLazyGetAdminQuery()

  const [
    fetchChangePassword,
    { isSuccess: isChangePasswordSuccess, isLoading: isChangePasswordLoading },
  ] = adminsAPI.useChangePasswordMutation()

  // Получение админа
  useEffect(() => {
    if (adminId) {
      fetchGetAdmin(adminId)
    }
  }, [fetchGetAdmin, adminId])

  // Успешное изменение пароля
  useEffect(() => {
    if (isChangePasswordSuccess) {
      notification.open({
        message: t('notifications.changeAdminPassword.success'),
        icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      })
      setIsModalPasswordOpen(false)
    }
  }, [isChangePasswordSuccess])

  const handleCloseModalPassword = () => {
    setIsModalPasswordOpen(false)
  }

  const handleOpenModalPassword = () => {
    setIsModalPasswordOpen(true)
  }

  const handleOkModalPassword = (password: string) => {
    if (adminData?.data?.id) {
      fetchChangePassword({ body: { password }, adminId: String(adminData.data.id) })
      setIsModalPasswordOpen(false)
    }
  }

  return (
    <>
      <Modal
        title={t('modal.viewAdmin.title')}
        open={isOpen}
        footer={
          <Space>
            <Button
              key='updatePassword'
              disabled={isAdminFetching}
              onClick={handleOpenModalPassword}
            >
              {t('modal.viewAdmin.actions.updatePassword')}
            </Button>
          </Space>
        }
        onCancel={handleClose}
      >
        {isAdminFetching ? (
          <Loader relative />
        ) : adminData?.data ? (
          <div>
            <S.TopSection>
              <Space direction='vertical'>
                <span>{adminData.data.email}</span>
              </Space>
            </S.TopSection>
            <Divider />
            <Descriptions bordered>
              <Descriptions.Item span={3} label={t('modal.viewAdmin.created')}>
                {dayjs(adminData.data.createdAt).format(E_FormatDate.default)}
              </Descriptions.Item>
              <Descriptions.Item span={3} label={t('modal.viewAdmin.updated')}>
                {dayjs(adminData.data.updatedAt).format(E_FormatDate.default)}
              </Descriptions.Item>
            </Descriptions>
            {/* <Button danger icon={<DeleteOutlined />} /> */}
          </div>
        ) : (
          <ErrorFeedback relative />
        )}
        <UpdatePasswordModal
          isOpen={isModalPasswordOpen}
          onOk={handleOkModalPassword}
          onClose={handleCloseModalPassword}
          isLoading={isChangePasswordLoading}
        />
      </Modal>
    </>
  )
}
