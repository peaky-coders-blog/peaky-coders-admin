import { I_Admin } from 'models/admin'
import { I_Response } from 'models/shared/app'

export type T_CreateAdminResponse = I_Response<I_Admin>

export type T_GetAdminsResponse = I_Response<I_Admin[]>

export type T_GetAdminResponse = I_Response<I_Admin>

export type T_UpdateAdminResponse = I_Response<I_Admin>
