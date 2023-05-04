import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { AdminsTable } from './extensions/AdminsTable'

import { t } from 'languages'
import * as C from 'styles/components'

export const Admins = () => {
  const navigate = useNavigate()

  const handleToCreateAdmin = () => {
    navigate('/admins/create')
  }
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.admins')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>
        <Button onClick={handleToCreateAdmin} type='primary'>
          {t('adminsPage.actions.create')}
        </Button>
        <C.Brick />
        <AdminsTable />
      </C.WrapperPage>
    </div>
  )
}
