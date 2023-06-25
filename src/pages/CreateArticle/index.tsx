import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateArticle } from 'features/FormArticle/extensions/FormCreateArticle'
import { t } from 'languages'
import * as C from 'styles/components'

export const CreateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.creteEvent') }]} />
      <Divider />

      <C.WrapperPage>
        <FormCreateArticle />
      </C.WrapperPage>
    </div>
  )
}
