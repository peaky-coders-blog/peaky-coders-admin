import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'

import { FormCreateAdmin } from 'features/FormAdmin'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateAdmin = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: t('dashboard.header.admins'), to: '/admins' },
          { title: t('dashboard.header.createAdmin') },
        ]}
      />
      <Divider />
      <C.WrapperPage>
        <FormCreateAdmin />
      </C.WrapperPage>
    </div>
  )
}
