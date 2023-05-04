import { I_User } from '.'

export type T_UserForm = Pick<I_User, 'username' | 'email' | 'from' | 'avatar'>

export type T_CreateUserForm = T_UserForm
export type T_UpdateUserForm = T_UserForm

export type T_ChangePassword = {
  password: string
  confirm: string
}
