import { Button, Divider } from 'antd'

import { ArticleTable } from './extensions/ArticlesTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const Articles = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.articles') }]} />
      <Divider />

      <C.WrapperPage>
        <Button type='primary'>Создать статью</Button>
        <C.Brick />
        <ArticleTable />
      </C.WrapperPage>
    </div>
  )
}
