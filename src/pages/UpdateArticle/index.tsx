import { Divider } from 'antd'

import { useParams } from 'react-router-dom'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateArticle } from 'features/FormArticle/extensions/FormUpdateArticle'
import { t } from 'languages'
import { T_Params } from 'models/routes'
import * as C from 'styles/components'

export const UpdateArticle = () => {
  const params = useParams<T_Params>()

  return (
    <div>
      <Breadcrumbs
        items={[
          { title: t('dashboard.header.articles'), to: '/articles' },
          { title: t('dashboard.header.viewArticle'), to: `/articles/${params.articleId}` },
          { title: t('dashboard.header.updateArticle') },
        ]}
      />
      <Divider />

      <C.WrapperPage>
        <FormUpdateArticle />
      </C.WrapperPage>
    </div>
  )
}
