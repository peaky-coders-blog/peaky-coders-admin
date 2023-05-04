import { T_DictionaryAdminRole } from 'models/shared/dictionaries'

export const getRoleName = (roles: T_DictionaryAdminRole[], roleId: string) =>
  roles.filter((role) => role.id === roleId)[0].name
