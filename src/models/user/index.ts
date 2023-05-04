import { T_UserId } from '../shared/user'

export enum E_UserFrom {
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
}

export interface I_User {
  id: T_UserId
  username: string
  email: string
  avatar: string
  from: E_UserFrom
  createdAt: Date
  updatedAt: Date
}

export type T_UserRecord = I_User & {
  key: string
}
