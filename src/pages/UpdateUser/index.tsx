import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateUser } from 'features/FormUser'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateUser = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: t('dashboard.header.users'), to: '/users' },
          { title: t('dashboard.header.updateUser') },
        ]}
      />
      <Divider />
      <C.WrapperPage>
        <FormUpdateUser />
      </C.WrapperPage>
    </div>
  )
}
