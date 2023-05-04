import { E_UserFrom } from 'models/user'

export type T_CreateUserDto = {
  email: string
  username: string
  avatar: string
  from: E_UserFrom
}

export type T_UpdateUserDto = {
  email: string
  username: string
  avatar: string
  from: E_UserFrom
}
