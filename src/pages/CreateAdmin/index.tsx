import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { FormCreateAdmin } from 'features/FormAdmin'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateAdmin = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/admins'>{t('dashboard.header.admins')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('dashboard.header.createAdmin')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <C.WrapperPage>
        <FormCreateAdmin />
      </C.WrapperPage>
    </div>
  )
}
