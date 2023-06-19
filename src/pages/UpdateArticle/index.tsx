import { Divider, Row } from 'antd'

import { ArticleCommentsTable } from './extensions/ArticleCommentsTable'
import { ArticleReactionsTable } from './extensions/ArticleReactionsTable'
import { ArticleStatistic } from './extensions/ArticleStatistic'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { FormUpdateArticle } from 'features/FormArticle/extensions/FormUpdateArticle'
import { t } from 'languages'
import * as C from 'styles/components'

export const UpdateArticle = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: t('dashboard.header.updateArticle') }]} />
      <Divider />

      <C.WrapperPage>
        <Divider orientation='left' orientationMargin='0'>
          Общее
        </Divider>
        <ArticleStatistic />
        <C.Brick />
        <Divider orientation='left' orientationMargin='0'>
          Форма изменения
        </Divider>
        <FormUpdateArticle />
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
