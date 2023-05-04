import { t } from 'languages'
import { E_RolePermission } from 'models/shared/role'

type T_TreeItem = {
  title: string
  key: string
  id?: number
  checkable?: boolean
  children?: T_TreeItem[]
  tag?: string
  selectable?: boolean
}

export const permissionsToTreeData = (): T_TreeItem[] => {
  const permissions = Object.values(E_RolePermission)

  const treeItems: T_TreeItem[] = [
    { key: 'roles', title: t('permissions.roles.title') },
    { key: 'admins', title: t('permissions.admins.title') },
    { key: 'users', title: t('permissions.users.title') },
  ].map((item) => ({
    ...item,
    children: permissions.reduce((previousValue, permission) => {
      if (permission.startsWith(item.key)) {
        const treeItem: T_TreeItem = {
          key: permission,
          title: t(`permissions.${permission}`),
          checkable: true,
        }
        previousValue.push(treeItem)
      }
      return previousValue
    }, [] as T_TreeItem[]),
    checkable: true,
  }))

  return treeItems
}
