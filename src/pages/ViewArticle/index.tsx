import { Divider, Row } from 'antd'

import { ArticleCommentsTable } from './extensions/ArticleCommentsTable'
import { ArticleInfo } from './extensions/ArticleInfo'
import { ArticleReactionsTable } from './extensions/ArticleReactionsTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const ViewArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Статьи', to: '/articles' }, { title: 'Просмотр статьи' }]} />
      <Divider />
      <C.WrapperPage>
        <Divider orientation='left' orientationMargin='0'>
          Общее
        </Divider>
        <ArticleInfo />
        <C.Brick />
        <Divider orientation='left' orientationMargin='0'>
          Комментарии
        </Divider>
        <ArticleCommentsTable />
        <Divider orientation='left' orientationMargin='0'>
          Реакции
        </Divider>
        <Row gutter={[16, 4]}>
          <ArticleReactionsTable />
        </Row>
      </C.WrapperPage>
    </div>
  )
}
