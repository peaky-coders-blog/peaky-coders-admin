import { Button, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { ArticlesTable } from './extensions/ArticlesTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { t } from 'languages'
import * as C from 'styles/components'

export const Articles = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.articles') }]} />
      <Divider />

      <C.WrapperPage>
        <Link to='/articles/create'>
          <Button type='primary'>Создать статью</Button>
        </Link>

        <C.Brick />
        <ArticlesTable />
      </C.WrapperPage>
    </div>
  )
}
