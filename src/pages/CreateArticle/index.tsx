import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.creteEvent') }]} />
      <Divider />

      <C.WrapperPage>Форма создания мероприятия</C.WrapperPage>
    </div>
  )
}
