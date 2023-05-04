import { T_AdminId } from '../shared/admin'

export interface I_Admin {
  id: T_AdminId
  email: string
  createdAt: Date
  updatedAt: Date
}

export type T_AdminPreview = Pick<I_Admin, 'email'>

export type T_AdminRecord = I_Admin & {
  key: string
}
