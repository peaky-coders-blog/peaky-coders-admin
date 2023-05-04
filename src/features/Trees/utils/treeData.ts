import { t } from 'languages'
import { I_AdminRole, I_Role } from 'models/roles'

type T_TreeItem = {
  title: string
  key: string
  id?: number
  checkable?: boolean
  children?: T_TreeItem[]
  tag?: string
  selectable?: boolean
}

export const rolesToTreeData = (roles: I_Role[], checkable: boolean): T_TreeItem[] => {
  const p = roles.reduce((previousValue, role, currentIndex) => {
    const roleTreeItem: T_TreeItem = {
      id: role.id,
      title: role.name,
      key: String(currentIndex),
      checkable,
      children: permissionsToTreeItems(role.permissions, currentIndex),
      selectable: false,
    }
    previousValue.push(roleTreeItem)
    return previousValue
  }, [] as T_TreeItem[])
  return p
}

const permissionsToTreeItems = (permissions: string[], roleIndex: number): T_TreeItem[] => {
  return [
    {
      title: t('permissions.roles.title'),
      key: `${roleIndex}-0`,
      tag: 'roles',
      checkable: false,
      children: [],
      selectable: false,
    },
    {
      title: t('permissions.admins.title'),
      key: `${roleIndex}-1`,
      tag: 'admins',
      checkable: false,
      children: [],
      selectable: false,
    },
    {
      title: t('permissions.users.title'),
      key: `${roleIndex}-2`,
      tag: 'users',
      checkable: false,
      children: [],
      selectable: false,
    },
  ]
    .map(
      (item): T_TreeItem => ({
        ...item,
        children: permissions.reduce((previousValue, permission, currentIndex) => {
          if (permission.startsWith(item.tag)) {
            const permissionTreeItem = {
              key: `${item.key}-${currentIndex}`,
              title: t(`permissions.${permission}`),
              checkable: false,
              selectable: false,
            }
            previousValue.push(permissionTreeItem)
          }
          return previousValue
        }, [] as T_TreeItem[]),
      }),
    )
    .filter((item) => item.children?.length)
}

export const getDefaultSelectedItems = (
  treeData: T_TreeItem[],
  adminRoles: I_AdminRole[],
): string[] => {
  return treeData.reduce((previousValue, item) => {
    if (adminRoles.some(({ role }) => role.name === item.title)) {
      previousValue.push(item.key)
    }
    return previousValue
  }, [] as string[])
}
