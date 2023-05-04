import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { FormCreateUser } from 'features/FormUser'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateUser = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/users'>{t('dashboard.header.users')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('dashboard.header.createUser')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <FormCreateUser />
      </C.WrapperPage>
    </div>
  )
}
