import { I_Response } from 'models/shared/app'
import { I_User } from 'models/user'

export type T_CreateUserResponse = I_Response<I_User>

export type T_GetUserResponse = I_Response<I_User>

export type T_GetUsersResponse = I_Response<I_User[]>

export type T_UpdateUserResponse = I_Response<I_User>
