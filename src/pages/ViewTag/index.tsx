import { Divider } from 'antd'

import { ArticleCommentsTable } from './extensions/ArticlesPreviewTable'
import { TagInfo } from './extensions/TagInfo'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const ViewTag = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Тэги', to: '/tags' }, { title: 'Просмотр тэга' }]} />
      <Divider />
      <C.WrapperPage>
        <Divider orientation='left' orientationMargin='0'>
          Общее
        </Divider>
        <TagInfo />
        <C.Brick />
        <Divider orientation='left' orientationMargin='0'>
          Статьи
        </Divider>
        <ArticleCommentsTable />
      </C.WrapperPage>
    </div>
  )
}
