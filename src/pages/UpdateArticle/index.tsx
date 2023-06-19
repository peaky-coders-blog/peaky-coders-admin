import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateArticle } from 'features/FormArticle/extensions/FormUpdateArticle'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.updateArticle') }]} />
      <Divider />

      <C.WrapperPage>
        <FormUpdateArticle />
      </C.WrapperPage>
    </div>
  )
}
