import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { FormUpdateUser } from 'features/FormUser'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateUser = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/users'>{t('dashboard.header.users')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('dashboard.header.updateUser')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <FormUpdateUser />
      </C.WrapperPage>
    </div>
  )
}
