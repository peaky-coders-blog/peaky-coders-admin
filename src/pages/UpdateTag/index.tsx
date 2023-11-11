import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateTag } from 'features/FormTag'
import { T_Params } from 'models/routes'
import * as C from 'styles/components'

export const UpdateTag = () => {
  const params = useParams<T_Params>()

  return (
    <div>
      <Breadcrumbs
        items={[
          { title: 'Тэги', to: '/tags' },
          { title: 'Просмотр тэга', to: `/tags/${params.tagId}` },
          { title: 'Редактирование тэга' },
        ]}
      />
      <Divider />

      <C.WrapperPage>
        <FormUpdateTag />
      </C.WrapperPage>
    </div>
  )
}
