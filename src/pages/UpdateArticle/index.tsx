import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.updateEvent') }]} />
      <Divider />

      <C.WrapperPage>Форма изменения мероприятия</C.WrapperPage>
    </div>
  )
}
