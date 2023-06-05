import Breadcrumb, { BreadcrumbItemType, ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { Link } from 'react-router-dom'

type T_Breadcrumbs = {
  items: { title: string; to?: string }[]
}

const itemRender = (item: ItemType) => {
  if (instanceItem(item)) {
    if (item.to) {
      return <Link to={item.to}>{item.title}</Link>
    }
    return <span>{item.title}</span>
  }
  return ''
}

const instanceItem = (item: ItemType): item is BreadcrumbItemType & { to: string } => {
  return 'title' in item
}

export const Breadcrumbs = ({ items }: T_Breadcrumbs) => {
  return <Breadcrumb itemRender={itemRender} items={items} />
}
