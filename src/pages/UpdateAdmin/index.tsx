import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateAdmin } from 'features/FormAdmin'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateAdmin = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: t('dashboard.header.admins'), to: '/admins' },
          { title: t('dashboard.header.updateAdmin') },
        ]}
      />
      <Divider />

      <C.WrapperPage>
        <FormUpdateAdmin />
      </C.WrapperPage>
    </div>
  )
}
