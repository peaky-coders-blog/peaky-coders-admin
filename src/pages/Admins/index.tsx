import { Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { AdminsTable } from './extensions/AdminsTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const Admins = () => {
  const navigate = useNavigate()

  const handleToCreateAdmin = () => {
    navigate('/admins/create')
  }
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.admins') }]} />
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
