import { Button, Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'

import { t } from 'languages'
import * as C from 'styles/components'

export const Reactions = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.events') }]} />
      <Divider />
      <C.WrapperPage>
        <Button type='primary'>Создать реакцию</Button>
      </C.WrapperPage>
    </div>
  )
}
