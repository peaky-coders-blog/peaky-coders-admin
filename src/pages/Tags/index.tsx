import { Button, Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const Tags = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.events') }]} />
      <Divider />

      <C.WrapperPage>
        <Button type='primary'>Создать событие</Button>
      </C.WrapperPage>
    </div>
  )
}
