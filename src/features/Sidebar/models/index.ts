import { ReactNode } from 'react'

import { E_RolePermission } from 'models/shared/role'

export type T_MenuItem = {
  key: string
  label: string
  to: string
  icon: ReactNode
}
