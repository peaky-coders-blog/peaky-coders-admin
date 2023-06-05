import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateUser } from 'features/FormUser'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateUser = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { title: t('dashboard.header.users'), to: '/users' },
          { title: t('dashboard.header.createUser') },
        ]}
      />
      <Divider />
      <C.WrapperPage>
        <FormCreateUser />
      </C.WrapperPage>
    </div>
  )
}
