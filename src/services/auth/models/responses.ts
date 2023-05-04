import { T_AdminPreview } from 'models/admin'
import { I_Response } from 'models/shared/app'

export type T_AuthResponse = I_Response<{
  accessToken?: string
  refreshToken?: string
  admin: T_AdminPreview
}>
