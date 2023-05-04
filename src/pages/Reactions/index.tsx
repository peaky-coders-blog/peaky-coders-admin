import { Breadcrumb, Button, Divider } from 'antd'

import { t } from 'languages'
import * as C from 'styles/components'

export const Reactions = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.events')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>
        <Button type='primary'>Создать событие</Button>
      </C.WrapperPage>
    </div>
  )
}
