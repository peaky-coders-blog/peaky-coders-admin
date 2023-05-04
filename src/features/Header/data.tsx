import { LogoutOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

import { t } from 'languages'
import { E_Routes } from 'models/routes'

export const headerTitles: Record<E_Routes, string> = {
  [E_Routes.users]: 'dashboard.header.users',
  [E_Routes.createUser]: 'dashboard.header.createUser',
  [E_Routes.updateUser]: 'dashboard.header.updateUser',
  [E_Routes.admins]: 'dashboard.header.admins',
  [E_Routes.createAdmin]: 'dashboard.header.createAdmin',
  [E_Routes.updateAdmin]: 'dashboard.header.updateAdmin',
  [E_Routes.articles]: 'dashboard.header.articles',
  [E_Routes.createArticle]: 'dashboard.header.createArticle',
  [E_Routes.updateArticle]: 'dashboard.header.updateArticle',
  [E_Routes.tags]: 'dashboard.header.tags',
  [E_Routes.reactions]: 'dashboard.header.reactions',
}

interface I_ProfileMenu {
  onLogout: () => void
}

export const profileMenu = ({ onLogout }: I_ProfileMenu): MenuProps => ({
  items: [
    {
      key: '0',
      label: <span>{t('dashboard.menu.logout')}</span>,
      icon: <LogoutOutlined />,
    },
  ],
  onClick: (e) => {
    console.log('click', e)
    onLogout()
  },
})
