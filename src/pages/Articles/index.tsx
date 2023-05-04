import { Breadcrumb, Button, Divider } from 'antd'

import { ArticleTable } from './extensions/ArticlesTable'

import { t } from 'languages'
import * as C from 'styles/components'

export const Articles = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>{t('dashboard.header.articles')}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />

      <C.WrapperPage>
        <Button type='primary'>Создать статью</Button>
        <C.Brick />
        <ArticleTable />
      </C.WrapperPage>
    </div>
  )
}
