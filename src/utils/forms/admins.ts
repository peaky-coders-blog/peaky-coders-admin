/* eslint-disable @typescript-eslint/no-unused-vars */
import { I_Admin } from 'models/admin'
import { T_UpdateAdminForm, T_CreateAdminForm } from 'models/admin/forms'
import { T_CreateAdminDto } from 'services/admins/models/dtos'

export const formCreateToAdmin = (form: T_CreateAdminForm): T_CreateAdminDto => {
  const { confirm, ...rest } = form

  return rest
}

export const adminToFormUpdate = (user: I_Admin): T_UpdateAdminForm => {
  const { createdAt, updatedAt, id, ...rest } = user

  return rest
}
