import { Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'

import { UsersTable } from './extensions/UsersTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const Users = () => {
  const navigate = useNavigate()

  const handleToCreateUser = () => {
    navigate('/users/create')
  }

  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.users') }]} />
      <Divider />
      <C.WrapperPage>
        <Button onClick={handleToCreateUser} type='primary'>
          {t('usersPage.actions.create')}
        </Button>
        <C.Brick />
        <UsersTable />
      </C.WrapperPage>
    </div>
  )
}
