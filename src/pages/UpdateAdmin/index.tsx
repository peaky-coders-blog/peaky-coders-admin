import { Breadcrumb, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { FormUpdateAdmin } from 'features/FormAdmin'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateAdmin = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/admins'>{t('dashboard.header.admins')}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('dashboard.header.updateAdmin')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>
        <FormUpdateAdmin />
      </C.WrapperPage>
    </div>
  )
}
