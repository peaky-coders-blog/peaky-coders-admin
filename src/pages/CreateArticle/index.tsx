import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateArticle } from 'features/FormArticle'
import * as C from 'styles/components'

export const CreateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статьи', to: '/articles' }, { title: 'Создание статьи' }]} />
      <Divider />

      <C.WrapperPage>
        <FormCreateArticle />
      </C.WrapperPage>
    </div>
  )
}
