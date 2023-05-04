import { I_Admin } from '.'

export type T_AdminForm = Pick<I_Admin, 'email'>

export type T_CreateAdminForm = T_AdminForm & {
  password: string
  confirm: string
}

export type T_UpdateAdminForm = T_AdminForm

export type T_ChangePassword = {
  password: string
  confirm: string
}
