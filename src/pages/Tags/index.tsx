import { Button, Divider } from 'antd'
import { Link } from 'react-router-dom'

import { TagsTable } from './extensions/TagsTable'

import { Breadcrumbs } from 'components/Breadcrumbs'
import * as C from 'styles/components'

export const Tags = () => {
  return (
    <div>
      <Breadcrumbs items={[{ title: 'Тэги' }]} />
      <Divider />

      <C.WrapperPage>
        <Link to='/tags/create'>
          <Button type='primary'>Создать тэг</Button>
        </Link>

        <C.Brick />
        <TagsTable />
      </C.WrapperPage>
    </div>
  )
}
