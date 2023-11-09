import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateArticle } from 'features/FormArticle/extensions/FormCreateArticle'
import * as C from 'styles/components'

export const CreateTag = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Тэги', to: '/articles' }, { title: 'Создание тэга' }]} />
      <Divider />

      <C.WrapperPage>
        <FormCreateArticle />
      </C.WrapperPage>
    </div>
  )
}
