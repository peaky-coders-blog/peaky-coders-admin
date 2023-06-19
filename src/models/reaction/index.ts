import { I_User } from 'models/user'

export interface I_Reaction {
  id: number
  name: string
  icon: string
  createdAt: Date
  updatedAt: Date
}
