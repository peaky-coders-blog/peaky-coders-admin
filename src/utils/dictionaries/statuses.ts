import { T_DictionaryUserStatus } from 'models/shared/dictionaries'

export const getStatusName = (statuses: T_DictionaryUserStatus[], statusId: string) =>
  statuses.filter((status) => status.id === statusId)[0].name
