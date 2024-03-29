import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateArticle } from 'features/FormArticle'
import { T_Params } from 'models/routes'
import * as C from 'styles/components'

export const UpdateArticle = () => {
  const params = useParams<T_Params>()

  return (
    <div>
      <Breadcrumbs
        items={[
          { title: 'Статьи', to: '/articles' },
          { title: 'Просмотр статьи', to: `/articles/${params.articleId}` },
          { title: 'Редактирование статьи' },
        ]}
      />
      <Divider />

      <C.WrapperPage>
        <FormUpdateArticle />
      </C.WrapperPage>
    </div>
  )
}
