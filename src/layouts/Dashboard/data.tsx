import {
  ContainerOutlined,
  AppstoreOutlined,
  HeartOutlined,
  TeamOutlined,
  LockOutlined,
} from '@ant-design/icons'

import { T_MenuItem } from 'features/Sidebar/models'

export const menuItems: T_MenuItem[] = [
  {
    key: 'articles',
    label: 'dashboard.sidebar.articles',
    icon: <ContainerOutlined />,
    to: '/articles',
  },
  {
    key: 'tags',
    label: 'dashboard.sidebar.tags',
    icon: <AppstoreOutlined />,
    to: '/tags',
  },
  {
    key: 'reactions',
    label: 'dashboard.sidebar.reactions',
    icon: <HeartOutlined />,
    to: '/reactions',
  },
  {
    key: 'admins',
    label: 'dashboard.sidebar.admins',
    icon: <LockOutlined />,
    to: '/admins',
  },
  {
    key: 'users',
    label: 'dashboard.sidebar.users',
    icon: <TeamOutlined />,
    to: '/users',
  },
]
