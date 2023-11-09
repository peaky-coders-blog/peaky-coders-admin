import { LogoutOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

import { t } from 'languages'
import { E_Routes } from 'models/routes'

export const headerTitles: Record<E_Routes, string> = {
  [E_Routes.users]: 'Пользователи',
  [E_Routes.createUser]: 'Создание пользователя',
  [E_Routes.updateUser]: 'Изменение пользователя',
  [E_Routes.admins]: 'Администраторы',
  [E_Routes.createAdmin]: 'Создание администратора',
  [E_Routes.updateAdmin]: 'Изменение администратора',
  [E_Routes.articles]: 'Статьи',
  [E_Routes.createArticle]: 'Создание статьи',
  [E_Routes.updateArticle]: 'Изменение статьи',
  [E_Routes.tags]: 'Тэги',
  [E_Routes.createTags]: 'Создание тэга',
  [E_Routes.reactions]: 'Реакции',
  [E_Routes.viewArticle]: 'Просмотр статьи',
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
    onLogout()
  },
})
