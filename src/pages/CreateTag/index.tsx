import { Divider } from 'antd'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormCreateTag } from 'features/FormTag'
import * as C from 'styles/components'

export const CreateTag = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Тэги', to: '/articles' }, { title: 'Создание тэга' }]} />
      <Divider />

      <C.WrapperPage>
        <FormCreateTag />
      </C.WrapperPage>
    </div>
  )
}
